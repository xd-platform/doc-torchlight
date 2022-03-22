const apiPre = 'http://172.26.151.94:15000'

const API = {
	inventory: {
		menu: `${apiPre}/wiki_equip_menu`,
		list: `${apiPre}/wiki_equip_list`,
		detail: `${apiPre}/wiki_equip_detail`,
		tips: `${apiPre}/wiki_equip_tips`
	},
	talent: `${apiPre}/wiki_talent_list`,
}

export default API;