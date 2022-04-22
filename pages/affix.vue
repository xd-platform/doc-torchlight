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
    <LayoutCardList v-if="Object.keys(cardFilter).length != 0" type="large" class="content">
      <AffixItem
        :title="getLocale('affix.prefix')"
        :info="cardFilter['prefix']"
        @view="viewAffixDetail"
      ></AffixItem>
      <AffixItem
        :title="getLocale('affix.suffix')"
        :info="cardFilter['suffix']"
        @view="viewAffixDetail"
      ></AffixItem>
    </LayoutCardList>

    <AffixModal
      v-if="showModal"
      :info="modalInfo"
      @close="closeAffixDetail"
    ></AffixModal>
  </LayoutWrapper>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
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
      cardFilter: {},

      showModal: false,
      modalInfo: []
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
        this.reqList(newID);
      } else {
        this.cardFilter = {};
      }
    },
    lang() {
      // 监听到语言变化，重新请求接口
      this.emptyData()
      this.initMenu()
    }
  },
  computed: {
    ...mapState(['lang', 'API']),
    ...mapGetters(["getLocale"]),
  },
  beforeMount() {
    this.initMenu();
  },
  methods: {
    ...mapActions(['getMenu', 'getList']),
    async initMenu() {
      const menu = await this.getMenu('affix');
      if(menu && menu.length != 0) {
        this.menuLevel1 = menu;
        this.id_level1 = menu && menu.length != 0 && menu[0].id;
      }
    },
    async reqList(id) {
      this.cardFilter = {
        prefix: [],
        suffix: []
      }
			
      const list = await this.getList({ nav: 'affix', id: id });
      if(list && list.length != 0) {
        list.forEach(item => {
          if(item.ModifierType == 3) {
            this.cardFilter.prefix.push(item)
          }else if(item.ModifierType == 4) {
            this.cardFilter.suffix.push(item)
          }
        });
      }
    },
    viewAffixDetail(v) {
      this.modalInfo = v
      this.showModal = true
    },
    closeAffixDetail() {
      this.showModal = false
      this.modalInfo = []
    },
    emptyData() {
      this.menuLevel1 = []
      this.id_level1 = ""
      this.menuLevel2 = []
      this.idLevel2 = ""
      this.menuLevel3 = []
      this.id_level3 = ""
      this.cardFilter = {}
      this.showModal = false
      this.modalInfo = []
    }
  },
};
</script>

<style lang="scss" scoped>
.inventory {
  > .content {
    margin-top: 25px;
    .in-PC {
      display: flex;
      justify-content: space-between;
      .grid {
        width: 594px;
      }
    }
  }
}
</style>