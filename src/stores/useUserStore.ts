import { create } from 'zustand'

type State = {
  user: {
    email: string
    id: string
    name: string
    profile_photo_url: string
  } | null
  setUser: (token: string) => void
}

const useUserStore = create<State>((set) => ({
  user: null,
  setUser: (user: any) => {
    set((state) => ({
      user: user,
    }))
  },
}))

export default useUserStore
