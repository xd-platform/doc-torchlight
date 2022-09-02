<template>
  <div v-if="info" class="name-box">
    <div
      class="bgMobile"
      :style="getRetina(lg(info, 'theme.bgMobile', ''))"
    ></div>
    <div
      class="name-bg"
      :style="
        getRetina(lg(info, 'theme.nameBg', ''), lg(info, 'theme.nameBg_2x', ''))
      "
    >
      <div class="name">
        {{ $t(`${info.name}_name`) || `$${info.name}_name` }}
      </div>
      <div class="player" v-if="$t(`${info.name}_video`)"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import lg from "@/utils/lg";
export default {
  props: {
    info: {
      typeof: Object,
      default: () => {},
    },
  },
  data() {
    return {
      lg: lg,
    };
  },
  computed: {
    ...mapGetters(["getRetina"]),
  },
};
</script>

<style lang="scss" scoped>
.name-box {
  .bgMobile {
    display: none;
  }
  .name-bg {
    width: 100%;
    height: 105px;
    background-position: 0 center;
    background-repeat: no-repeat;
    background-size: contain;
    display: flex;
    align-items: center;
    .name {
      font-size: 60px;
      font-weight: 800;
      color: #fff;
    }
    .player {
      width: 72px;
      height: 72px;
      @include imgBg("player.png", "player_2x.png");
      margin-left: 40px;
      cursor: pointer;
    }
  }
}

@media screen and (max-width: 828px) {
  .name-box {
    position: relative;
    width: 100%;
    height: vw(466px);
    // margin-bottom: vw(10px);
    .bgMobile {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-position: 0 center;
      background-repeat: no-repeat;
      background-size: cover;
    }

    .name-bg {
      position: absolute;
      bottom: 0;
      left: 0;
      height: vw(190px);
      background-position: center;
      background-size: cover;
      .name {
        font-size: vw(110px);
        margin-left: vw(28px);
      }
    }
  }
}
</style>