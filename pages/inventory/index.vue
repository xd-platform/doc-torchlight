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
    <MenuBar level="3" :menu="meuuLevel3" v-model="idLevel3"></MenuBar>
    <!-- <MenuBar level="4" :menu="list_level4" v-model="id_level4"></MenuBar> -->

    <!-- 主体内容 -->
    <LayoutCardList type="thumbnail" class="content">
      <Poptip
        trigger="hover"
        placement="right-start"
        padding="0px 0px"
        content="content"
        v-for="(card, i) in cardList"
        :key="i"
      >
        <CardThumbnail :type="subNav" :info="card">
          <nuxt-link
            :to="`/${subNav}/${card.Id}/detail?lang=${lang}`"
            target="_blank"
          ></nuxt-link>
        </CardThumbnail>
        <EquipModal :info="card" slot="content"></EquipModal>
      </Poptip>
    </LayoutCardList>
  </LayoutWrapper>
</template>

<script>
import { mapState, mapActions } from "vuex";
/**
  en_WW 是英文版本
  zh_CN 是中文版
  */

export default {
  layout: "default",
  data() {
    return {
      subNav: "inventory",
      menuLevel1: [],
      id_level1: "",
      menuLevel2: [],
      idLevel2: "",
      meuuLevel3: [],
      idLevel3: "",
      cardList: [],
    };
  },
  computed: {
    ...mapState(["lang"]),
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
        this.meuuLevel3 = subObj.subMenu;
        this.idLevel3 =
          this.meuuLevel3 &&
          this.meuuLevel3.length != 0 &&
          this.meuuLevel3[0].id;
      } else {
        this.meuuLevel3 = [];
        this.idLevel3 = "";
      }
    },
    idLevel3(newID) {
      if (newID) {
        this.reqList(newID);
      } else {
        this.cardList = [];
      }
    },
    lang() {
      // 监听到语言变化，重新请求接口
      this.emptyData()
      this.initMenu()
    }
  },
  beforeMount() {
    this.initMenu();
  },
  methods: {
    ...mapActions(['getMenu', 'getList']),
    async initMenu() {
      const menu = await this.getMenu('inventory');
      if(menu && menu.length != 0) {
        this.menuLevel1 = menu;
        this.id_level1 = menu && menu.length != 0 && menu[0].id;
      }
    },
    async reqList(id) {
      const list = await this.getList({ nav: 'inventory', id: id });
      if(list && list.length != 0) {
        this.cardList = list;
      }
    },
    emptyData() {
      this.menuLevel1 = []
      this.id_level1 = ""
      this.menuLevel2 = []
      this.idLevel2 = ""
      this.meuuLevel3 = []
      this.idLevel3 = ""
      this.cardList = []
    }
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