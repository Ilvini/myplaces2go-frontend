import { create } from 'zustand'

type State = {
  modalState: boolean
  setModalState: (state: boolean) => void
  setModalData: (data: any) => void
  modalData: any
}

const placeModalStore = create<State>((set) => ({
  modalState: false,
  modalData: null,
  setModalData(data: any) {
    set({ modalData: data })
  },
  setModalState(modalState: boolean) {
    set({ modalState })
  },
}))

export default placeModalStore

