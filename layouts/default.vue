<template>
  <div id="App">
    <Nav />
    <div class="wrapper">
      <nuxt/>
    </div>
		<Loading v-show="loading"></Loading>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
	data() {
		return {
			tamp: 0,
			now: 0,
			scale: 1,
			// wrapperStyle: { height: 'calc(100vh - 23.6714975845vw)' }
		}
	},
	computed: {
		...mapState(['loading', 'clientWidth', 'clientHeight'])
	},
  beforeMount() {
		if(['torchlight-doc.xd-cf-2022.workers.dev', 'torchlight-doc.xd.com'].indexOf(window.location.host) > 0) {
			this.SETENV('prod')
		}else {
			this.SETENV('dev')
		}

		const devicePixelRatio = window.devicePixelRatio;
		this.SETDEVICEPIXELRATIO(devicePixelRatio);

    const lang = $nuxt.$route.query.lang || 'en_WW';
    this.SETLANG(lang);

		window.onresize = this.handleResize
		this.handleResize()
  },
  methods: {
    ...mapMutations(['SETLANG', 'SETDEVICEPIXELRATIO', 'SETENV', 'SETDEVICE', 'SETSCALE', 'SETCLIENTSIZE']),
		handleResize() {
			this.now = new Date().getTime()
			if(this.now - this.tamp > 100) {

				const _height = document.documentElement.clientHeight
				const _width = document.documentElement.clientWidth
				if(_width > 828) {
					this.SETDEVICE('pc')

					if(_height !== this.clientHeight) {
						if(_height > 1080) {
							this.scale = _height / 1080
						}else {
							this.scale = 1
						}

						this.SETSCALE(this.scale)
					}
				}else {
					// this.wrapperStyle = { height: `calc(${_height} - 23.6714975845vw)` }
					// console.log(this.wrapperStyle)
					this.SETDEVICE('app')

					this.scale = 1
					this.SETSCALE(this.scale)
				}

				this.tamp = this.now

				this.SETCLIENTSIZE({
					width: _width,
					height: _height
				})
				// console.log(this.clientWidth, this.clientHeight)
			}
		},
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/imgs.bg.scss';

#App {
  position: relative;
  width: 100%;
  height: 100vh;
  background-image: url($bg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    display: inline-block;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.6) 100%);
  }
  >.wrapper {
    width: 100%;
    height: calc(100vh - 76px);
    margin-top: 74px;
    overflow-x: hidden;
    overflow-y: scroll;
  }
}

@media screen and (max-width: 828px) {
	@import '@/assets/scss/imgs.bgMobile.scss';
	#App {
  	background-image: url($bgMobile);
		>.wrapper {
			margin-top: vw(196px);
    	height: calc(100vh - vw(196px));
		}
	}
}
</style>