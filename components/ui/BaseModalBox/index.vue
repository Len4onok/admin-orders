<template>
  <div class="base-modal__box">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'base-modal-box'
})
</script>

<style lang="scss" scoped>
.base-modal__box {
  white-space: normal;
  word-break: break-word;
  display: inline-block;
  vertical-align: middle;
  width: 100%;
  position: relative;
  max-width: 540px;
  text-align: left;
  background: var(--white);
  border-radius: var(--borderRadius);
  padding: 30px;
}
</style>
