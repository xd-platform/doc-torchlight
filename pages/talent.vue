<template>
  <LayoutWrapper :class="subNav">
    <LayoutCardList type="large" class="content">
      <TalentItem
        v-for="(info, i) in talentList"
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
      talentList: [],
    };
  },
  computed: {
    ...mapState(["lang", "API"]),
  },
  beforeMount() {
    this.getTalent();
  },
  methods: {
    getTalent() {
      this.$axios
        .get(this.API["talent"], {
          params: {
            Language: this.lang,
          },
        })
        .then((res) => {
          if (res.status == 200) {
            this.talentList = res.data[""];
            console.log(this.talentList);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.talent {
  .card {
    width: 594px;
    height: 467px;
    background-color: #000;
  }
}
</style>