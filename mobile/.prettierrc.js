module.exports = {
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: ['^react$', '^react-native$', '^[^.]', '^[./]'],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  semi: false,
  trailingComma: 'es5',
  singleQuote: true,
}
