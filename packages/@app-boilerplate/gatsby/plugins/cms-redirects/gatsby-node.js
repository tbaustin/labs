const { resolve } = require(`path`)
const { readFile, outputFile } = require(`fs-extra`)

const cleanUrl = require(`../../src/utils/clean-url`)

const redirectsPath = resolve(`public/_redirects`)


/**
 * Regular URL formatting (allow slashes)
 * Also force exactly 1 leading slash (remove any existing)
 */
const cleanRedirectUrl = val => {
	if(val.includes(`http`)) return val
	let cleaned = cleanUrl(val, true).replace(/^\/+/, ``)
	return `/${cleaned}`
}



exports.onPostBuild = async ({ graphql }) => {
	console.log(`RUNNING CMS REDIRECTS PLUGIN`)

	let redirectsString = ``

	try {
		// Keep current contents of _redirects file if it exists
		// Ignore "no such file" error - just keep redirectsString empty
		try {
			redirectsString = await readFile(redirectsPath, `utf8`)
		}
		catch(fsError) {
			if (fsError.code !== `ENOENT`) throw fsError
		}

		const { data } = await graphql(`{
			config: sanitySiteSettings {
				redirects {
					from
					to
				}
			}
		}`)

		const { redirects } = data.config

		redirectsString += `\n## From Netlify CMS\n\n`
		redirects.forEach(({ from, to }) => {
			let cleanFrom = cleanRedirectUrl(from)
			let cleanTo = cleanRedirectUrl(to)
			redirectsString += `${cleanFrom} ${cleanTo}\n`
		})

		await outputFile(redirectsPath, redirectsString)
		console.log(`Added redirects from CMS`)
	}
	catch(error) {
		console.log(`Failed to add redirects from CMS`, error)
	}
}
