<template>
	<div class="name-box" v-if="info.theme && Object.keys(info.theme).length != 0">
		<div
			class="name-bg"
			:style="getRetina(info.theme.nameBg, info.theme.nameBg_2x)"
		>
			<div class="name">{{ info.name }}</div>
			<div class="player" v-if="info.video"></div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	props: {
		info: {
			typeof: Object,
			default: () => {}
		}
	},
  computed: {
    ...mapGetters(["getRetina"])
  }
}
</script>

<style lang="scss" scoped>
.name-box {
	.name-bg {
		width: 100%;
		height: 105px;
		background-position: 0 center;
		background-repeat: no-repeat;
		background-size: contain;
		display: flex;
		align-items: center;
		.name {
			font-size: 60px;
			font-weight: 800;
			color: #fff;
		}
		.player {
			width: 72px;
			height: 72px;
			@include imgBg('player.png', 'player_2x.png');
			margin-left: 40px;
			cursor: pointer;
		}
	}
}
</style>