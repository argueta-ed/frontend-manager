// stores/auth.ts
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as null | {
      id: number
      email: string
      firstname: string
      lastname: string
      roles: { name: string }[]
    }
  }),
  actions: {
    setUser(userData: any) {
      this.user = userData
    },
    logout() {
      this.user = null
    }
  },
  getters: {
  userRole: (state) => {
    return state.user?.roles?.[0]?.name ?? null
  }
}
})
