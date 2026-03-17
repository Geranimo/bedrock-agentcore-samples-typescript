import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// Path to the vendored DCV SDK inside bedrock-agentcore
const dcvSdkDir = resolve(
  __dirname,
  'node_modules/bedrock-agentcore/dist/src/tools/browser/live-view/nice-dcv-web-client-sdk'
)

export default defineConfig({
  resolve: {
    alias: {
      // DCV SDK bare specifier aliases — required for BrowserLiveView
      dcv: resolve(dcvSdkDir, 'dcvjs-esm/dcv.js'),
      'dcv-ui': resolve(dcvSdkDir, 'dcv-ui/dcv-ui.js'),
    },
    // Force shared deps to resolve from this project's node_modules,
    // not from the vendored SDK path
    dedupe: [
      'react',
      'react-dom',
      'prop-types',
      '@cloudscape-design/components',
      '@cloudscape-design/global-styles',
      '@cloudscape-design/design-tokens',
      '@babel/runtime',
    ],
  },
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        { src: resolve(dcvSdkDir, 'dcvjs-esm'), dest: 'nice-dcv-web-client-sdk' },
        { src: resolve(dcvSdkDir, 'dcv-ui'), dest: 'nice-dcv-web-client-sdk' },
      ],
    }),
  ],
  server: {
    port: 5173,
  },
})
