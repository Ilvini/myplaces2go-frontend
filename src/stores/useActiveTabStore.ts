import { create } from 'zustand'

type State = {
  activeTab: string
  setActiveTab: (id: string) => void
}

const useActiveTabStore = create<State>((set) => ({
  activeTab: '',
  setActiveTab: (id: string) => {
    set((state) => ({
      activeTab: id,
    }))
  },
}))

export default useActiveTabStore
