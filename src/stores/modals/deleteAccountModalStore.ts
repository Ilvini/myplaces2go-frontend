import { create } from 'zustand'

type State = {
  id: string
  modalState: boolean
  setModalState: (state: boolean) => void
  setId: (id: string) => void
}

const deleteAccountModalStore = create<State>((set) => ({
  id: '',
  modalState: false,
  setModalState(modalState: boolean) {
    set({ modalState })
  },
  setId(id: string) {
    set({ id })
  },
}))

export default deleteAccountModalStore

