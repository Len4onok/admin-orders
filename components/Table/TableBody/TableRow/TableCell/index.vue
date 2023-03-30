<template>
  <component
    :is="currentCell"
    :cell="cell"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import { TABLE_CELL_COMPONENT } from '~/utils/types'

export default Vue.extend({
  name: 'main-table-cell',
  components: {
    [TABLE_CELL_COMPONENT.DEFAULT]: () => import('./TableCellDefault/index.vue'),
    [TABLE_CELL_COMPONENT.BUTTONS]: () => import('./TableCellButtons/index.vue')
  },
  props: {
    cell: {
      type: [String, Object],
      required: true
    }
  },
  computed: {
    currentCell (): string {
      return this.cell?.type || TABLE_CELL_COMPONENT.DEFAULT
    }
  }
})
</script>
