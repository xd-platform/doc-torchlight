<template>
  <LayoutWrapper :class="subNav">
    <!-- 筛选器 -->
    <FilterBar
      v-if="list_level1"
      level="1"
      :filter="list_level1"
      v-model="id_level1"
    ></FilterBar>
    <FilterBar level="2" :filter="list_level2" v-model="id_level2"></FilterBar>
    <FilterBar level="3" :filter="list_level3" v-model="id_level3"></FilterBar>
    <!-- <FilterBar level="4" :filter="list_level4" v-model="id_level4"></FilterBar> -->

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
import { mapState } from "vuex";
/**
  en_WW 是英文版本
  zh_CN 是中文版
  */

export default {
  layout: "default",
  data() {
    return {
      subNav: "inventory",
      list_level1: [],
      id_level1: "",
      list_level2: [],
      id_level2: "",
      list_level3: [],
      id_level3: "",
      cardList: [],
    };
  },
  watch: {
    id_level1(newID) {
      const subObj = this.list_level1.find((item) => item.id == newID);
      if (subObj && subObj.subMenu && subObj.subMenu.length !== 0) {
        this.list_level2 = subObj.subMenu;
        this.id_level2 =
          this.list_level2 &&
          this.list_level2.length != 0 &&
          this.list_level2[0].id;
      } else {
        this.list_level2 = [];
        this.id_level2 = "";
      }
    },
    id_level2(newID) {
      const subObj = this.list_level2.find((item) => item.id == newID);
      if (subObj && subObj.subMenu && subObj.subMenu.length !== 0) {
        this.list_level3 = subObj.subMenu;
        this.id_level3 =
          this.list_level3 &&
          this.list_level3.length != 0 &&
          this.list_level3[0].id;
      } else {
        this.list_level3 = [];
        this.id_level3 = "";
      }
    },
    id_level3(newID) {
      if (newID) {
        this.getCardList(newID);
      } else {
        this.cardList = [];
      }
    },
  },
  computed: {
    ...mapState(["lang", 'API']),
  },
  beforeMount() {
    console.log(this.API);
    this.getMenu();
  },
  methods: {
    getMenu() {
      this.$axios
        .get(this.API['inventory']['menu'], {
          params: {
            Language: this.lang,
          },
        })
        .then((res) => {
          if (res.status == 200 && res.data && res.data.subMenu) {
            this.list_level1 = res.data.subMenu;
            this.id_level1 =
              this.list_level1 &&
              this.list_level1.length != 0 &&
              this.list_level1[0].id;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getCardList(id) {
      this.$axios
        .get(this.API['inventory']['list'], {
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