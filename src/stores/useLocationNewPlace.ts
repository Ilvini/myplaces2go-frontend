import { create } from 'zustand'

type State = {
  locationStore: object | null
  setLocationStore: (tabela: number) => void
}

const useLocationNewPlace = create<State>((set) => ({
  locationStore: {
    lat: 0,
    lng: 0,
  },
  setLocationStore: (location: any) => {
    set((state) => ({
      locationStore: location,
    }))
  },
}))

export default useLocationNewPlace

