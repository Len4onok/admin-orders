<template>
  <tr
    class="table-row"
    :style="[styleGrid, styleOther]"
  >
    <TableCell
      v-for="(key, idx) in keysList"
      :key="`table-cell-${key}`"
      class="table-row__cell"
      :class="currentClass(idx)"
      :cell="currentValueForCell(key)"
    />
  </tr>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import TableCell from './TableCell/index.vue'
import { IAnyObject, ITableConfig } from '~/utils/types'

type TCallbackReturn = (row: IAnyObject<any>) => string

export default Vue.extend({
  name: 'main-table-row',
  components: {
    TableCell
  },
  props: {
    keysList: {
      type: Array as PropType<string[]>,
      default: () => ([]) as string[]
    },
    config: {
      type: Object as PropType<ITableConfig>,
      default: () => ({}) as ITableConfig
    },
    row: {
      type: Object as PropType<IAnyObject<any>>,
      default: () => ({}) as IAnyObject<any>
    }
  },
  computed: {
    styleGrid (): Partial<CSSStyleDeclaration> {
      return this.config?.grid ||
        { gridTemplateColumns: `repeat(${this.keysList.length}, 1fr)` }
    },
    styleOther (): Partial<CSSStyleDeclaration> {
      if (this.config?.otherStyle instanceof Function) {
        return this.config?.otherStyle(this.row)
      }
      return {}
    }
  },
  methods: {
    currentValueForCell (key: string): string | IAnyObject<any> {
      if (this.config?.values?.[key] instanceof Function) {
        return (this.config.values[key] as TCallbackReturn)(this.row)
      }
      if (this.config?.values?.[key] instanceof Object) {
        return { ...this.config.values[key], row: this.row, key }
      }
      return this.row[key]
    },
    currentClass (idx: number) {
      return [
        { 'table-row__cell_last': idx === this.keysList.length - 1 }
      ]
    }
  }
})
</script>
<style lang="scss" scoped>
.table-row {
  display: grid;
  align-items: center;
  min-width: 1000px;
  &:hover{
    background-color: var(--lightPrimaryColor);
  }

  &__cell {
    &_last {
       padding-right: 32px!important;
    }
  }
}
</style>
