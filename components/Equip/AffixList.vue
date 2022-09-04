<template>
  <div>
    <ul class="detailAffix" ref="affix">
      <li v-for="(affix, i) in info" :key="i">
        <div v-if="affix.level" class="level"><i :name="affix.level"></i></div>
        <div class="des" v-html="affix.desc || affix"></div>
      </li>
    </ul>
    <Modal
      v-model="explainModal"
      :title="explanTitle"
      class-name="vertical-center-modal"
      :footer-hide="footerHide"
      >{{ explan }}</Modal
    >
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: {
    info: {
      type: Array,
      default: () => [],
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
    ...mapState(["lang", "API"]),
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
.detailAffix {
  font-size: 14px;
  color: #fff;
  li {
    display: flex;
    justify-content: flex-start;
    .level {
      margin-right: 9px;
      i {
        display: inline-block;
        width: 9px;
        height: 9px;
        border-radius: 3px 0;
        &[name="1"] {
          background-color: #fff;
        }
        &[name="2"] {
          background-color: #4ea8f3;
        }
        &[name="3"] {
          background-color: #975cf6;
        }
        &[name="4"] {
          background-color: #ee833a;
        }
      }
    }
    .des {
      flex: 1;
      color: #fff;
      white-space: normal;
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
  .detailAffix {
    font-size: vw(24px);
    li {
      .level {
        margin-right: vw(13px);
        i {
          width: vw(15px);
          height: vw(15px);
          border-radius: vw(4px) 0;
        }
      }
      .des {
        :deep(e) {
          font-size: vw(26px);
          margin: 0 vw(6px);
          border-bottom: vw(2px) solid #50aad4;
          line-height: vw(32px);
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