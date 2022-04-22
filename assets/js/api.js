const apiPre = 'https://wiki.torchlight.xd.com'
const ossPre = 'https://website.xdcdn.net/homepage/torchlight-doc'

const API = {
	character: {
		list: `${apiPre}/wiki_hero_character_menu`,
		detail: `${apiPre}/wiki_hero_character_detail`,
		theme: `${ossPre}/theme.json`,
		themeEn: `${ossPre}/theme_en.json`,
		theme_dev: `${ossPre}/theme_dev.json`,
		themeEn_dev: `${ossPre}/theme_en_dev.json`
	},
	inventory: {
		menu: `${apiPre}/wiki_equip_menu`,
		list: `${apiPre}/wiki_equip_list`,
		detail: `${apiPre}/wiki_equip_detail`,
		tips: `${apiPre}/wiki_equip_tips`
	},
	talent: {
		menu: `${apiPre}/wiki_talent_menu`,
		list: `${apiPre}/wiki_talent_list`
	},
	affix: {
		menu: `${apiPre}/wiki_affix_menu`,
		list: `${apiPre}/wiki_affix_list`
	}
}

export default API;