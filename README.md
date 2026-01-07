# AWS Bedrock AgentCore Samples for TypeScript

This repository contains examples, tutorials, and use cases for building AI agents with [AWS Bedrock AgentCore](https://aws.amazon.com/bedrock/agentcore/) using TypeScript.

## Overview

AWS Bedrock AgentCore provides managed primitives for building production-grade AI agents. This samples repository demonstrates how to use these primitives with popular frameworks and real-world patterns.

## Prerequisites

- Node.js >= 20.0.0
- AWS Account with Bedrock AgentCore access
- AWS credentials configured (`AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`)
- Claude Sonnet 4 enabled in AWS Bedrock console

## Installation

```bash
# Clone the repository
git clone https://github.com/awslabs/amazon-bedrock-agentcore-samples-typescript.git
cd amazon-bedrock-agentcore-samples-typescript

# Install dependencies
npm install
```

## Repository Structure

```
├── examples/
│   ├── tools/                    # Tools primitive examples
│   │   ├── code-interpreter/     # Code execution examples
│   │   ├── browser/              # Browser automation examples
│   │   └── combined/             # Multi-tool agent examples
│   ├── integrations/             # Framework integration examples
│   │   ├── vercel-ai/            # Vercel AI SDK examples
│   │   ├── langchain/            # LangChain examples (coming soon)
│   │   └── llamaindex/           # LlamaIndex examples (coming soon)
│   ├── runtime/                  # Runtime primitive examples (coming soon)
│   └── identity/                 # Identity primitive examples (coming soon)
├── docs/                         # Additional documentation
└── shared/                       # Shared utilities across examples
```

## Quick Start

### Tools Examples

#### Code Interpreter

```bash
npx tsx examples/tools/code-interpreter/basic.ts
```

#### Browser Automation

```bash
npx tsx examples/tools/browser/basic.ts
```

#### Combined Agent (Browser + Code Interpreter)

```bash
npx tsx examples/tools/combined/research-assistant.ts
```

### Framework Integration Examples

#### Vercel AI SDK

```bash
npx tsx examples/integrations/vercel-ai/agent-with-tools.ts
```

## Examples

| Category     | Example          | Description                                          |
| ------------ | ---------------- | ---------------------------------------------------- |
| Tools        | Code Interpreter | Execute Python code, file operations, shell commands |
| Tools        | Browser          | Web scraping, page interaction, content extraction   |
| Tools        | Combined         | Multi-tool research agents and data pipelines        |
| Integrations | Vercel AI SDK    | ToolLoopAgent with streaming and tool loops          |
| Runtime      | Coming Soon      | Managed runtime configurations                       |
| Identity     | Coming Soon      | Authentication and authorization patterns            |

## Running Examples

Each example can be run individually:

```bash
# Run a specific example
npx tsx examples/tools/browser/basic.ts

# Run with a specific sub-example (where supported)
npx tsx examples/tools/combined/research-assistant.ts example1
```

## Troubleshooting

### "crypto is not defined"

Each example includes a setup file that polyfills crypto for Node.js compatibility with `@ai-sdk/amazon-bedrock`.

### Rate Limits / "Too many tokens"

- Run examples individually rather than all at once
- Wait 60 seconds between runs
- Examples include `maxSteps` constraints and delays to minimize this

### "Region is required"

```bash
export AWS_REGION=us-west-2
```

### "Access Denied" or "Model not found"

1. Enable Claude Sonnet 4 in your AWS Bedrock console
2. Verify IAM permissions for `bedrock:InvokeModel` and `bedrock-agentcore:*`

## Related Resources

- [AWS Bedrock AgentCore Documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/agentcore.html)
- [AWS Bedrock AgentCore TypeScript SDK](https://github.com/awslabs/amazon-bedrock-agentcore-sdk-typescript)
- [AWS Bedrock AgentCore Python Samples](https://github.com/awslabs/amazon-bedrock-agentcore-samples)
- [Vercel AI SDK Documentation](https://sdk.vercel.ai/docs)

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This project is licensed under the Apache-2.0 License. See the [LICENSE](LICENSE) file.
