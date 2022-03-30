<template>
  <LayoutCell :title="title">
		<ul v-if="info && info.length != 0" class="inner">
      <li v-for="(item, i) in info" :key="i" @click="$emit('view', item.AffixDetailList)">
        <div class="main-affix" v-html="item.MainAffix"></div>
        <ol v-if="item.ExtendArr && item.ExtendArr.length != 0" class="extend">
          <li v-for="(e, i) in item.ExtendArr" :key="i">{{ e }}</li>
        </ol>
      </li>
    </ul>
    <div v-else class="empty">--</div>
  </LayoutCell>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: () => ''
    },
    info: {
      type: Array,
      default: () => []
    }
  }
}
</script>


<style lang="scss" scoped>
.inner {
	width: 100%;
	height: 100%;
  >li:nth-child(even) {
    background-color: #292929;
  }
  >li {
    display: flex;
    justify-content: space-between;
    padding: 13px 20px 6px 20px;
    cursor: pointer;
    .main-affix {
      flex: 1;
      white-space: inherit;
      color: #ddd;
      ::v-deep p {
        display: inline-block;
      }
    }
    .extend {
      max-width: 170px;
      display: flex;
      justify-content: flex-end;
      margin-left: 30px;
      flex-wrap: wrap;
      li {
        height: 17px;
        line-height: 18px;
        padding: 0 6px;
        border-radius: 5px;
        margin: 0 0 7px 7px;
        font-size: 12px;
        color: #000;
        background-color: #FEB833;
        white-space: nowrap;
        // &:last-child {
        //   margin: 0;
        // }
      }
    }
  }
}
.empty {
  padding: 20px;
}
</style>