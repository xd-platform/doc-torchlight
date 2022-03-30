<template>
  <div class="cover">
    <div class="box">
      <div class="inner">
        <ul class="content">
          <li v-for="(item, i) in infoFilter" :key="i">
            <div class="tier">{{ item.Tier }}</div>
            <div class="name" v-html="item.Affix"></div>
            <div class="extend-box">
              <ol v-if="item.ExtendArr && item.ExtendArr.length != 0" class="extend">
                <li v-for="(e, i) in item.ExtendArr" :key="i">{{ e }}</li>
              </ol>
            </div>
          </li>
        </ul>
      </div>
      <div class="close" @click="$emit('close')">×</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      info_: []
    }
  },
  computed: {
    infoFilter() {
      this.info_ = Object.assign([], this.$props.info);
      return this.info_.sort(function(a, b){return a['Tier'] - b['Tier']}); 
    }
  }
}
</script>

<style lang="scss" scoped>
.cover {
  position: fixed;
  top: 0;
  left: 50%;
  margin-left: -50vw;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
  .box {
    position: relative;
    width: 600px;
    background-color: #111;
    box-shadow: 0 0 10px 0px #141414;
    .inner {
      width: 100%;
      height: 100%;
      max-height: 40vh;
      padding: 37px 46px;
      overflow-x: hidden;
      overflow-y: scroll;
    }
    .content {
      width: 100%;
      border: 1px solid #333;
      color: #fff;
      li {
        display: flex;
        justify-content: flex-start;
        border-bottom: 1px solid #333;
        &:last-child {
          border-bottom: none;
        }
        >div {
          padding: 15px 10px 8px 10px;
        }
        .tier {
          width: 44px;
          border-right: 1px solid #333;
          text-align: center;
        }
        .name {
          width: 280px;
          border-right: 1px solid #333;
          ::v-deep p {
            display: inline-block;
          }
        }
        .extend-box {
          width: 178px;
          .extend {
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            li {
              height: 18px;
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
    }
    .close {
      font-size: 26px;
      position: absolute;
      top: 0px;
      right: 15px;
      cursor: pointer;
    }
  }
}
</style>