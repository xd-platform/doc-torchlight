<template>
  <LayoutWrapper class="detail-content">
    <div :class="`in-${device}`">
      <div class="grid">
        <DetailName
          type="inventory"
          :title="locale.equipName"
          :info="DetailName"
        ></DetailName>
        <EquipDesc
          :title="locale.equipDesc"
          :info="DetailDesc"
        ></EquipDesc>
      </div>
      <div class="grid">
        <LayoutCell :title="locale.dropLocation"> </LayoutCell>
        <LayoutCell :title="locale.relatedAffixes"> </LayoutCell>
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
      api_detail: "/wiki_equip_detail",
      detailInfo: {},

      DetailName: {
        Icon: "",
        Name: "",
        Level: "",
        Type: "",
      },
      DetailDesc: {
        BaseAffix: '',
        DetailAffix: '',
        Desc: ''
      }
    };
  },
  computed: {
    ...mapState(["lang", "device"]),
    ...mapGetters(["getLocale"]),
    locale() {
      return {
        needLevel: this.getLocale("needLevel"),
        equipName: this.getLocale("equipName"),
        equipDesc: this.getLocale("equipDesc"),
        dropLocation: this.getLocale("dropLocation"),
        relatedAffixes: this.getLocale("relatedAffixes"),
      };
    },
  },
  beforeMount() {
    this.id = $nuxt.$route.params["id"];
    this.getDetail(this.id);
  },
  methods: {
    getDetail(id) {
      this.$axios
        .get(this.api_detail, {
          params: {
            Language: this.lang,
            Uid: id,
          },
        })
        .then((res) => {
          if (res.status == 200 && res.data) {
            this.detailInfo = res.data;
            const info = res.data;

            // 为了便于组件使用，统一传入参数
            this.DetailName = {
              Icon: info.Icon,
              Name: info.Name,
              Level: this.locale.needLevel + " " + info.NeedLevel,
              Type: info.WeaponType,
            };

            this.DetailDesc = {
              BaseAffix: info.BaseAffix,
              DetailAffix: info.DetailAffix,
              Desc: info.Desc,
            };
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.detail-content {
  color: #fff;
  .in-PC {
    display: flex;
    justify-content: space-between;
    .grid {
      width: 594px;
    }
  }
}
</style>