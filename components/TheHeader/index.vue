<template>
  <header class="header">
    <div class="header__wrapper">
      <nav class="header__nav">
        <nuxt-link v-for="link in menu" :key="link.id" class="header__link" :to="link.to">
          {{ link.title }}
        </nuxt-link>
      </nav>
      <div class="header__info">
        <div class="header__name">
          {{ name }}
        </div>
        <button class="header__button" @click="logout">
          Выйти
        </button>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'

import { mapActions, mapState } from 'pinia'
import { menu } from '~/configs/routesPath'
import { useUserStore } from '~/store/user'

export default Vue.extend({
  name: 'the-header',
  data () {
    return {
      menu
    }
  },
  computed: {
    ...mapState(useUserStore, ['name'])
  },
  methods: {
    ...mapActions(useUserStore, {
      logout: 'logoutAction'
    })
  }
})
</script>

<style lang="scss" scoped>
.header {
  background-color: var(--primaryColor);
  padding: 12px 0;
  &__wrapper {
    max-width: 1480px;
    padding: 0 10px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__nav {
    display: flex;
  }
  &__link{
    color: var(--white);
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    &:not(:last-child){
      margin-right: 38px;
    }
  }
  &__info{
    display: flex;
    align-items: center;
  }
  &__name{
    margin-right: 28px;
  }
  &__button{
    @include buttonGrey;
  }
}

</style>
