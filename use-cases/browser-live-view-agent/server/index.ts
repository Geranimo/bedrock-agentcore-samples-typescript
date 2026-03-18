import Fastify from 'fastify'
import { config } from './config.js'
import { agentState, startSession, runAgent, stopSession } from './agent.js'

const app = Fastify({ logger: true })

// CORS for Vite dev server
app.addHook('onRequest', async (request, reply) => {
  reply.header('Access-Control-Allow-Origin', '*')
  reply.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  reply.header('Access-Control-Allow-Headers', 'Content-Type')
  if (request.method === 'OPTIONS') {
    reply.status(204).send()
  }
})

// Start a browser session and return the live view URL
app.post('/api/start', async () => {
  if (agentState.liveViewUrl) {
    return { liveViewUrl: agentState.liveViewUrl }
  }
  const liveViewUrl = await startSession()
  return { liveViewUrl }
})

// Run the AI agent with a prompt
app.post<{ Body: { prompt: string } }>('/api/run-agent', async (request) => {
  const { prompt } = request.body

  if (agentState.status === 'running') {
    return { error: 'Agent is already running' }
  }

  // Run agent in background — don't await
  runAgent(prompt).catch((err) => {
    console.error('Agent failed:', err)
  })

  return { status: 'started' }
})

// Poll agent status and logs
app.get('/api/status', async () => {
  return {
    status: agentState.status,
    logs: agentState.logs,
    result: agentState.result,
    error: agentState.error,
  }
})

// Stop session and clean up
app.post('/api/stop', async () => {
  await stopSession()
  return { status: 'stopped' }
})

// Start server
const start = async (): Promise<void> => {
  try {
    await app.listen({ port: config.server.port, host: '0.0.0.0' })
    console.log(`\n  Agent server running at http://localhost:${config.server.port}`)
    console.log('  Waiting for client to connect...\n')
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
