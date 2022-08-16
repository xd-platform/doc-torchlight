<template>
  <LayoutCell :title="title">
    <div class="desc-content" ref="detail">
      <div
        v-if="info.BaseAttr && info.BaseAttr.length != 0"
        class="base"
        style="padding: 25px 44px 0"
      >
        <div class="title">{{ locale.baseAttr }}</div>
        <ul class="baseAttr">
          <li
            v-for="(attr, i) in info.BaseAttr"
            :key="i"
            v-html="attr.desc || attr"
          ></li>
        </ul>
      </div>
      <div v-if="info.BaseAffix && info.BaseAffix.length != 0" class="base">
        <div class="title">{{ locale.baseAffix }}</div>
        <ul class="baseAffix">
          <li
            v-for="(affix, i) in info.BaseAffix"
            :key="i"
            v-html="affix.desc || affix"
          ></li>
        </ul>
      </div>
      <div
        v-if="info.DetailAffix && info.DetailAffix.length != 0"
        class="detail"
      >
        <equip-affix-list :info="info.DetailAffix"></equip-affix-list>
      </div>
      <div
        class="desc"
        v-if="info.Desc"
        v-html="info.Desc.replaceAll('\\n', '\n')"
      ></div>
    </div>
  </LayoutCell>
</template>

<script>
import { mapState, mapGetters } from "vuex";

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
  computed: {
    ...mapState(["lang"]),
    ...mapGetters(["getLocale"]),
    locale() {
      return {
        baseAffix: this.getLocale("inventory.baseAffix"),
        baseAttr: this.getLocale("inventory.baseAttr"),
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.desc-content {
  .base {
    padding: 25px 44px;
    border-top: none;
    background-color: #222;
    .title {
      color: #666;
      font-size: 12px;
      font-weight: bolder;
      margin-bottom: 4px;
    }
    .baseAffix,
    .baseAttr {
      font-size: 14px;
      color: #fff;
      ::v-deep p {
        display: inline-block !important;
      }
    }
  }
  .detail {
    padding: 21px 44px;
    background-color: #292929;
  }
  .desc {
    padding: 18px 44px;
    font-size: 12px;
    color: #dbb97c;
    background-color: #222;
    white-space: break-spaces;
    font-weight: bold;
    font-style: italic;
  }
}

@media screen and (max-width: 828px) {
  .desc-content {
    .base {
      padding: vw(38px) vw(44px);
      .title {
        font-size: vw(24px);
        margin-bottom: vw(14px);
      }
      .baseAffix {
        font-size: vw(28px);
      }
    }
    .detail {
      padding: vw(34px) vw(44px);
    }
    .desc {
      padding: vw(30px) vw(44px);
      font-size: vw(24px);
    }
  }
}
</style>

