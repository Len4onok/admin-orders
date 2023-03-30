<template>
  <td class="table-cell-buttons">
    <button
      v-for="(item, idx) in currentBtns"
      :key="`table-cell-button-${item.name}-${idx}`"
      :class="`table-cell-buttons__item table-cell-buttons__item_${item.mode}`"
      :disabled="item.disabled || false"
      @click="() => item.handler(cell.row)"
    >
      {{ item.name }}
    </button>
  </td>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { IAnyObject, IButtonItem, ITableConfigCellButton } from '~/utils/types'

type TTableCellButton = ITableConfigCellButton & {
  row: IAnyObject<any>,
  key: string
}

export default Vue.extend({
  name: 'table-cell-buttons',
  props: {
    cell: {
      type: Object as PropType<TTableCellButton>,
      default: () => ({}) as TTableCellButton
    }
  },
  computed: {
    currentBtns (): IButtonItem[] {
      return this.cell.items(this.cell.row)
    }
  }
})
</script>

<style lang="scss" scoped>
.table-cell-buttons {
  padding: 10px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 70px;
  width: max-content;
  &__item {
    max-width: max-content;
    flex-shrink: 0;
    padding: 10px 15px;
    border-radius: var(--borderRadius);
    font-size: 16px;

    &:not(:last-child) {
      margin-right: 15px;
    }

    &:last-child {
      margin-left: auto;
    }
    &_red{
      background-color: var(--redBg);
    }
    &_green{
      background-color: var(--greenBg);
    }
  }
}
</style>
