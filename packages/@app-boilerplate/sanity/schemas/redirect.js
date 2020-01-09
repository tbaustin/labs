import { MdSettings } from 'react-icons/md'

export default {
	name: `redirect`,
	title: `Redirect`,
	type: `object`,
	icon: MdSettings,
	fields: [
		{
			name: `from`,
			title: `From`,
			type: `string`,
		},
		{
			name: `to`,
			title: `to`,
			type: `string`,
		},
	],
}
