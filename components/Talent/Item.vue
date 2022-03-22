<template>
  <LayoutCell :title="title">
		<div class="talent-item">
			<div class="info">
				<div class="logo">
					<!-- <div class="icon" :style="{ 'background-image': `url(${info.Icon})` }"></div> -->
					<div class="icon" :style="{ 'background-image': `url(https://torchlight-front.oss-cn-shanghai.aliyuncs.com/wiki/icon/Icon_Equip_Weapon_1HSword_Epic_001.png)` }"></div>
				</div>
				<div class="desc">
					<div class="name"></div>
					<div class="content"></div>
				</div>
			</div>
			<ul class="talent" name="1"></ul>
			<ul class="talent" name="2"></ul>
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
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
.talent-item {
  padding: 23px 38px;
	.info {
		.logo {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 83px;
			height: 83px;
			background-image: url('@/assets/imgs/talent_logo.png');
			background-position: center;
			background-repeat: no-repeat;
			background-size: contain;
			@media (-webkit-min-device-pixel-ratio: 2) {
				background-image: url('@/assets/imgs/talent_logo_2x.png');
			}

			.icon {
				width: 50px;
				height: 50px;
				background-position: center;
				background-repeat: no-repeat;
				background-size: contain;
			}
		}
	}
}
</style>