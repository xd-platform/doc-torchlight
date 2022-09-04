<template>
  <div class="thumbnail" :class="type" :id="info.Id">
    <div :class="`pic rare-${info.RateVal}`">
      <div
        class="icon"
        :style="{ 'background-image': `url(${info.Icon})` }"
      ></div>
    </div>
    <div
      class="name"
      :class="{
        ellipsis: info.Name.length > 16,
        normal: info.Name.length <= 16,
      }"
    >
      {{ info.Name }}
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    type: {
      typeof: String,
      default: () => "",
    },
    info: {
      typeof: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped>
.thumbnail {
  position: relative;
  width: 128px;
  height: 158px;
  background-color: #222;
  border: 2px solid #222;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  &:hover {
    border: 2px solid #ffbf00;
    transition: all ease-in-out 200ms;
  }
  .pic {
    margin: 16px auto 0;
    background: #111;
    .icon {
      width: 100%;
      height: 100%;
      background-position: center;
      background-repeat: no-repeat;
      background-size: 80% 80%;
    }
  }
  .name {
    width: calc(100% - 28px);
    color: #fff;
    font-size: 13px;
    display: flex;
    line-height: 16px;

    &.normal {
      flex: 1;
      margin: 0 14px;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    &.ellipsis {
      height: 35px;
      margin: 6px 14px 0;
      text-align: center;
      display: -webkit-inline-box;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
  :deep(a) {
    position: absolute;
    display: inline-block;
    width: 100%;
    height: 100%;
  }

  &.inventory {
    .pic {
      width: 95px;
      height: 95px;
      border-radius: 0 10px 0 10px;
      &.level_1 {
        background: linear-gradient(135.2deg, #946138 0%, #eb9555 99.92%);
      }
      &.level_2 {
        background: linear-gradient(135.2deg, #63529b 0%, #9c7fe5 99.92%);
      }
    }
  }

  &.skill {
    .pic {
      width: 85px;
      height: 85px;
      border-radius: 50%;
      border: 4px solid #111;
    }
  }
}

@media screen and (max-width: 828px) {
  .thumbnail {
    width: vw(164px);
    height: vw(220px);
    border: vw(2px) solid #222;
    &:hover {
      border: vw(2px) solid #ffbf00;
    }
    .name {
      width: calc(100% - vw(40px));
      font-size: vw(20px);
      line-height: vw(24px);

      &.normal {
        margin: 0 vw(20px);
      }
      &.ellipsis {
        height: vw(52px);
        margin: vw(11px) vw(20px) 0;
      }
    }

    &.inventory {
      .pic {
        width: vw(116px);
        height: vw(116px);
        border-radius: 0 vw(15px) 0 vw(15px);
      }
    }
  }
}
</style>