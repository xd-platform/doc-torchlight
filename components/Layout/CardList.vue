<template>
  <ul class="card-list" :class="`type-${type}`"><slot /></ul>
</template>

<script>
export default {
  props: {
    type: {
      typeof: String,
      default: () => 'thumbnail'
    }
  },
}
</script>

<style lang="scss" scoped>
.card-list {
  width: 100%;
  display: grid;
  justify-content: space-between;
  padding-bottom: 40px;
  &.type-thumbnail {
    grid-template-columns: repeat(8, 132px);
    grid-row-gap: 20px;
  }
}
</style>