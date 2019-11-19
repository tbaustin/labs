const Stripe = require(`stripe`)
module.exports = async function({
	stripeSecretKey,
}) {
	const stripe = Stripe(stripeSecretKey)
	const skus = []
	for await(const sku of stripe.skus.list()) {
		skus.push({
			skuId: sku.id,
			productId: sku.product,
			price: sku.price,
			stock: sku.inventory.quantity,
		})
	}

	return skus
}
