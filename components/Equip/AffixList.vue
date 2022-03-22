<template>
  <ul class="detailAffix" ref="affix">
    <li v-for="(affix,i) in info" :key="i">
      <div v-if="affix.level" class="level"><i :name="affix.level"></i></div>
      <div class="des" v-html="affix.desc || affix"></div>
    </li>
  </ul>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    info: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      api_explanation: 'http://172.26.151.94:15000/wiki_equip_tips'
    }
  },
  computed: {
      ...mapState(["lang","API"])
  },
  mounted() {
    // 监听v-html渲染的e标签的点击事件, 请求相关解释
    this.listenExplanation()
  },
  methods: {
    listenExplanation() {
      this.$refs.affix.addEventListener('click', (e) => {
        if(e.target.nodeName === 'E') {
          const id = e.target.id;
          if(id || id == 0) {
            // 对于更新频率不高的数据，做session缓存处理
            if(!sessionStorage.getItem(id)) {
              this.$axios.get(this.API['inventory']['tips'], {
                params: {
                  Language: this.lang,
                  Id: e.target.id
                }
              }).then((res) => {
                if(res.status == 200) {
                  this.$Message.info({
                    content: res.data,
                    duration: 3
                  });

                  if(res.data && res.data != null && res.data != 'undefined') {
                    sessionStorage.setItem(id, res.data)
                  }
                }
              })
            }else {
              this.$Message.info({
                content: sessionStorage.getItem(id),
                duration: 3
              });
            }
          }
        }
      })
    }
  }
}
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
          background-color: #4EA8F3;
        }
        &[name="3"] {
          background-color: #975CF6;
        }
        &[name="4"] {
          background-color: #EE833A;
        }
      }
    }
    .des {
      flex: 1;
      color: #fff;
      white-space: normal;
      ::v-deep p {
        display: inline-block !important;
      }
      ::v-deep e {
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
</style>