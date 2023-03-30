import { defineStore } from 'pinia'
import { mock } from '~/mock/mock'
import { USER_ROLE } from '~/utils/types'

export const useUserStore = defineStore('user', {

  state: () => ({
    user: null as string | null,
    name: null as string | null,
    role: null as USER_ROLE | null
  }),

  getters: {
    isLoggedIn (state): boolean {
      return !!(state.name && state.role)
    },
    isAdmin (state): boolean {
      return state.role === USER_ROLE.ADMIN
    }
  },

  actions: {
    async loginAction (payload) {
      // eslint-disable-next-line no-useless-catch
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        const currentUser = mock.users.find(item => item.name.toLowerCase() === payload.userName.toLowerCase())
        if (currentUser && currentUser.password === payload.password) {
          this.user = currentUser.user
          this.name = currentUser.name
          this.role = currentUser.role as USER_ROLE
        } else {
          throw new Error('Неверный логин\\пароль')
        }
      } catch (error) {
        throw error
      }
    },
    logoutAction () {
      this.$reset()
    }
  }
})
