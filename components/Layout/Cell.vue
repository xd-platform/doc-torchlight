<template>
  <div class="cell">
    <div class="title">{{ title }}</div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      typeof: String,
      default: () => ''
    }
  }
}
</script>

<style lang="scss" scoped>
.cell {
  // width: 555px;
  // width: 594px;
  width: 100%;
  margin-bottom: 12px;
  >.title {
    // width: 100%;
    height: 44px;
    line-height: 44px;
    padding: 0 19.5px;
    font-size: 16px;
    color: #fff;
    background-color: #111;
  }
  >.content {
    width: 100%;
    background-color: #222;
  }
}
</style>