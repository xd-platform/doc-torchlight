<template>
  <LayoutWrapper class="inventory-detail">
    <div class="inner" :class="`in-${device}`">
      <div class="grid">
        <DetailName
          type="inventory"
          :title="locale.equipName"
          :info="NameInfo"
        ></DetailName>
        <EquipDesc
          :title="locale.equipDesc"
          :info="DescInfo"
        ></EquipDesc>
      </div>
      <div class="grid">
				<DetailLocation
					v-if="LocationInfo && LocationInfo.length !== 0"
          :title="locale.dropLocation"
          :info="LocationInfo"
				></DetailLocation>
				<DetailAffix
					v-if="AffixInfo && AffixInfo.length !== 0"
          :title="locale.relatedAffixes"
          :info="AffixInfo"
				></DetailAffix>
      </div>
    </div>
  </LayoutWrapper>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      id: "",
      NameInfo: {
        Icon: "",
        Name: "",
        Level: "",
        Type: "",
      },
      DescInfo: {
        BaseAffix: '',
        DetailAffix: '',
        Desc: ''
      },
			LocationInfo: [],
			AffixInfo: []
    };
  },
  computed: {
    ...mapState(["lang", "device", "API"]),
    ...mapGetters(["getLocale"]),
    locale() {
      return {
        needLevel: this.getLocale("inventory.needLevel"),
        equipName: this.getLocale("inventory.equipName"),
        equipDesc: this.getLocale("inventory.equipDesc"),
        dropLocation: this.getLocale("inventory.dropLocation"),
        relatedAffixes: this.getLocale("inventory.relatedAffixes"),
      };
    },
  },
	watch: {
		lang() {
   		this.getDetail(this.id);
		}
	},
  beforeMount() {
    this.id = $nuxt.$route.query.id;
    this.getDetail(this.id);
  },
  methods: {
    getDetail(id) {
      this.$axios
        .get(this.API['inventory']['detail'], {
          params: {
            Language: this.lang,
            Uid: id,
          },
        })
        .then((res) => {
          if (res.status == 200 && res.data) {
            const info = res.data;

            // 为了便于组件使用，统一传入参数
            this.NameInfo = {
              Icon: info.Icon || '',
              Name: info.Name || '',
              Level: this.locale.needLevel + " " + info.NeedLevel || '',
              Type: info.WeaponType || '',
            };

            this.DescInfo = {
              BaseAffix: info.BaseAffix || [],
              DetailAffix: info.DetailAffix || [],
              Desc: info.Desc || '',
            };

						this.LocationInfo = info.DropPlace || []

						this.AffixInfo = info.RandomAffixPool || []
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.inventory-detail {
  color: #fff;
  >.inner {
    padding-bottom: 60px;
  }
  .in-PC {
    display: flex;
    justify-content: space-between;
    .grid {
      width: 594px;
    }
  }
}
</style>