const { defineConfig } = require('@vue/cli-service');
const Dotenv = require('dotenv-webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/rubik/',
  configureWebpack: {
    plugins: [
      new Dotenv()
    ]
  }
});
