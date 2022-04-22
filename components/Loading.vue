<template>
	<div class="loading-box">
		<div class="anime" ref="anime"></div>
	</div>
</template>

<script>
export default {
	mounted() {
		this.$lottie.loadAnimation({
      container: this.$refs.anime, // the dom element that will contain the animation
      loop: true,
      autoplay: true,
      path: 'https://website.xdcdn.net/homepage/torchlight-doc/lottie.json', // the path to the animation json
    })
	}
}
</script>

<style lang="scss" scoped>
.loading-box {
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	// background-color: rgba(0, 0, 0, 0.5);
	z-index: 100;
	.anime {
		position: absolute;
		// top: 42%;
		bottom: 0;
		width: 160px;
		height: 160px;
		right: 5px;
		// left: 50%;
		// margin-left: -70px;
	}
}
</style>