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
  padding-bottom: 60px;
  &.type-thumbnail {
    grid-template-columns: repeat(8, 132px);
    grid-row-gap: 20px;
  }
  &.type-large {
    grid-template-columns: repeat(2, 594px);
    grid-row-gap: 12px;
  }
}

@media screen and (max-width: 828px) {
	.card-list {
		width: vw(750px);
		margin: 0 auto;
  	padding-bottom: vw(100px);
	  &.type-thumbnail {
	    grid-template-columns: repeat(4, vw(168px));
	    grid-row-gap: vw(25px);
	  }
	  &.type-large {
	    grid-template-columns: repeat(1, 750px);
	    grid-row-gap: 0;
	  }
	}
}
</style>