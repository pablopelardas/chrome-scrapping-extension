require('esbuild').build({
  entryPoints: ['./src/sw.js'],
  outdir: './dist',
  bundle: true,
  platform: 'node',
  target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
  watch: true,
}).catch(() => process.exit(1))