import { defineStore } from 'pinia'
import { mock } from '~/mock/mock'
import { IOrder, ORDER_STATUS } from '~/utils/types'

export const useOrdersStore = defineStore('orders', {

  state: () => ({
    orders: [] as IOrder[]
  }),

  // imitate request on server
  actions: {
    async getOrders () {
      await new Promise(resolve => setTimeout(resolve, 1000))
      this.orders = mock.events
    },
    async sortOrders (field: string, dir: string) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      this.orders.sort(function (a, b) {
        return typeof a[field] === 'number'
          ? a[field] - b[field]
          : a[field].localeCompare(b[field])
      })
      if (dir === 'DESC') {
        this.orders.reverse()
      }
    },
    async completeOrder (id: number) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      this.orders = this.orders.map((item) => {
        if (item.id === id) {
          item.status = ORDER_STATUS.COMPLETE
        }
        return item
      })
    },
    async deleteOrder (id: number) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      this.orders = this.orders.filter(item => item.id !== id)
    },
    async addOrder (payload: IOrder) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      this.orders.push(payload)
    }
  }
})
