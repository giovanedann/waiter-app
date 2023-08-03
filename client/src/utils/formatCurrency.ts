export function formatCurrency(value: number) {
  const price = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);

  return price;
}
