import Vue from 'vue'
import { mapActions } from 'pinia'
import { IModalOptions, useMainStore } from '~/store/main'

export default Vue.extend({
  methods: {
    ...mapActions(useMainStore, {
      setIsLoading: 'setIsLoading',
      showModal: 'showModal'
    }),
    SetLoader (value: boolean) {
      this.setIsLoading(value)
    },
    ShowModal (payload:IModalOptions) {
      this.showModal(payload)
    },
    async SendRequest (resolve: () => Promise<void>, reject?: () => void, isloader = true) {
      this.SetLoader(isloader)
      try {
        await resolve()
      } catch (error) {
        console.log('error - request: ', error)
        if (reject) {
          reject()
        }
        throw error
      } finally {
        this.SetLoader(false)
      }
    }
  }
})
