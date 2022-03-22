<template>
  <div class="filter-box" :class="`filter-level${level}`" v-if="filter && filter.length != 0">
    <ul class="list-bar">
      <li
        v-for="(item, key) in filter"
        :key="key"
        :id="item.id"
        :class="{ active: item.id == id }"
        @click="$emit('handler', item.id)"
      >{{ item.content ? item.content : (item.id ? `ID: ${item.id}` : 'ID: none') }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'id',
    event: 'handler'
  },
  props: {
    level: {
      typeof: String,
      default: () => '1'
    },
    filter: {
      typeof: Array,
      default: () => []
    },
    id: {
      typeof: String,
      default: () => ''
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-box {
  width: 100%;
  >.list-bar {
    display: flex;
    li {
      position: relative;
      display: flex;
      cursor: pointer;
    }
  }
}

.filter-level1 {
  padding-bottom: 11px;
  border-bottom: 1px solid #557BAD;
  margin-bottom: 25px;
  >.list-bar {
    li {
      height: 49px;
      padding: 0 10px;
      background-color: #111;
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      margin-right: 10px;
      align-items: center;
      &.active {
        background-color: #FFC130;
        color: #111;
      }
    }
  }
}

.filter-level2 {
  margin-bottom: 16px;
  >.list-bar {
    li {
      height: 30px;
      margin-right: 28px;
      color: #fff;
      font-size: 16px;
      align-items: flex-start;
      // transition: all ease-in-out 200ms;
      &::before {
        content: '';
        width: 67.6%;
        height: 3px;
        background-color: transparent;
        position: absolute;
        bottom: 0;
        left: 50%;
        margin-left: -33.8%;
      }
      // &:hover {
      //   color: #FFC130;
      // }
      &.active {
        color: #FFC130;
        &::before {
          background-color: #FFC130;
        }
      }
    }
  }
}
.filter-level3 {
  margin-bottom: 16px;
  >.list-bar {
    li {
      height: 32px;
      padding: 0 11px;
      background-color: #222;
      color: #666;
      font-size: 14px;
      margin-right: -1px;
      align-items: center;
      border: 1px solid #444;
      &.active {
        border: 1px solid #FFC130;
        color: #FFC130;
        z-index: 1;
      }
    }
  }
}
.filter-level4 {
  margin-bottom: 16px;
  >.list-bar {
    li {
      height: 32px;
      padding: 0 7px;
      background-color: #222;
      color: #666;
      font-size: 14px;
      margin-right: 8px;
      align-items: center;
      border-radius: 5px;
      &.active {
        background-color: #307EFF;
        color: #fff;
      }
    }
  }
}

</style>