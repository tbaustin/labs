const { resolve } = require(`path`)

const genericTemplate = resolve(`src/templates/generic.js`)

exports.createPages = async function({ actions, graphql }){
	const { createPage } = actions

	const sanityQuery = `{
		pages: allSanityPage{
			edges{
				node{
					id
					slug{
						current
					}
				}
			}
		}
	}`

	let res = await graphql(sanityQuery)

	if (res.errors) {
		console.error(res.errors)
		process.exit(1)
	}

	let homePageExist = false

	res.data && res.data.pages.edges.forEach(({ node }) => {
		const id = node.id
		const slug = node.slug.current
		if(slug === `/`) homePageExist = true
		createPage({
			path: slug,
			component: genericTemplate,
			context: {
				id,
			},
		})
	})

	if(!homePageExist){
		createPage({
			path: `/`,
			component: genericTemplate,
			context: {
				id: `default`,
			},
		})
	}
}
