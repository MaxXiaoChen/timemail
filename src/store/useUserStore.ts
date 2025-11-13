import { create } from 'zustand'

interface UserStore {
  email: string | null
  isAuthenticated: boolean
  
  // Actions
  setEmail: (email: string | null) => void
  logout: () => void
  loadStoredEmail: () => void
}

export const useUserStore = create<UserStore>((set) => ({
  email: null,
  isAuthenticated: false,
  
  setEmail: (email) => {
    if (email) {
      localStorage.setItem('userEmail', email)
      set({ email, isAuthenticated: true })
    } else {
      localStorage.removeItem('userEmail')
      set({ email: null, isAuthenticated: false })
    }
  },
  
  logout: () => {
    localStorage.removeItem('userEmail')
    set({ email: null, isAuthenticated: false })
  },
  
  loadStoredEmail: () => {
    const storedEmail = localStorage.getItem('userEmail')
    if (storedEmail) {
      set({ email: storedEmail, isAuthenticated: true })
    }
  }
}))