<template>
  <LayoutCell :title="title">
    <div class="inner">
      <!-- 网格线 -->
      <div
        v-if="info.SubDetailList && info.SubDetailList.length != 0"
        class="line-box"
        :class="`num-${info.SubDetailList.length}`"
      >
        <div class="row" v-for="i in 4" :key="i" :name="i">
          <div class="line" v-for="i in 2" :key="i" :name="i"></div>
        </div>
      </div>
      <!-- 天赋点 -->
      <div class="talent-item" ref="affix">
        <div class="info">
          <div class="logo">
            <div
              class="icon"
              :style="{ 'background-image': `url(${info.Icon})` }"
            ></div>
          </div>
          <div class="desc">
            <div class="name">{{ info.Name }}</div>
            <div class="content" v-html="htmlContent"></div>
          </div>
        </div>
        <ul
          v-if="info.SubDetailList && info.SubDetailList.length != 0"
          class="talent-child"
          name="1"
        >
          <div class="title">{{ $t("talent_level1") || "$talent_level1" }}</div>
          <div class="poptip-icon">
            <Poptip
              :trigger="device === 'pc' ? 'hover' : 'click'"
              :placement="device === 'pc' ? 'right-start' : 'top'"
              padding="0px 0px"
              content="content"
              v-for="(item, i) in info.SubDetailList.slice(0, 3)"
              :key="i"
            >
              <div class="icon-box">
                <div
                  class="icon"
                  :style="{ 'background-image': `url(${item.Icon})` }"
                ></div>
                <div class="name">{{ item.Name }}</div>
              </div>
              <div class="tip" slot="content">
                <div class="title">{{ item.Name }}</div>
                <div class="des" v-html="item.Content"></div>
              </div>
            </Poptip>
          </div>
        </ul>
        <ul
          v-if="info.SubDetailList && info.SubDetailList.length != 0"
          class="talent-child"
          name="2"
        >
          <div class="title">{{ $t("talent_level2") || "$talent_level2" }}</div>
          <div class="poptip-icon">
            <Poptip
              :trigger="device === 'pc' ? 'hover' : 'click'"
              :placement="device === 'pc' ? 'right-start' : 'top'"
              padding="0px 0px"
              content="content"
              v-for="(item, i) in info.SubDetailList.slice(3, 6)"
              :key="i"
            >
              <div class="icon-box">
                <div
                  class="icon"
                  :style="{ 'background-image': `url(${item.Icon})` }"
                ></div>
                <div class="name">{{ item.Name }}</div>
              </div>
              <div class="tip" slot="content">
                <div class="title">{{ item.Name }}</div>
                <div class="des" v-html="item.Content"></div>
              </div>
            </Poptip>
          </div>
        </ul>
      </div>
    </div>
    <Modal
      v-model="explainModal"
      :title="explanTitle"
      class-name="vertical-center-modal"
      :footer-hide="footerHide"
      >{{ explan }}</Modal
    >
  </LayoutCell>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: {
    title: {
      type: String,
      default: () => "",
    },
    info: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      footerHide: true,
      explainModal: false,
      explanTitle: "",
      explan: "",
    };
  },
  computed: {
    ...mapState(["device", "lang", "API"]),
    htmlContent() {
      let content = this.$props.info.Content;
      if (content) {
        return content.replaceAll("\\n", "\n");
      } else {
        return "";
      }
    },
  },
  mounted() {
    // 监听v-html渲染的e标签的点击事件, 请求相关解释
    this.listenExplanation();
  },
  methods: {
    ...mapActions(["getTip"]),
    listenExplanation() {
      this.$refs.affix.addEventListener("click", async (e) => {
        if (e.target.nodeName === "E") {
          const id = e.target.id;
          if (id || id == 0) {
            const explan = await this.getTip(id);
            this.explanTitle = e.target.innerText;
            this.explan = explan.replaceAll("\\n", "\n").split("\n").join("");
            this.explainModal = true;
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.inner {
  width: 100%;
  height: 100%;
  position: relative;
}
.talent-item {
  position: relative;
  height: 416px;
  padding: 23px 38px;
  display: flex;
  justify-content: flex-start;
  .info {
    width: 147px;
    .logo {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 83px;
      height: 83px;
      @include imgBg("talentLogo.png", "talentLogo_2x.png");

      > .icon {
        width: 60px;
        height: 60px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
      }
    }
    .desc {
      margin-top: 20px;
      .name {
        font-size: 20px;
        color: #ffc130;
        font-weight: bold;
      }
      .content {
        white-space: pre-wrap;
        font-size: 12px;
        color: #999;
        line-height: 18px;
        margin-top: 10px;
      }
    }
  }
  .talent-child {
    width: 68px;
    position: relative;
    margin-top: 10px;
    > .title {
      display: none;
    }

    .poptip-icon {
      > div {
        position: absolute;
        &:nth-child(1) {
          top: 0;
        }
        &:nth-child(2) {
          top: 119px;
        }
        &:nth-child(3) {
          top: 238px;
        }
      }
    }

    .icon-box {
      cursor: pointer;
      > .icon {
        width: 68px;
        height: 68px;
        background-color: #111;
        border: 4px solid #111;
        border-radius: 50%;
        transition: all ease-in-out 200ms;

        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
      }
      > .name {
        font-size: 14px;
        color: #999;
        width: 68px;
        line-height: 15px;
        text-align: center;
        margin-top: 8px;
      }

      &:hover {
        > .icon {
          border-color: #ffc130;
        }
      }
    }

    &[name="1"] {
      margin-left: 100px;
    }
    &[name="2"] {
      margin-left: 117px;
    }

    .tip {
      width: 294px;
      padding: 20px 15px 30px;
      background-color: #111;
      border-radius: 0 20px;
      .title {
        width: 100%;
        border-bottom: 1px solid #333;
        color: #ffc130;
        padding: 0 8px 15px;
        font-size: 18px;
        font-weight: bold;
      }
      .des {
        color: #fff;
        margin-top: 16px;
        white-space: initial;
        padding: 0 8px;
        :deep(p) {
          display: inline-block !important;
        }
        :deep(e) {
          display: inline-block !important;
          color: #50aad4;
          font-size: 15px;
          margin: 0 3px;
          border-bottom: 1px solid #50aad4;
          line-height: 18px;
          cursor: pointer;
        }
      }
    }
  }
}

.line-box {
  position: absolute;
  top: 68px;
  left: 100px;
  width: 385px;
  height: 240px;

  display: flex;
  .row {
    display: flex;
    flex-direction: column;
    &[name="1"] {
      width: 134px;
    }
    &[name="2"] {
      width: 85px;
    }
    &[name="3"] {
      width: 85px;
    }
    &[name="4"] {
      flex: 1;
    }
    .line {
      &[name="1"] {
        height: 122px;
      }
      &[name="2"] {
        flex: 1;
      }
    }
  }

  &.num-1 {
    .row {
      &[name="1"],
      &[name="2"] {
        .line[name="1"] {
          border-top: 2px solid #666;
        }
      }
    }
  }
  &.num-2 {
    .row {
      &[name="1"] {
        .line[name="1"] {
          border-top: 2px solid #666;
        }
      }
      &[name="2"] {
        .line[name="1"] {
          border: 2px solid #666;
          border-right: none;
        }
      }
    }
  }
  &.num-3 {
    .row {
      &[name="1"] {
        .line[name="1"] {
          border-top: 2px solid #666;
        }
      }
      &[name="2"] {
        .line {
          &[name="1"] {
            border: 2px solid #666;
            border-right: none;
          }
          &[name="2"] {
            border-left: 2px solid #666;
            border-bottom: 2px solid #666;
          }
        }
      }
    }
  }
  &.num-4 {
    .row {
      &[name="1"] {
        .line[name="1"] {
          border-top: 2px solid #666;
        }
      }
      &[name="2"] {
        .line {
          &[name="1"] {
            border: 2px solid #666;
            border-right: none;
          }
          &[name="2"] {
            border-left: 2px solid #666;
            border-bottom: 2px solid #666;
          }
        }
      }
      &[name="3"] {
        .line[name="1"] {
          border: 2px solid #666;
          border-left: none;
        }
      }
      &[name="4"] {
        .line[name="1"] {
          border-top: 2px solid #666;
        }
      }
    }
  }
  &.num-5 {
    .row {
      &[name="1"] {
        .line[name="1"] {
          border-top: 2px solid #666;
        }
      }
      &[name="2"] {
        .line {
          &[name="1"] {
            border: 2px solid #666;
            border-right: none;
          }
          &[name="2"] {
            border-left: 2px solid #666;
            border-bottom: 2px solid #666;
          }
        }
      }
      &[name="3"] {
        .line {
          &[name="1"] {
            border: 2px solid #666;
            border-left: none;
          }
          &[name="2"] {
            border-right: 2px solid #666;
            border-bottom: 2px solid #666;
          }
        }
      }
      &[name="4"] {
        .line[name="1"] {
          border-top: 2px solid #666;
          border-bottom: 2px solid #666;
        }
      }
    }
  }
  &.num-6 {
    .row {
      &[name="1"] {
        .line[name="1"] {
          border-top: 2px solid #666;
        }
      }
      &[name="2"] {
        .line {
          &[name="1"] {
            border: 2px solid #666;
            border-right: none;
          }
          &[name="2"] {
            border-left: 2px solid #666;
            border-bottom: 2px solid #666;
          }
        }
      }
      &[name="3"] {
        .line {
          &[name="1"] {
            border: 2px solid #666;
            border-left: none;
          }
          &[name="2"] {
            border-right: 2px solid #666;
            border-bottom: 2px solid #666;
          }
        }
      }
      &[name="4"] {
        .line {
          &[name="1"] {
            border-top: 2px solid #666;
            border-bottom: 2px solid #666;
          }
          &[name="2"] {
            border-bottom: 2px solid #666;
          }
        }
      }
    }
  }
}

:deep(.vertical-center-modal) {
  display: flex;
  align-items: center;
  justify-content: center;
  .ivu-modal {
    top: 0;
  }
}
:deep(.ivu-modal-mask) {
  background-color: rgba(0, 0, 0, 0.3);
}
:deep(.ivu-modal-content) {
  background-color: #111;
  border-radius: 0 30px;
  color: #fff;
  padding: 0 12px;
}
:deep(.ivu-modal-header) {
  border-bottom: 1px solid #333;
}
:deep(.ivu-modal-header-inner) {
  color: #ffc130;
  font-weight: 700;
}
:deep(.ivu-modal-body) {
  padding: 30px 16px;
}

@media screen and (max-width: 828px) {
  .line-box {
    display: none;
  }

  .talent-item {
    height: auto;
    padding: 0;
    flex-direction: column;
    .info {
      width: 100%;
      padding: vw(45px);
      display: flex;
      justify-content: flex-start;
      .logo {
        width: vw(120px);
        height: vw(120px);
        > .icon {
          width: vw(90px);
          height: vw(90px);
        }
      }
      .desc {
        flex: 1;
        margin-top: 0;
        margin-left: vw(60px);
        .name {
          font-size: vw(32px);
        }
        .content {
          font-size: vw(24px);
          line-height: vw(32px);
          margin-top: vw(18px);
        }
      }
    }
    .talent-child {
      width: 100%;
      // height: vw(294px);
      margin: 0;
      padding: vw(45px) vw(36px) vw(45px);
      display: flex;
      justify-content: flex-start;
      > .title {
        display: block;
        width: vw(178px);
        font-size: vw(28px);
        color: #fff;
        font-weight: 700;
        padding: vw(33px) vw(30px) 0 0;
      }

      .poptip-icon {
        width: vw(460px);
        display: flex;
        justify-content: space-between;
        > div {
          position: inherit;
          top: 0;
        }
      }

      .icon-box {
        > .icon {
          width: vw(100px);
          height: vw(100px);
          border: vw(6px) solid #111;
        }
        > .name {
          font-size: vw(24px);
          width: vw(100px);
          line-height: vw(26px);
          margin-top: vw(18px);
        }
      }

      &[name="1"] {
        margin-left: 0;
        background-color: #292929;
      }
      &[name="2"] {
        margin-left: 0;
      }

      .tip {
        width: vw(588px);
        padding: vw(46px) vw(43px);
        border-radius: 0 vw(20px);
        .title {
          border-bottom: vw(2px) solid #333;
          padding: 0 vw(16px) vw(15px);
          font-size: vw(36px);
        }
        .des {
          font-size: vw(24px);
          margin-top: vw(32px);
          padding: 0 vw(16px);
          :deep(e) {
            font-size: vw(26px);
            margin: 0 vw(6px);
            border-bottom: vw(2px) solid #50aad4;
            line-height: vw(32px);
          }
        }
      }
    }
  }

  :deep(.ivu-modal) {
    width: vw(588px) !important;
  }

  :deep(.ivu-modal-content) {
    border-radius: 0 vw(50px);
    padding: 0 vw(27px);
  }
  :deep(.ivu-modal-header) {
    border-bottom: vw(2px) solid #333;
    padding: 0 vw(16px);
  }
  :deep(.ivu-modal-header-inner) {
    color: #ffc130;
    font-size: vw(36px);
    height: vw(100px);
    line-height: vw(105px);
  }
  :deep(.ivu-modal-body) {
    padding: vw(32px) vw(16px) vw(58px);
    font-size: vw(24px);
  }
  :deep(.ivu-modal-close) {
    top: auto;
    bottom: vw(-120px);
    right: 50%;
    transform: translate3d(50%, 0, 0);
    .ivu-icon-ios-close {
      font-size: vw(100px);
      color: #fff;
      font-weight: 800;
    }
  }
}
</style>