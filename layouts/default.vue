<template>
  <div class="primary">
    <the-header />
    <div class="primary__box">
      <nuxt />
    </div>
    <loader-screen />
    <base-modal-container />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'pinia'
import LoaderScreen from '~/components/ui/LoaderScreen/index.vue'
import TheHeader from '~/components/TheHeader/index.vue'
import BaseModalContainer from '~/components/ui/BaseModalContainer/index.vue'
import { useUserStore } from '~/store/user'
import { ROUTES } from '~/configs/routesPath'

export default Vue.extend({
  name: 'layout-default',
  components: { BaseModalContainer, TheHeader, LoaderScreen },
  computed: {
    ...mapState(useUserStore, ['isLoggedIn'])
  },
  watch: {
    isLoggedIn: {
      immediate: true,
      handler (value) {
        if (!value) {
          this.$router.push(ROUTES.LOGIN)
        }
      }

    }
  }
})
</script>

<style lang="scss" scoped>
.primary {
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  background: var(--greyBg);
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;

  &__box {
    @include container;
    min-height: 100vh;
  }
}
</style>
