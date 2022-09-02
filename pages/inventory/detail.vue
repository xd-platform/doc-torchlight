<template>
  <LayoutWrapper class="inventory-detail">
    <div class="inner">
      <div class="grid">
        <DetailName
          type="inventory"
          :title="$t('inventory_equipName') || '$inventory_equipName'"
          :info="NameInfo"
        ></DetailName>
        <EquipDesc
          :title="$t('inventory_equipDesc') || '$inventory_equipDesc'"
          :info="DescInfo"
        ></EquipDesc>
      </div>
      <div class="grid">
        <DetailLocation
          v-if="LocationInfo && LocationInfo.length !== 0"
          :title="$t('inventory_dropLocation') || '$inventory_dropLocation'"
          :info="LocationInfo"
        ></DetailLocation>
        <DetailAffix
          v-if="AffixInfo && AffixInfo.length !== 0"
          :title="$t('inventory_relatedAffixes') || '$inventory_relatedAffixes'"
          :info="AffixInfo"
        ></DetailAffix>
      </div>
    </div>
  </LayoutWrapper>
</template>

<script>
import { mapState, mapMutations } from "vuex";

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
        BaseAttr: "",
        BaseAffix: "",
        DetailAffix: "",
        Desc: "",
      },
      LocationInfo: [],
      AffixInfo: [],
    };
  },
  computed: {
    ...mapState(["languages", "lang", "device", "API"]),
  },
  watch: {
    lang() {
      this.getDetail(this.id);
    },
  },
  beforeMount() {
    this.id = $nuxt.$route.query.id;
    this.getDetail(this.id);
  },
  methods: {
    ...mapMutations(["SETLOADING"]),
    getDetail(id) {
      this.SETLOADING(true);
      this.$axios
        .get(this.API["inventory"]["detail"], {
          params: {
            Language: this.languages[this.lang]?.code,
            Uid: id,
          },
        })
        .then((res) => {
          if (res.status == 200 && res.data) {
            const info = res.data;

            // 为了便于组件使用，统一传入参数
            this.NameInfo = {
              Icon: info.Icon || "",
              Name: info.Name || "",
              RateVal: info.RateVal || "0",
              Level:
                this.$t("inventory_needLevel") + " " + info.NeedLevel || "",
              Type: info.WeaponType || "",
            };

            this.DescInfo = {
              BaseAttr: info.BaseAttr || [],
              BaseAffix: info.BaseAffix || [],
              DetailAffix: info.DetailAffix || [],
              Desc: info.Desc || "",
            };

            this.LocationInfo = info.DropPlace || [];

            this.AffixInfo = info.RandomAffixPool || [];
          }
          this.SETLOADING(false);
        })
        .catch(() => {
          this.SETLOADING(false);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.inventory-detail {
  color: #fff;
  > .inner {
    padding-bottom: 60px;
    display: flex;
    justify-content: space-between;
    .grid {
      width: 594px;
    }
  }
}

@media screen and (max-width: 828px) {
  .inventory-detail {
    > .inner {
      padding-bottom: vw(100px);
      flex-direction: column;
      .grid {
        width: vw(750px);
        margin: 0 auto;
      }
    }
  }
}
</style>