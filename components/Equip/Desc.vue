<template>
  <LayoutCell :title="title">
    <div class="desc-content" ref="detail">
      <div class="base">
        <div class="title">{{ locale.baseAffix }}</div>
        <ul class="baseAffix" v-if="info.BaseAffix">
          <li v-for="(affix, i) in info.BaseAffix" :key="i" v-html="affix.desc"></li>
        </ul>
      </div>
      <div class="detail">
        <equip-affix-list v-if="info.DetailAffix" :info="info.DetailAffix"></equip-affix-list>
      </div>
      <div class="desc" v-html="info.Desc"></div>
    </div>
  </LayoutCell>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  props: {
    title: {
      type: String,
      default: () => ''
    },
    info: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapState(['lang']),
    ...mapGetters(['getLocale']),
    locale() {
      return {
        baseAffix: this.getLocale('baseAffix')
      }
    }
  }
}
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
    .baseAffix {
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
    color: #DBB97C;
    background-color: #222;
    white-space: normal;
  }
}
</style>

