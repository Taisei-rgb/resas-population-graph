const esbuild = require('esbuild');
const sassPlugin = require('esbuild-plugin-sass');
const copyPlugin = require('esbuild-plugin-copy');

esbuild
  .build({
    entryPoints: ['src/index.tsx'],
    bundle: true,
    outdir: 'dist',
    loader: { '.tsx': 'tsx', '.ts': 'ts' },
    plugins: [
      sassPlugin(),
      copyPlugin({
        resolveFrom: 'cwd',
        assets: {
          from: ['./public/*'],
          to: ['./dist'],
        },
      }),
    ],
    define: { 'process.env.NODE_ENV': '"development"' },
    sourcemap: true,
    watch: false,
  })
  .catch(() => process.exit(1));
