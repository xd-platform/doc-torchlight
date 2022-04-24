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
import { mapState, mapActions } from "vuex";

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
      const menu = await this.getMenu('talent');
      if(menu && menu.length != 0) {
        this.menu_talent = menu;
        this.id_talent = menu && menu.length != 0 && menu[0].Id;
      }
    },
    async getCardList(id) {
			this.menuList = []
      const list = await this.getList({ nav: 'talent', id: id });
      if(list && list.length != 0) {
        this.menuList = list;
      }
    },
    emptyData() {
      this.menu_talent = []
      this.id_talent = ''
      this.menuList = []
    }
  },
};
</script>

<style lang="scss" scoped>
.talent {
  .content {
    margin-top: 12px;
  }
}

@media screen and (max-width: 828px) {
	.talent {
	  .content {
	    margin-top: vw(24px);
	  }
	}
}
</style>