// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint'
    },
    env: {
        browser: true,
    },
    extends: [
        // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
        // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
        'plugin:vue/essential',
        // https://github.com/standard/standard/blob/master/docs/RULES-en.md
        'standard'
    ],
    // required to lint *.vue files
    plugins: [
        'vue'
    ],
    // add your custom rules here
    rules: {
        // allow async-await
        'generator-star-spacing': 'off',
        'indent': [2, 4],
        'semi': ['error', 'always'],
        'no-extra-semi': 'error',
        // 'brace-style': ['error', 'allman'], // brace new line
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
        // 'no-unused-vars': 'off'
    },
    'globals': {
      //为百度地图设置规则
      'BMap': true,
      'BMAP_NORMAL_MAP': true,
      'BMAP_HYBRID_MAP': true,
      'BMAP_ANCHOR_TOP_LEFT': true,
      'BMAP_ANCHOR_TOP_RIGHT': true
  }
};
