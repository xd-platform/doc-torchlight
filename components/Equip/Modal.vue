<template>
  <div class="inventory-detail">
    <div :class="`icon-box rare-${info.RateVal}`">
      <div
        class="icon"
        :style="{ 'background-image': `url(${info.Icon})` }"
      ></div>
    </div>
    <div class="detail-box">
      <div class="inner">
        <div class="info">
          <div class="name">{{ info.Name }}</div>
          <div class="des">
            <div class="needLevel">
              {{ $t("inventory_needLevel") || "$inventory_needLevel" }}
              {{ info.NeedLevel }}
            </div>
            <div class="type">{{ info.WeaponType }}</div>
          </div>
        </div>
        <div class="base" v-if="info.BaseAttr && info.BaseAttr.length !== 0">
          <div class="title">
            {{ $t("inventory_baseAttr") || "$inventory_baseAttr" }}
          </div>
          <ul class="baseAttr">
            <li
              v-for="(attr, i) in info.BaseAttr"
              :key="i"
              v-html="attr.desc || attr"
            ></li>
          </ul>
        </div>
        <div class="base" v-if="info.BaseAffix && info.BaseAffix.length !== 0">
          <div class="title">
            {{ $t("inventory_baseAffix") || "$inventory_baseAffix" }}
          </div>
          <ul class="baseAffix">
            <li
              v-for="(affix, i) in info.BaseAffix"
              :key="i"
              v-html="affix.desc || affix"
            ></li>
          </ul>
        </div>
        <div v-if="info.DetailAffix" class="detail">
          <equip-affix-list :info="info.DetailAffix"></equip-affix-list>
        </div>
        <div
          v-if="info.Desc"
          class="desc"
          v-html="info.Desc.replaceAll('\\n', '\n')"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  props: {
    info: {
      typeof: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapState(["lang"]),
  },
};
</script>

<style lang="scss" scoped>
.inventory-detail {
  position: relative;
  width: 324px;
  .icon-box {
    width: 76px;
    height: 76px;
    border-radius: 0 12px;
    position: absolute;
    top: -38px;
    left: 50%;
    margin-left: -38px;
    background: #111;
    border: 5px solid #0b0b0b;
    .icon {
      background-position: center;
      background-repeat: no-repeat;
      background-size: 85% 85%;
      width: 100%;
      height: 100%;
    }
  }
  .detail-box {
    margin-top: 38px;
    width: 100%;
    background-color: #1a1a1a;
    padding: 11px;
    border-radius: 0 25px;
    .inner {
      border: 1px solid #333;
      border-radius: 0 20px;
      > div {
        border-bottom: 1px solid #333;
        &:last-child {
          border: none;
        }
      }
    }
    .info {
      padding: 33px 0 12px;
      .name {
        color: #ffc130;
        font-size: 19px;
        font-weight: bolder;
        text-align: center;
        margin-bottom: 5px;
      }
      .des {
        display: flex;
        justify-content: center;
        font-size: 12px;
        color: #bfbfbf;
        .needLevel,
        .type {
          height: 23px;
          line-height: 22px;
          padding: 0 5px;
          border: 1px solid #333;
          border-radius: 0 7px;
          margin: 0 4px;
        }
      }
    }
    .base {
      padding: 12px 0;
      border-top: none;
      text-align: center;
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
        :deep(p) {
          display: inline-block !important;
        }
      }
    }
    .detail {
      padding: 12.5px 20px 17.5px 15px;
      border-top: none;
    }
    .desc {
      padding: 15px 17px 20px;
      border-top: none;
      font-size: 12px;
      color: #dbb97c;
      white-space: break-spaces;
      font-weight: bold;
      font-style: italic;
    }
  }
}
</style>