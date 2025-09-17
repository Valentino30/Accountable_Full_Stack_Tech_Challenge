module.exports = {
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: ['^node:', '^express$', '^[^.]', '^[./]'],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  semi: false,
  trailingComma: 'es5',
  singleQuote: true,
}
