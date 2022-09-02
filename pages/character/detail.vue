<template>
  <LayoutWrapper class="character-detail">
    <client-only>
      <CharacterName class="in-moile" :info="intro"></CharacterName>
      <MenuBar level="1" :menu="menuLevel1" v-model="id_level1"></MenuBar>
      <div v-show="id_level1 === 'introduction'" class="introduction-content">
        <div class="content-des">
          <CharacterName class="in-pc" :info="intro"></CharacterName>
          <CharacterIntroduce
            :info="[
              {
                title: $t('title_story') || '$title_story',
                desc: [$t(`${intro.name}_introduce_desc`)],
              },
            ]"
          ></CharacterIntroduce>
        </div>
        <div class="content-detail">
          <div class="role-bg" :style="{ transform: `scale(${scale})` }">
            <div
              v-if="intro && intro.theme"
              class="role"
              :style="getRetina(intro.theme.role, intro.theme.role_2x)"
            ></div>
          </div>
        </div>
      </div>
      <div
        v-show="id_level1 === 'characteristic'"
        class="characteristic-content"
      >
        <div class="content-des">
          <CharacterIntroduce
            v-model="sub_CH_name"
            :info="advanced"
          ></CharacterIntroduce>
        </div>
        <div class="content-detail">
          <div class="role-bg" :style="{ transform: `scale(${scale})` }">
            <div
              v-if="intro && intro.theme"
              class="role"
              :style="{ 'background-image': `url(${intro.theme.role})` }"
            ></div>
            <CharacterFeature
              v-if="sub_CH && sub_CH.SkillList"
              class="feature"
              :name="sub_CH_name"
              :info="sub_CH.SkillList"
            ></CharacterFeature>
          </div>
        </div>
      </div>
    </client-only>
  </LayoutWrapper>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      id: "",
      id_level1: "introduction",
      CH: [],
      advanced: [],
      sub_CH_name: "",
      intro: "",
    };
  },
  computed: {
    ...mapGetters(["getCharacterConfig", "getRetina"]),
    ...mapState(["languages", "lang", "API", "scale"]),
    menuLevel1() {
      return [
        {
          id: "introduction",
          content:
            this.$t("character_introduction") || "$character_introduction",
        },
        {
          id: "characteristic",
          content:
            this.$t("character_characteristic") || "$character_characteristic",
        },
      ];
    },
    sub_CH() {
      if (this.CH && this.CH.length != 0 && this.sub_CH_name) {
        return this.CH.find((item) => item.Name === this.sub_CH_name);
      } else {
        return {};
      }
    },
  },
  watch: {
    lang() {
      this.init();
    },
  },
  beforeMount() {
    this.init();
  },
  methods: {
    init() {
      this.id = $nuxt.$route.query.id;
      this.getDetail(this.id);
      this.intro = this.getCharacterConfig(this.id);
    },
    getDetail(id) {
      this.$axios
        .get(this.API["character"]["detail"], {
          params: {
            Language: this.languages[this.lang]?.code,
            HeroId: id,
          },
        })
        .then((res) => {
          if (res.status == 200 && res.data) {
            this.CH = res.data;
            if (this.CH && this.CH.length != 0) {
              this.sub_CH_name = this.CH[0].Name;

              // 进阶特性
              this.advanced = [];
              const _advanced = {
                title: this.$t("character_advanced") || "$character_advanced",
                list: [],
              };
              this.CH.forEach((item) => {
                const obj = {
                  name: item.Name,
                  icon: item.Icon,
                  desc: item.TotalContent.replaceAll("\\n", "\n").split("\n"),
                };
                _advanced.list.push(obj);
              });
              this.advanced.push(_advanced);
            }
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.in-pc {
  display: block;
}
.in-moile {
  display: none;
}
.introduction-content {
  .introduce-box {
    margin-top: 40px;
  }
}

.introduction-content,
.characteristic-content {
  display: flex;
  justify-content: flex-start;
  .content-des {
    width: 560px;
  }
  .content-detail {
    flex: 1;
    position: relative;
    .role-bg {
      position: absolute;
      top: -196px;
      left: -165px;
      width: 879px;
      height: 1080px;
      @include imgBg("introBg.png", "introBg_2x.png");
      transform-origin: 10% 4%;
      .role {
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
      }
    }
  }
}

.introduction-content {
  .content-detail {
    .role-bg {
      .role {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.characteristic-content {
  .content-detail {
    position: relative;
    .feature {
      position: absolute;
      bottom: 40px;
      left: 205px;
    }
    .role-bg {
      .role {
        position: absolute;
        width: 485px;
        height: 596px;
        top: -28px;
        right: 135px;
      }
    }
  }
}

@media screen and (max-width: 828px) {
  .in-pc {
    display: none;
  }
  .in-moile {
    display: block;
  }

  .character-detail {
    padding-top: 0 !important;
    .menu-level1 {
      height: vw(88px);
      background-color: #111;
      padding-top: vw(10px);
    }
  }

  .introduction-content,
  .characteristic-content {
    .introduce-box {
      margin-top: vw(45px);
    }
    .content-des {
      width: vw(708px);
      margin: 0 auto;
    }
  }

  .introduction-content {
    .content-detail {
      display: none;
    }
  }
  .characteristic-content {
    flex-direction: column;
    .content-detail {
      width: 100%;
      height: vw(960px);
      flex: auto;
      .feature {
        bottom: 0;
        left: 0;
      }
      .role-bg {
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        @include imgBg("introBgMobile.png");
        background-size: cover;
        .role {
          display: none;
        }
      }
    }
  }
}
</style>