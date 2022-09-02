<template>
  <div class="header">
    <div class="wrapper">
      <div class="nav-box">
        <div class="logo">
          <div class="icon"></div>
        </div>
        <ul class="nav-list">
          <li
            v-for="nav in navList"
            :key="nav"
            :class="{ active: nav == subNav }"
            :name="nav"
          >
            <nuxt-link :to="`/${nav}`">
              {{ $t(`nav_${nav}`) || `$nav_${nav}` }}
            </nuxt-link>
          </li>
        </ul>
      </div>
      <div class="tools-box">
        <div class="logo">
          <div class="icon"></div>
        </div>
        <div class="tools">
          <Poptip
            style="position: relative"
            :trigger="device === 'pc' ? 'hover' : 'click'"
            placement="bottom"
            content="content"
            v-model="visible"
          >
            <div class="icon"></div>
            <ul class="language" slot="content">
              <li
                v-for="(item, id) in languages"
                :key="id"
                :class="{ active: lang == id }"
                @click="switchLanguage(id)"
              >
                {{ item.name }}
              </li>
            </ul>
          </Poptip>
          <div class="home">
            <a href="https://torchlight.xd.com" target="_blank"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { getLocale } from "@/utils/getLocale";

export default {
  data() {
    return {
      navList: ["character", "inventory", "affix", "talent"],
      hideNavList: ["character"],
      subNav: "",
      visible: false,
    };
  },
  computed: {
    ...mapState(["lang", "device", "languages"]),
  },
  watch: {
    "$nuxt.$route.path": {
      handler($path) {
        if ($path) {
          this.subNav = $path.split("/")[1];
        }
      },
      immediate: true,
      deep: true,
    },
  },
  beforeMount() {
    this.autoLanguage();
  },
  methods: {
    ...mapMutations(["SETLANG", "EMPTYSTATE", "SETSHOWNAV"]),
    autoLanguage() {
      // 查看用户配置语言
      let locale = "";
      if (process.client) {
        locale = window.localStorage.getItem("torchligth:locale");
      }
      if (!locale) {
        locale = getLocale();
      }
      if (!this.languages[locale]) {
        // 没有配置当地语言
        locale = "en";
      }

      this.SETLANG(locale);
      this.$i18n.setLocale(locale);
    },
    switchLanguage(locale) {
      window.localStorage.setItem("torchligth:locale", locale);
      this.SETLANG(locale);
      this.$i18n.setLocale(locale);
      this.EMPTYSTATE();
      this.visible = false;
      // this.updateRouteQuery("lang", id);
    },
    // updateRouteQuery(key, value) {
    //   let { query } = $nuxt.$route;
    //   if (query[key] == value) return;
    //   this.$router.replace({
    //     query: { ...query, [key]: value },
    //   });
    // },
  },
};
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 74px;
  background-color: #111;
  font-size: 20px;
  color: #999;
  z-index: 50;
  > .wrapper {
    width: 100%;
    height: 100%;
    padding: 0 79px 0 72px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .logo {
      width: 241px;
      height: 72px;
      .icon {
        width: 100%;
        height: 100%;
      }
    }
    .nav-box {
      display: flex;
      height: 100%;
      align-items: center;
      .logo {
        margin-right: 60px;
        .icon {
          // &.zh-cn {
          //   @include imgBg("logo.png", "logo_2x.png");
          // }
          // &.en {
          @include imgBg("logoEn.png", "logoEn_2x.png");
          // }
        }
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
              background-color: #ffc130;
              color: #111;
              transition: all ease-in-out 200ms;
            }
          }
        }
      }
    }
    .tools-box {
      height: 100%;
      .logo {
        display: none;
      }
      .tools {
        display: flex;
        align-items: center;
        height: 100%;
        .icon {
          width: 35px;
          height: 35px;
          @include imgBg("local.png", "local_2x.png");
          cursor: pointer;
        }
        .home {
          width: 35px;
          height: 35px;
          @include imgBg("home.png", "home_2x.png");
          cursor: pointer;
          margin-left: 15px;
          a {
            display: inline-block;
            width: 100%;
            height: 100%;
          }
        }

        .language {
          width: 160px;
          height: 390px;
          overflow: auto;
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
}

@media screen and (max-width: 828px) {
  .header {
    height: vw(196px);
    font-size: vw(32px);
    > .wrapper {
      padding: 0;
      justify-content: flex-start;
      flex-direction: column-reverse;
      .logo {
        width: vw(375px);
        height: vw(127px);
        margin-left: vw(10px);
      }
      .nav-box {
        height: vw(88px);
        overflow-y: hidden;
        overflow-x: scroll;
        @include hideScrollBar;

        .logo {
          display: none;
        }
        .nav-list {
          li {
            margin: 0 vw(10px);
            a {
              position: relative;
              padding: 0 vw(20px);
              font-weight: 600;
              &::before {
                content: "";
                width: 67.6%;
                height: vw(3px);
                background-color: transparent;
                position: absolute;
                bottom: 0;
                left: 50%;
                margin-left: -33.8%;
              }
            }
            &.active {
              a {
                background-color: transparent;
                color: #ffc130;
                &::before {
                  background-color: #ffc130;
                }
              }
            }
          }
        }
      }
      .tools-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: vw(108px);
        .logo {
          display: block;
          .icon {
            // &.zh_CN {
            //   @include imgBg("logo.png");
            // }
            // &.en_WW {
            @include imgBg("logoEn.png");
            // }
          }
        }
        .tools {
          .icon {
            width: vw(60px);
            height: vw(60px);
          }
          .home {
            width: vw(60px);
            height: vw(60px);
            margin: 0 vw(30px) 0 vw(32px);
          }

          .language {
            width: vw(226px);
            padding: vw(10px) 0;
            li {
              padding: vw(10px) 0;
              font-size: vw(24px);
            }
          }
        }
      }
    }
  }
}

:deep(.ivu-poptip) {
  display: inherit;
}
:deep(.ivu-poptip-popper) {
  margin-top: 5px;
}
</style>