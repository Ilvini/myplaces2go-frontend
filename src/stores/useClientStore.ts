import { create } from 'zustand'

type State = {
  cliente: {
    id: string
    nome: string
    responsavel: string
    telefone: string
  } | null
  setCliente: (cliente: State) => void
}

const useClientStore = create<State>((set) => ({
  cliente: null,
  setCliente: (cliente: any) => {
    set((state) => ({
      cliente: cliente,
    }))
  },
}))

export default useClientStore

