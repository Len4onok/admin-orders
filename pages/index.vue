<template>
  <div class="home">
    <main-table
      :head="tableHead"
      :body="orders"
      :config="tableConfig"
      @change-sort="changeSort"
    />
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue'
import { mapActions, mapState } from 'pinia'
import MainVue from '~/mixins/MainVue'
import MainTable from '~/components/Table/index.vue'
import { tableHeadForOrders, tableHeadForOrdersAdmin } from '~/configs/tableHeaders'
import { IButtonItem, IOrder, ITableConfig, ITableHead, ORDER_STATUS, TABLE_CELL_COMPONENT } from '~/utils/types'
import { useUserStore } from '~/store/user'
import { useOrdersStore } from '~/store/orders'

export default (Vue as VueConstructor<Vue & InstanceType<typeof MainVue>>).extend({
  name: 'index-page',
  components: { MainTable },
  mixins: [MainVue],
  computed: {
    ...mapState(useUserStore, ['isAdmin', 'isLoggedIn']),
    ...mapState(useOrdersStore, ['orders']),
    tableHead (): ITableHead {
      return this.isAdmin ? tableHeadForOrdersAdmin : tableHeadForOrders
    },
    tableConfig (): ITableConfig<IOrder> {
      return {
        grid: {
          gridTemplateColumns: 'minmax(70px, 1fr) minmax(200px, 1fr) minmax(300px, 1fr) minmax(200px, 1fr) minmax(130px, 1fr) minmax(250px, 1fr) minmax(70px, 1fr)'
        },
        otherStyle: (row): Partial<CSSStyleDeclaration> => ({
          color: row.status === ORDER_STATUS.COMPLETE ? '#bfc3cb' : '#000000'
        }),
        values: {
          id: (row): string => String(row.id),
          btns: {
            type: TABLE_CELL_COMPONENT.BUTTONS,
            items: (row): IButtonItem[] => (
              row.status === ORDER_STATUS.COMPLETE
                ? [{
                    name: 'X',
                    mode: 'red',
                    handler: () => this.modalDeleteOrder(row.id)
                  }]
                : [{
                    name: 'X',
                    mode: 'red',
                    handler: () => this.modalDeleteOrder(row.id)
                  },
                  {
                    name: 'V',
                    mode: 'green',
                    handler: () => this.initCompleteOrder(row.id)
                  }]
            )
          }
        }
      }
    }
  },
  created () {
    if (!this.isLoggedIn || (this.orders && this.orders.length)) {
      return
    }
    this.SendRequest(async () => {
      await this.getOrders()
    })
  },
  methods: {
    ...mapActions(useOrdersStore, {
      getOrders: 'getOrders',
      sortOrders: 'sortOrders',
      completeOrder: 'completeOrder',
      deleteOrder: 'deleteOrder'
    }),
    changeSort (field: string, dir: string) {
      this.SendRequest(async () => {
        await this.sortOrders(field, dir)
      })
    },
    initCompleteOrder (id: number) {
      this.SendRequest(async () => {
        await this.completeOrder(id)
      })
    },
    modalDeleteOrder (id: number) {
      this.ShowModal({
        key: 'Confirmation',
        text: 'Вы действительно хотите удалить  заказ?',
        handler: () => {
          this.SendRequest(async () => {
            await this.deleteOrder(id)
          })
        }
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.home {
  padding-top: 50px;
}

</style>
