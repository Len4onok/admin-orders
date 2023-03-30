<template>
  <div
    v-if="isShowModal"
    class="base-modal"
    @mousedown.self="backgroundClick"
  >
    <component :is="currentModalKey" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapState } from 'pinia'
import Confirmation from '~/components/modal/Confirmation/index.vue'
import { useMainStore } from '~/store/main'

export default Vue.extend({
  name: 'base-modal-container',
  components: {
    Confirmation
  },
  computed: {
    ...mapState(useMainStore, ['isShowModal', 'currentModalKey'])
  },
  methods: {
    ...mapActions(useMainStore, {
      hide: 'hideModal'
    }),
    backgroundClick () {
      this.hide()
    }
  }
})
</script>

<style lang="scss" scoped>
.base-modal {
  padding: 10px;
  position: fixed;
  overflow: auto;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(#000000, .4);
  z-index: 1400;
  text-align: center;
  white-space: nowrap;
  font-size: 0;
  &:after {
    display: inline-block;
    vertical-align: middle;
    width: 0;
    height: 100%;
    content: "";
  }
}
</style>
