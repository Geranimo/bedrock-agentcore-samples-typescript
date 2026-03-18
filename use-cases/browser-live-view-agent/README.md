# Amazon Bedrock AgentCore Browser — Live View Agent Demo

Watch an AI agent browse the web in real time. This sample app embeds a live stream of an [Amazon Bedrock AgentCore](https://aws.amazon.com/bedrock/agentcore/) cloud browser session into a React application using the [`BrowserLiveView`](https://github.com/aws/bedrock-agentcore-sdk-typescript/tree/main/src/tools/browser/live-view) component from the [Bedrock AgentCore TypeScript SDK](https://github.com/aws/bedrock-agentcore-sdk-typescript).

An AI agent drives the browser autonomously — navigating pages, clicking elements, typing into forms, and reading content — while you watch every action through the embedded live view.

<!-- [Screenshot: demo app showing live view of Wikipedia with activity log and prompt input] -->

## How It Works

The app has three layers:

1. **React frontend** — renders `<BrowserLiveView>` to stream the cloud browser session via the NICE DCV protocol, displays a real-time activity log, and accepts user prompts.
2. **Node.js server** — starts the browser session, generates a SigV4-presigned live view URL, and runs the AI agent loop using the [Bedrock Converse API](https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_Converse.html) with browser tools.
3. **AWS services** — AgentCore Browser provides the isolated cloud browser instance; Amazon Bedrock provides the AI model with tool-use support.

```
┌─────────────────────────────────────────────┐
│  React App (localhost:5173)                  │
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │  <BrowserLiveView>                     │  │
│  │  Real-time DCV stream of agent's       │  │◄── DCV WebSocket
│  │  browser (3 lines of JSX)              │  │    (direct from AgentCore)
│  └────────────────────────────────────────┘  │
│                                              │
│  [Prompt input] [Launch Agent]               │
│  [Activity Log] [Agent Result]               │
└──────────────────┬───────────────────────────┘
                   │ REST API
                   ▼
┌─────────────────────────────────────────────┐
│  Server (localhost:3001)                     │
│                                              │
│  PlaywrightBrowser ──► AgentCore Browser     │
│  Bedrock Converse API ──► AI Model           │
│  Agent loop: model → tool call → execute     │
└─────────────────────────────────────────────┘
```

The DCV live view stream flows **directly** from AgentCore to the browser via the presigned URL — it does not pass through your server.

## Prerequisites

- **Node.js 20+**
- **AWS account** with Amazon Bedrock AgentCore access
- **AWS credentials** with permissions for `bedrock-agentcore` and `bedrock` services
- **Bedrock model access** — any model that supports tool use (Claude, Amazon Nova, etc.)

## Quick Start

1. **Clone and install:**

   ```bash
   git clone https://github.com/awslabs/agentcore-browser-liveview-demo.git
   cd agentcore-browser-liveview-demo
   npm install
   ```

2. **Export your AWS credentials:**

   ```bash
   export AWS_ACCESS_KEY_ID=<your-access-key>
   export AWS_SECRET_ACCESS_KEY=<your-secret-key>
   export AWS_SESSION_TOKEN=<your-session-token>
   export AWS_REGION=us-west-2
   ```

   Use temporary credentials from AWS SSO, STS, or IAM Identity Center. Never commit long-lived credentials.

3. **Start the app:**

   ```bash
   npm run dev
   ```

4. **Open** `http://localhost:5173`, enter a prompt, and click **Launch Agent**.

The live view panel streams the agent's browser session while the activity log shows each tool call in real time.

## Configuration

The server reads all configuration from environment variables:

| Variable                | Default                                   | Description                             |
| ----------------------- | ----------------------------------------- | --------------------------------------- |
| `AWS_ACCESS_KEY_ID`     | (required)                                | AWS access key                          |
| `AWS_SECRET_ACCESS_KEY` | (required)                                | AWS secret key                          |
| `AWS_SESSION_TOKEN`     | (optional)                                | Session token for temporary credentials |
| `AWS_REGION`            | `us-west-2`                               | AWS region                              |
| `BEDROCK_MODEL_ID`      | `anthropic.claude-sonnet-4-20250514-v1:0` | Bedrock model for the agent             |
| `BROWSER_IDENTIFIER`    | `aws.browser.v1`                          | AgentCore browser identifier            |

To use a different model:

```bash
export BEDROCK_MODEL_ID=amazon.nova-pro-v1:0
```

## Project Structure

```
├── server/
│   ├── config.ts         # Reads env vars, validates credentials
│   ├── agent.ts          # Bedrock Converse API agent loop + PlaywrightBrowser
│   └── index.ts          # Fastify API server (start, run-agent, status, stop)
├── src/
│   ├── App.tsx           # React dashboard with live view, logs, prompt input
│   ├── main.tsx          # React entry point
│   └── constants.ts      # Frontend config (API URL, viewport dimensions)
├── index.html            # HTML entry
├── vite.config.ts        # DCV SDK aliases, static copy, dedupe
├── tsconfig.json
└── package.json
```

## Key Code Snippets

**Embedding the live view (client side):**

```tsx
import { BrowserLiveView } from 'bedrock-agentcore/browser/live-view'
;<BrowserLiveView signedUrl={presignedUrl} remoteWidth={1920} remoteHeight={1080} />
```

**Generating the presigned URL (server side):**

```typescript
import { PlaywrightBrowser } from 'bedrock-agentcore/browser/playwright'

const browser = new PlaywrightBrowser({ region: 'us-west-2' })
await browser.startSession({ viewport: { width: 1920, height: 1080 } })

const liveViewUrl = await browser.generateLiveViewUrl()
```

**Agent loop (server side):**

The agent uses the Bedrock Converse API with tool definitions for browser actions. The model calls tools, the server executes them via PlaywrightBrowser, and feeds results back until the model returns a final text response.

## Vite Configuration

The `BrowserLiveView` component uses the NICE DCV Web Client SDK, which ships vendored inside `bedrock-agentcore`. Your Vite config needs:

- **`resolve.alias`** — points `dcv` and `dcv-ui` to the vendored SDK files
- **`resolve.dedupe`** — forces shared deps (React, Cloudscape, etc.) to resolve from your `node_modules`
- **`viteStaticCopy`** — copies DCV runtime files (workers, WASM decoders) to the build output

See [`vite.config.ts`](./vite.config.ts) for the complete configuration.

## Using with Agent Frameworks

This sample uses the Bedrock Converse API directly, but the AgentCore TypeScript SDK also provides framework-native integrations:

**Vercel AI SDK:**

```typescript
import { BrowserTools } from 'bedrock-agentcore/browser/vercel-ai'
const browser = new BrowserTools({ region: 'us-west-2' })
await generateText({ model: bedrock(modelId), tools: browser.tools, prompt: '...' })
```

**Strands Agents SDK (experimental):**

```typescript
import { BrowserTools } from 'bedrock-agentcore/browser/strands'
const browser = new BrowserTools({ region: 'us-west-2' })
const agent = new Agent({ model: new BedrockModel({ modelId }), tools: browser.tools })
```

Both use the same underlying `PlaywrightBrowser`, so the live view works identically.

## Related Resources

- [Bedrock AgentCore TypeScript SDK](https://github.com/aws/bedrock-agentcore-sdk-typescript)
- [BrowserLiveView source code](https://github.com/aws/bedrock-agentcore-sdk-typescript/tree/main/src/tools/browser/live-view)
- [AgentCore Browser documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/agentcore-browser.html)
- [Blog: Customize AI agent browsing with proxies, profiles, and extensions](https://aws.amazon.com/blogs/machine-learning/customize-ai-agent-browsing-with-proxies-profiles-and-extensions-in-amazon-bedrock-agentcore-browser/)
- [Blog: Reduce CAPTCHAs with Web Bot Auth (Preview)](https://aws.amazon.com/blogs/machine-learning/reduce-captchas-for-ai-agents-browsing-the-web-with-web-bot-auth-preview/)
- [AgentCore samples (Python)](https://github.com/awslabs/amazon-bedrock-agentcore-samples)
- [Amazon Bedrock AgentCore pricing](https://aws.amazon.com/bedrock/agentcore/pricing/)

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This project is licensed under the MIT-0 License. See the [LICENSE](LICENSE) file.
