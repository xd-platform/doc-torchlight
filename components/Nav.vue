<template>
  <div class="header">
    <div class="wrapper">
      <div class="nav-box">
        <div class="logo">Torchlight: Infinite | wiki</div>
        <ul class="nav-list">
          <li 
            v-for="item in navList" 
            :key="item.id"
            :class="{ active: item.id == subNav }"
            @click="handler(item.id)"
          >
            <nuxt-link :to="`/${item.id}?lang=${lang}`">{{ item.name }}</nuxt-link>
          </li>
        </ul>
      </div>
      <div class="tools">
        <div class="home"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  data() {
    return {
      subNav: ''
    }
  },
  computed: {
    ...mapState(['lang', 'LOCALES']),
    ...mapGetters(["getLocale"]),
    navList() {
      return [
				{ id: 'character', name: this.getLocale("nav.character") },
				{ id: 'inventory', name: this.getLocale("nav.inventory") },
				{ id: 'skill', name: this.getLocale("nav.skill") },
				{ id: 'affix', name: this.getLocale("nav.affix") },
				{ id: 'talent', name: this.getLocale("nav.talent") },
			]
    },
  },
  beforeMount() {
    this.subNav = $nuxt.$route.name.split('-')[0]
  },
  methods: {
    handler(id) {
      this.subNav = id
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  background-color: #111;
  font-size: 16px;
  color: #999;
  z-index: 50;
  >.wrapper {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .nav-box {
      display: flex;
      height: 100%;
      align-items: center;
      .logo {
        margin-right: 83px;
      }
      .nav-list {
        display: flex;
        height: 100%;
        li {
          margin: 0 5px;
          a {
            display: inline-block;
            height: 100%;
            display: flex;
            align-items: center;
            padding: 0 20px;
            color: #999;
            font-weight: bolder;
          }
          &.active {
            a {
              background-color: #FFC130;
              color: #111;
              transition: all ease-in-out 200ms;
            }
          }
        }
      }
    }
    .tools {
      display: flex;
      align-items: center;
      height: 100%;
      .home {
        width: 35px;
        height: 35px;
        background-image: url('@/assets/imgs/home.png');
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        cursor: pointer;
        @media (-webkit-min-device-pixel-ratio: 2) {
          background-image: url('@/assets/imgs/home_2x.png');
        }
      }
    }
  }
}
</style>