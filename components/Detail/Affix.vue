<template>
  <LayoutCell :title="title">
		<div class="affix-content">
			<equip-affix-list v-if="info" :info="info"></equip-affix-list>
		</div>
	</LayoutCell>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: () => ''
    },
    info: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
.affix-content {
  padding: 21px 44px;
}

@media screen and (max-width: 828px) {
	.affix-content {
	  padding: vw(34px) vw(44px);
	}
}
</style>