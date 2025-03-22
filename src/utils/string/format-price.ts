export const formatPrice = (price: number) => {
	return price.toLocaleString('ru-RU', {
		style: 'currency',
		currency: 'K',
		minimumFractionDigits: 0
	})
}