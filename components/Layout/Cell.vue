<template>
  <div class="cell">
    <div class="title">{{ title }}</div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      typeof: String,
      default: () => ''
    }
  }
}
</script>

<style lang="scss" scoped>
.cell {
  width: 100%;
  margin-bottom: 12px;
  >.title {
    // width: 100%;
    height: 44px;
    line-height: 44px;
    padding: 0 19.5px;
    font-size: 16px;
    color: #fff;
    background-color: #111;
  }
  >.content {
    width: 100%;
    background-color: #222;
  }
}

@media screen and (max-width: 828px) {
	.cell {
		width: vw(750px);
		margin-bottom: vw(24px);
		>.title {
			height: vw(88px);
			line-height: vw(88px);
			padding: 0 vw(34px);
			font-size: vw(28px);
			font-weight: 500;
		}
	}
}
</style>