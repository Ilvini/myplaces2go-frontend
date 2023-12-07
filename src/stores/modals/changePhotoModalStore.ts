import { create } from 'zustand'

type State = {

    modalStatePhoto: boolean
    setModalStatePhoto: (state: boolean) => void
}

const changePhotoModalStore = create<State>((set) => ({
    modalStatePhoto: false,
    setModalStatePhoto: (state) => set(() => ({ modalStatePhoto: state })),

}))

export default changePhotoModalStore

