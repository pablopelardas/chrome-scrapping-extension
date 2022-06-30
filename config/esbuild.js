/* eslint-disable no-undef */
require('esbuild').build({
    entryPoints: ['./src/sw.js', './src/scripts/scrappingLinkedin.js', './src/scripts/scrapping.candidates.js'],
    outdir: './dist',
    bundle: true,
    target: ['chrome58', 'firefox57', 'safari11'],
    watch: true,
}).catch(() => process.exit(1));