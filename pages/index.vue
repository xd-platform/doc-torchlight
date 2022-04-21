<script>
export default {
	asyncData({ redirect }) {
		redirect('/inventory?lang=en_WW')
	},
	render(h) {
		return h('div')
	}
}
</script>