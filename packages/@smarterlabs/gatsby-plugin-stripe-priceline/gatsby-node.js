const fetch = require(`./fetch`)

exports.sourceNodes = async ({
	actions,
	createNodeId,
	createContentDigest,
}, options) => {
	const { createNode } = actions

	const priceline = await fetch(options)

	for(let i = priceline.length; i--;){
		const item = priceline[i]
		const nodeMeta = {
			id: createNodeId(`stripe-priceline-${item.skuId}`),
			parent: null,
			children: [],
			internal: {
				type: `StripePriceline`,
				content: JSON.stringify(item),
				contentDigest: createContentDigest(item),
			},
		}

		const node = { ...item, ...nodeMeta }

		createNode(node)
	}
}