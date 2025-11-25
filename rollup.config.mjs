import typescript from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/vacuum-schedule-card.ts',
  output: {
    file: 'dist/vacuum-schedule-card.js',
    format: 'es',
    inlineDynamicImports: true,
  },
  context: 'window',
  plugins: [
    nodeResolve({
      browser: true,
      preferBuiltins: false,
    }),
    commonjs(),
    typescript({
      tsconfig: 'tsconfig.json',
      useTsconfigDeclarationDir: false,
    }),
    terser({
      format: {
        comments: false,
      },
    }),
  ],
};

