import antfu from '@antfu/eslint-config'
import oxlint from 'eslint-plugin-oxlint'

export default antfu({
  vue: true,
  rules: {
    '@typescript-eslint/no-namespace': 'off',
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: { max: 1 },
        multiline: { max: 1 },
      },
    ],
    'vue/attributes-order': [
      'error',
      {
        order: [
          'DEFINITION',
          'LIST_RENDERING',
          'CONDITIONALS',
          'TWO_WAY_BINDING',
          'RENDER_MODIFIERS',
          'OTHER_DIRECTIVES',
          'UNIQUE',
          'SLOT',
          'GLOBAL',
          'OTHER_ATTR',
          'EVENTS',
          'CONTENT',
        ],
        alphabetical: false,
      },
    ],
    'style/array-bracket-spacing': [
      'error',
      'always',
    ],
    'array-bracket-spacing': [ 'error', 'always' ],
    'max-len': 'off',
    'no-unused-vars': 'off',
    'no-undef': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_',
      },
    ],
    '@stylistic/indent-binary-ops': [
      'error',
      2,
    ],
    'n/prefer-global/process': 'off',
    'no-shadow': [
      'error',
      { ignoreOnInitialization: true },
    ],
    'regexp/no-unused-capturing-group': 'off',
    'regexp/no-useless-escape': 'off',
    'regexp/strict': 'off',
    'regexp/prefer-d': 'off',
    'ts/no-unused-expressions': 'off',
  },
}, oxlint.configs['flat/recommended'])
