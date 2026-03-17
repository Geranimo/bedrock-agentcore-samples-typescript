// Reads AWS credentials from environment variables.
// Export them before running: export AWS_ACCESS_KEY_ID=... etc.

export const config = {
  region: process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || 'us-west-2',

  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    sessionToken: process.env.AWS_SESSION_TOKEN,
  },

  // Change this to your preferred model — any model with tool use support works
  modelId: process.env.BEDROCK_MODEL_ID || 'us.anthropic.claude-opus-4-5-20251101-v1:0',

  browser: {
    identifier: process.env.BROWSER_IDENTIFIER || 'aws.browser.v1',
    viewport: { width: 1920, height: 1080 },
    sessionTimeout: 3600,
  },

  server: {
    port: 3001,
  },
}

// Validate required credentials at startup
if (!config.credentials.accessKeyId || !config.credentials.secretAccessKey) {
  console.error('\n❌ Missing AWS credentials. Export them first:')
  console.error('   export AWS_ACCESS_KEY_ID=...')
  console.error('   export AWS_SECRET_ACCESS_KEY=...')
  console.error('   export AWS_SESSION_TOKEN=...\n')
  process.exit(1)
}
