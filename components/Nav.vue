<template>
  <div class="header">
    <div class="wrapper">
      <div class="nav-box">
        <div class="logo">Torchlight: Infinite | wiki</div>
        <ul class="nav-list" >
          <li 
            v-for="item in navList" 
            :key="item.id"
            :class="{ active: item.id == subNav }"
          >
            <nuxt-link :to="`/${item.id}?lang=${lang}`">{{ item.name }}</nuxt-link>
          </li>
        </ul>
      </div>
      <div class="tools">
        <Poptip
          trigger="hover"
          placement="bottom"
          content="content"
          v-model="visible"
        >
          <div class="icon"></div>
          <ul class="language" slot="content">
            <li
              v-for="(item, i) in language"
              :key="i"
              :class="{ active: lang == item.id }"
              @click="switchLang(item.id)"
            >{{ item.name }}</li>
          </ul>
        </Poptip>
        <div class="home"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  data() {
    return {
      subNav: '',
      language: [
        { name: '简体中文', id: 'zh_CN' },
        { name: 'English', id: 'en_WW' },
      ],
      visible: false
    }
  },
  computed: {
    ...mapState(['lang', 'LOCALES']),
    ...mapGetters(["getLocale"]),
    navList() {
      return [
				{ id: 'character', name: this.getLocale("nav.character") },
				{ id: 'inventory', name: this.getLocale("nav.inventory") },
				// { id: 'skill', name: this.getLocale("nav.skill") },
				{ id: 'affix', name: this.getLocale("nav.affix") },
				{ id: 'talent', name: this.getLocale("nav.talent") },
			]
    },
  },
  watch: {
    '$nuxt.$route.name': {
      handler($name) {
        if($name) {
          this.subNav = $name.split('-')[0];
        }
      },
      immediate: true,
      deep: true
    }
  },
	created() {
		this.initTheme()
	},
  methods: {
    ...mapMutations(['SETLANG', 'EMPTYSTATE']),
    ...mapActions(['getTheme']),
    switchLang(id) {
      this.visible = false
      this.updateRouteQuery('lang', id);
      this.SETLANG(id)
      this.EMPTYSTATE()

			this.initTheme()
    },
    updateRouteQuery(key, value) {
      let { query } = $nuxt.$route;
      if (query[key] == value) return;
      this.$router.replace({
          query: { ...query, [key]: value },
      });
    },
		async initTheme() {
			await this.getTheme('character')
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
      .icon {
        width: 35px;
        height: 35px;
        @include imgBg('local.png', 'local_2x.png');
        cursor: pointer;
      }
      .home {
        width: 35px;
        height: 35px;
        @include imgBg('home.png', 'home_2x.png');
        cursor: pointer;
        margin-left: 15px;
      }

      .language {
        width: 160px;
        background-color: #111;
        padding: 10px 0;
        li {
          padding: 10px 0;
          text-align: center;
          cursor: pointer;
          transition: all ease-in-out 200ms;
          &:hover {
            background-color: #222;
          }

          &.active {
            color: #fff;
          }
        }
      }
    }
  }
}

::v-deep .ivu-poptip {
  display: inherit;
}
::v-deep .ivu-poptip-popper {
  margin-top: 5px;
}
</style>