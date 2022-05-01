import { defineConfig } from 'umi';

export default defineConfig({
  title: false,
  history: {
    type: 'hash',
  },
  hash: false,
  outputPath: './build',
  ignoreMomentLocale: true,
  nodeModulesTransform: {
    type: 'none',
  },
  webpack5: {}, // 启动webpack5
  locale: {
    default: 'zh-CN',
    antd: true,
    title: false,
    baseNavigator: true,
    baseSeparator: '-',
  },
  externals: {},
  scripts: [],
  alias: {
    '@': './src',
  },
  chainWebpack(config) {
    // 设置出口文件名
    config.plugin('extract-css').tap(() => [
      {
        filename: `main.css`,
        chunkFilename: `[name].chunk.css`,
        ignoreOrder: true,
      },
    ]);
    config.output.filename('app.js');
  },
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:7001',
      changeOrigin: true,
      // pathRewrite: { '^/igate': '' },
    },
  },
});
