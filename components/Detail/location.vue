<template>
  <LayoutCell :title="title">
		<ul class="location-content">
			<li v-for="(item, i) in info" :key="i">{{ item }}</li>
		</ul>
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
.location-content {
  padding: 21px 44px;
	color: #DDD;
}

@media screen and (max-width: 828px) {
	.location-content {
  	padding: vw(34px) vw(44px);
		font-size: vw(24px);
		line-height: vw(36px);
	}
}
</style>