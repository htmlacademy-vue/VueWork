module.exports = {
  presets: ['@vue/app'],
  plugins: ['@babel/plugin-proposal-optional-chaining'],
  env: {
    test: {
      plugins: ['require-context-hook']
    }
  }
};
