import typescript from 'rollup-plugin-typescript2';
import swc from 'rollup-plugin-swc';
import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';

const config = () => {
  const plugins = [
    typescript({
      tsconfig: 'tsconfig.json',
      target: 'es5',
    }),
    swc({
      rollup: {
        exclude: /node_modules/,
      },
      jsc: {
        parser: {
          syntax: 'typescript',
          target: 'es5',
        },
      },
    }),
    commonjs(),
  ];

  if (process.env.NODE_ENV === 'production') {
    plugins.push(terser());
  }

  return {
    input: 'src/index.tsx',
    output: {
      format: 'cjs',
      dir: 'dist',
      preserveModules: true,
    },
    plugins,
    external: ['react/jsx-runtime'],
  };
};

export default config;
