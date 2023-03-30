<template>
  <thead class="table-head">
    <tr
      class="table-head__row"
      :style="styleGrid"
    >
      <th
        v-for="(column, idx) in keysList"
        :key="`${head.title}-${column}-${idx}`"
        class="table-head__column"
        :class="{'table-head__column_last': idx === keysList.length - 1,
                 'table-head__column_sort': isSorted(column)}"
        @click="changeSort(column)"
      >
        <span v-if="isSorted(column)" class="table-head__sort" :class="getSortStyle(column)" />
        <span class="table-head__text">
          {{ head.columns[column] }}
        </span>
      </th>
    </tr>
  </thead>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { ITableConfig, ITableHead } from '~/utils/types'

export default Vue.extend({
  name: 'main-table-head',
  props: {
    head: {
      type: Object as PropType<ITableHead>,
      required: true
    },
    keysList: {
      type: Array as PropType<string[]>,
      default: () => ([]) as string[],
      required: true
    },
    config: {
      type: Object as PropType<ITableConfig>,
      default: () => ({}) as ITableConfig
    }
  },
  data () {
    return {
      sortField: '',
      sortDir: ''
    }
  },
  computed: {
    styleGrid (): Partial<CSSStyleDeclaration> {
      return this.config?.grid ||
        { gridTemplateColumns: `repeat(${this.keysList.length}, 1fr)` }
    }
  },
  methods: {
    isSorted (column: string) {
      return this.head.sortable?.includes(column)
    },
    getSortStyle (column: string): { 'table-head__sort_asc': boolean, 'table-head__sort_desc': boolean } {
      return {
        'table-head__sort_asc': this.sortField === column && this.sortDir === 'ASC',
        'table-head__sort_desc': this.sortField === column && this.sortDir === 'DESC'
      }
    },
    changeSort (column: string): void {
      if (!this.head.sortable?.includes(column)) {
        return
      }
      if (this.sortField === column && this.sortDir === 'DESC') {
        this.sortDir = 'ASC'
        this.$emit('change-sort', this.sortField, this.sortDir)
        return
      }
      this.sortField = column
      this.sortDir = 'DESC'
      this.$emit('change-sort', this.sortField, this.sortDir)
    }
  }
})
</script>

<style lang="scss" scoped>
.table-head {
  display: block;
  min-width: 100%;
  width: fit-content;

  &__row {
    padding: 0 0 0 14px;
    display: grid;
    align-items: center;
    min-width: 1000px;
  }

  &__column {
    padding: 16px 18px;
    text-align: left;
    font-weight: 600;
    &_last {
      padding-right: 32px!important;
    }
    &_sort{
      cursor: pointer;
    }
  }
  &__text {
    word-break: break-word;
  }
  &__sort {
    position: relative;
    margin-right: 15px;
    display: inline-block;
    &:after{
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      border: 6px solid transparent;
      border-bottom: 10px solid var(--grey);
    }
    &_asc{
      &:after{
        border-bottom: 10px solid var(--primaryColor);
      }
    }
    &_desc{
      &:after{
        border-bottom: none;
        border-top: 10px solid var(--primaryColor);
      }
    }
  }
}
</style>
