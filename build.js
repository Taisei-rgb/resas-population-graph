const esbuild = require('esbuild');
const sassPlugin = require('esbuild-plugin-sass');
const { copy } = require('esbuild-plugin-copy');

esbuild
  .build({
    entryPoints: ['src/index.tsx'],
    bundle: true,
    outdir: 'dist',
    loader: { '.tsx': 'tsx', '.ts': 'ts' },
    plugins: [
      sassPlugin(),
      copy({
        assets: {
          from: './public/*',
          to: './',
        },
      }),
    ],
    define: { 'process.env.NODE_ENV': '"development"' },
    sourcemap: true,
  })
  .catch(() => process.exit(1));
