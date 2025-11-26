export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
    minimumFractionDigits: 2,
  }).format(amount);
};

export const formatPrice = (price) => {
  return `S/ ${Number(price).toFixed(2)}`;
};
