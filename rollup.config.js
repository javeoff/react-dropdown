import typescript from 'rollup-plugin-typescript2';
import swc from 'rollup-plugin-swc';
import { terser } from 'rollup-plugin-terser';

const config = () => {
  const plugins = [
    typescript({
      tsconfig: 'tsconfig.json',
    }),
    swc({
      rollup: {
        exclude: /node_modules/,
      },
      jsc: {
        parser: {
          syntax: 'typescript',
        },
      },
    }),
  ];

  if (process.env.NODE_ENV === 'production') {
    plugins.push(terser());
  }

  return {
    input: 'src/index.ts',
    output: {
      format: 'esm',
      dir: 'dist',
      preserveModulesRoot: './src',
      preserveModules: true,
    },
    plugins,
    external: ['react/jsx-runtime', 'react'],
  };
};

export default config;
