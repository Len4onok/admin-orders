<template>
  <tbody class="table-body">
    <TableRow
      v-for="(row, idx) in body"
      :key="`table-row-${row.id}-${idx}`"
      :row="row"
      :keys-list="keysList"
      :config="config"
    />
  </tbody>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import TableRow from './TableRow/index.vue'
import { IAnyObject, ITableConfig } from '~/utils/types'

export default Vue.extend({
  name: 'main-table-body',
  components: {
    TableRow
  },
  props: {
    body: {
      type: Array as PropType<IAnyObject<any>[]>,
      default: () => ([]) as IAnyObject<any>[]
    },
    keysList: {
      type: Array as PropType<string[]>,
      default: () => ([]) as string[]
    },
    config: {
      type: Object as PropType<ITableConfig>,
      default: () => ({}) as ITableConfig
    }
  }
})
</script>

<style lang="scss" scoped>
.table-body {
  display: block;
  min-width: 100%;
  width: fit-content;
}
</style>
