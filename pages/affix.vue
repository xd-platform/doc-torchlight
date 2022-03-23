<template>
  <LayoutWrapper :class="subNav">
    <!-- 筛选器 -->
    <MenuBar
      v-if="menuLevel1"
      level="1"
      :menu="menuLevel1"
      v-model="id_level1"
    ></MenuBar>
    <MenuBar level="2" :menu="menuLevel2" v-model="idLevel2"></MenuBar>
    <MenuBar level="3" :menu="menuLevel3" v-model="id_level3"></MenuBar>

    <!-- 主体内容 -->
    <LayoutCardList type="large" class="content">
      {{ cardList }}
    </LayoutCardList>
  </LayoutWrapper>
</template>

<script>
import { mapState } from "vuex";
/**
  en_WW 是英文版本
  zh_CN 是中文版
  */

export default {
  layout: "default",
  data() {
    return {
      subNav: "affix",
      menuLevel1: [],
      id_level1: "",
      menuLevel2: [],
      idLevel2: "",
      menuLevel3: [],
      id_level3: "",
      cardList: [],
    };
  },
  watch: {
    id_level1(newID) {
      const subObj = this.menuLevel1.find((item) => item.id == newID);
      if (subObj && subObj.subMenu && subObj.subMenu.length !== 0) {
        this.menuLevel2 = subObj.subMenu;
        this.idLevel2 =
          this.menuLevel2 &&
          this.menuLevel2.length != 0 &&
          this.menuLevel2[0].id;
      } else {
        this.menuLevel2 = [];
        this.idLevel2 = "";
      }
    },
    idLevel2(newID) {
      const subObj = this.menuLevel2.find((item) => item.id == newID);
      if (subObj && subObj.subMenu && subObj.subMenu.length !== 0) {
        this.menuLevel3 = subObj.subMenu;
        this.id_level3 =
          this.menuLevel3 &&
          this.menuLevel3.length != 0 &&
          this.menuLevel3[0].id;
      } else {
        this.menuLevel3 = [];
        this.id_level3 = "";
      }
    },
    id_level3(newID) {
      if (newID) {
        this.getList(newID);
      } else {
        this.cardList = [];
      }
    },
  },
  computed: {
    ...mapState(["lang", 'API']),
  },
  beforeMount() {
    this.getMenu();
  },
  methods: {
    getMenu() {
      this.$axios
        .get(this.API['affix']['menu'], {
          params: {
            Language: this.lang,
          },
        })
        .then((res) => {
          if (res.status == 200 && res.data && res.data.subMenu) {
            this.menuLevel1 = res.data.subMenu;
            this.id_level1 =
              this.menuLevel1 &&
              this.menuLevel1.length != 0 &&
              this.menuLevel1[0].id;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getList(id) {
      this.$axios
        .get(this.API['affix']['list'], {
          params: {
            Language: this.lang,
            ContentList: id,
          },
        })
        .then((res) => {
          if (res.status == 200 && res.data) {
            this.cardList = res.data;
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.inventory {
  > .content {
    margin-top: 25px;
  }
}
</style>