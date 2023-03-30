<template>
  <div class="table">
    <table
      ref="tableWrapper"
      class="table__wrapper"
    >
      <MainTableHead
        :head="head"
        :config="config"
        :keys-list="keysList"
        @change-sort="changeSort"
      />
      <div>
        <MainTableBody
          :body="body"
          :keys-list="keysList"
          :config="config"
        />
      </div>
    </table>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import MainTableHead from './TableHead/index.vue'
import MainTableBody from './TableBody/index.vue'
import { IAnyObject, ISelectionButton, ITableConfig, ITableHead } from '~/utils/types'

export default Vue.extend({
  name: 'main-table',
  components: {
    MainTableHead,
    MainTableBody
  },
  props: {
    head: {
      type: Object as PropType<ITableHead>,
      required: true
    },
    config: {
      type: Object as PropType<ITableConfig>,
      default: () => ({}) as ITableConfig
    },
    body: {
      type: Array as PropType<IAnyObject<any>[]>,
      default: () => ([]) as IAnyObject<any>[]
    },
    value: {
      type: Array as PropType<ISelectionButton[]>,
      default: () => ([]) as ISelectionButton[]
    }
  },
  computed: {
    keysList (): string[] {
      return Object.keys(this.head.columns)
    }
  },
  methods: {
    changeSort (field: string, dir: string) {
      this.$emit('change-sort', field, dir)
    }
  }

})
</script>

<style lang="scss" scoped>
.table {
  padding-bottom: 24px;

  &__wrapper {
    display: block;
    width: 100%;
    overflow-x: auto;
  }
}
</style>
