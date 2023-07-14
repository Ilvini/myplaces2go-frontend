import { create } from 'zustand'

type State = {
  tabela: number | null
  setTabela: (tabela: number) => void
}

const useTabelaStore = create<State>((set) => ({
  tabela: null,
  setTabela: (tabela: any) => {
    set((state) => ({
      tabela: tabela,
    }))
  },
}))

export default useTabelaStore

