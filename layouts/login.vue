<template>
  <div class="primary">
    <div class="primary__box">
      <nuxt />
    </div>
    <loader-screen />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import LoaderScreen from '~/components/ui/LoaderScreen/index.vue'

export default Vue.extend({
  components: { LoaderScreen }
})
</script>

<style lang="scss" scoped>
.primary {
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  background: var(--greyBg);

  &__box {
    @include container;
    min-height: 100vh;
  }
}
</style>
