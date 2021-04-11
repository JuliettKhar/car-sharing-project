module.exports = {
  root: true,
  env: {
    node: true
  },
  plugins: ['prettier', 'eslint-plugin-vue'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    // parser: 'babel-eslint',
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prettier/prettier': 'error',
    'no-param-reassign': 'off',
    'no-cond-assign': ['error', 'except-parens'],
    'prefer-object-spread': 'off',
    'consistent-return': 'off',
    'import/prefer-default-export': 'off',
    'func-names': ['error', 'never'],
    'radix': 'warn',
    'prefer-const': 'warn',
    'prefer-arrow-callback': 'warn',
    'arrow-spacing': 'warn',
    'switch-colon-spacing': 'warn',
    'spaced-comment': 'warn',
    'operator-linebreak': 'warn',
    'no-trailing-spaces': 'warn',
    'no-plusplus': 'warn',
    'new-cap': 'warn',
    'linebreak-style': 'warn',
    'jsx-quotes': ['warn', 'prefer-double'],
    'capitalized-comments': ['off', 'always'],
    'camelcase': 'off',
    'brace-style': 'warn',
    'no-use-before-define': 'warn',
    'no-redeclare': 'warn',
    'eqeqeq': 'warn',
    'default-param-last': 'warn',
    'vue/attributes-order': [
      'warn',
      {
        order: [
          'DEFINITION',
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          'GLOBAL',
          'UNIQUE',
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'EVENTS',
        ],
        alphabetical: false
      }
    ],
    "multiline-comment-style": "off",
    "no-confusing-arrow":"off"
  }
}
