import { create } from 'zustand'

export interface Letter {
  id: string
  content: string
  delivery_email: string
  delivery_time: string
  status: 'scheduled' | 'sent' | 'failed'
  created_at: string
  sent_at?: string
  error_message?: string
}

interface LetterStore {
  letters: Letter[]
  currentLetter: Letter | null
  isLoading: boolean
  error: string | null
  
  // Actions
  setLetters: (letters: Letter[]) => void
  setCurrentLetter: (letter: Letter | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  addLetter: (letter: Letter) => void
  updateLetterStatus: (id: string, status: 'scheduled' | 'sent' | 'failed', errorMessage?: string) => void
  clearError: () => void
}

export const useLetterStore = create<LetterStore>((set) => ({
  letters: [],
  currentLetter: null,
  isLoading: false,
  error: null,
  
  setLetters: (letters) => set({ letters }),
  setCurrentLetter: (currentLetter) => set({ currentLetter }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  
  addLetter: (letter) => set((state) => ({
    letters: [letter, ...state.letters]
  })),
  
  updateLetterStatus: (id, status, errorMessage) => set((state) => ({
    letters: state.letters.map(letter =>
      letter.id === id
        ? { 
            ...letter, 
            status, 
            error_message: errorMessage,
            sent_at: status === 'sent' ? new Date().toISOString() : letter.sent_at
          }
        : letter
    )
  })),
  
  clearError: () => set({ error: null })
}))