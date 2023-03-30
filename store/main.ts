import { defineStore } from 'pinia'

export interface IModalOptions {
  key?: string;
  text?: string,
  handler?: (args?: any) => void,
}

export const useMainStore = defineStore('main', {

  state: () => ({
    isLoading: false,
    isShowModal: false,
    currentModalKey: '',
    modalOptions: {} as IModalOptions
  }),

  actions: {
    setIsLoading (payload) {
      this.isLoading = payload
    },
    showModal (payload) {
      this.isShowModal = true
      if (payload.key) {
        this.currentModalKey = payload.key
      }
      this.modalOptions = payload
    },
    hideModal () {
      this.isShowModal = false
      this.currentModalKey = ''
      this.modalOptions = {}
    }
  }
})
