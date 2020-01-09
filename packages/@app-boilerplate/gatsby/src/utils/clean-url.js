
module.exports = function cleanUrl(value, allowSlashes) {
	if (value === null) value = ``
	let result = value
		.replace(/[^a-z0-9/]/gim, ` `)
		.replace(/\s+/g, `-`)
		.replace(/\./g, ``)
		.toLowerCase()
	while (result.indexOf(`--`) > -1) {
		result = result.replace(`--`, `-`)
	}
	if (result.slice(-1) == `-`) {
		result = result.substring(0, result.length - 1)
	}
	if (result.slice(0, 1) == `-`) {
		result = result.substring(1)
	}
	if (!allowSlashes) {
		result = result.replace(/\//g, ``)
	}
	return result
}
