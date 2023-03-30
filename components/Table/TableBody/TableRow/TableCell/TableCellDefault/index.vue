<template>
  <td
    class="table-cell"
    :title="cell"
  >
    {{ cell }}
  </td>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'table-cell-default',
  props: {
    cell: {
      type: String,
      default: ''
    }
  }
})
</script>

<style lang="scss" scoped>
.table-cell {
  padding: 20px;
}
</style>
