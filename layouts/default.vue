<template>
  <div id="App">
    <Nav />
    <div class="wrapper">
      <nuxt/>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  beforeMount() {
    const lang = $nuxt.$route.query.lang || 'en_WW';
    this.SETLANG(lang);
  },
  methods: {
    ...mapMutations(['SETLANG']),
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
    height: calc(100vh - 60px);
    margin-top: 60px;
    overflow-x: hidden;
    overflow-y: scroll;
  }
}
</style>