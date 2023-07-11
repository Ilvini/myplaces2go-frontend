import { create } from 'zustand'

type State = {
  token: string | null
  setToken: (token: string) => void
}

const useTokenStore = create<State>((set) => ({
  token: null,
  setToken: (token: string) => {
    set((state) => ({
      token: token,
    }))
  },
}))

export default useTokenStore
