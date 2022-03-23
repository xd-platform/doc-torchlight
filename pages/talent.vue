<template>
  <LayoutWrapper :class="subNav">
    <TalentMenu v-if="menu_talent.length != 0" :menu="menu_talent" v-model="id_talent"></TalentMenu>
    <LayoutCardList type="large" class="content">
      <TalentItem
        v-for="(info, i) in menuList"
        :key="i"
        :title="info.Name"
				:name="info.Name"
        :info="info"
      ></TalentItem>
    </LayoutCardList>
  </LayoutWrapper>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      subNav: "talent",
      menu_talent: [],
      id_talent: '',
      menuList: [],
    };
  },
  computed: {
    ...mapState(["lang", "API"]),
  },
  watch: {
    id_talent(newID) {
      if (newID) {
        this.getCardList(newID);
      } else {
        this.cardList = [];
      }
    },
  },
  beforeMount() {
    this.getMenu();
  },
  methods: {
    getMenu() {
      this.$axios
        .get(this.API['talent']['menu'], {
          params: {
            Language: this.lang,
          },
        })
        .then((res) => {
          if (res.status == 200) {
            this.menu_talent = res.data;
            this.id_talent =
              this.menu_talent &&
              this.menu_talent.length != 0 &&
              this.menu_talent[0].Id;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getCardList(id) {
      // 防止频繁请求，做session缓存处理
      if(!sessionStorage.getItem(`talent-${id}`)) {
        this.$axios
          .get(this.API["talent"]['list'], {
            params: {
              Language: this.lang,
              ContentList: id,
            },
          })
          .then((res) => {
            if (res.status == 200) {
              this.menuList = res.data

              // 验证是否缓存
              if(
                this.menuList &&
                this.menuList.length != 0 &&
                this.menuList.SubDetailList &&
                this.menuList.SubDetailList.length != 0
              ) {
                sessionStorage.setItem(`talent-${id}`, JSON.stringify(this.menuList))
              }
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }else {
        this.menuList = JSON.parse(sessionStorage.getItem(`talent-${id}`))
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.talent {
  .content {
    margin-top: 12px;
  }
}
</style>