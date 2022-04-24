<template>
  <div class="inner-wrapper">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.inner-wrapper {
  position: relative;
  padding-top: 60px;
  width: 1200px;
  margin: 0 auto;
}

@media screen and (max-width: 828px) {
	.inner-wrapper {
		width: 100%;
  	padding-top: vw(33px);
	}
}
</style>