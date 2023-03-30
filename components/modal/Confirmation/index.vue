<template>
  <base-modal-box>
    <div class="content">
      <p class="content__text">
        {{ modalOptions.text }}
      </p>
      <div class="content__control">
        <button
          class="content__btn"
          @click="confirm"
        >
          Ok
        </button>
        <button
          class="content__btn"
          @click="handleClick"
        >
          Отмена
        </button>
      </div>
    </div>
  </base-modal-box>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapState } from 'pinia'
import { useMainStore } from '~/store/main'
import BaseModalBox from '~/components/ui/BaseModalBox/index.vue'

export default Vue.extend({
  components: { BaseModalBox },
  computed: {
    ...mapState(useMainStore, ['modalOptions'])
  },
  methods: {
    ...mapActions(useMainStore, {
      hide: 'hideModal'
    }),
    handleClick () {
      this.hide()
    },
    confirm () {
      if (this.modalOptions && this.modalOptions.handler) {
        this.modalOptions.handler()
      }
      this.hide()
    }
  }
})
</script>

<style lang="scss" scoped>
.content {
  &__text {
    font-size: 18px;
    margin: 0 0 50px 0;
  }
  &__control {
    display: flex;
    align-items: center;
    margin-top: 20px;
    width: 100%;
  }
  &__btn {
    @include buttonGreyModal;
    &:not(:last-child) {
      margin-right: 20px;
    }
  }
}
</style>
