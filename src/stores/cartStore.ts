/* import { create } from 'zustand'

type CartStore = {
  id: string
  nome: string
  valor: string
  quantidade: number
  imagem_url: string
}

interface ICartStore {
  products: CartStore[] | []
  setProducts: (products: CartStore[]) => void
}

export const cartStore = create<ICartStore>((set) => ({
  products: [],
  setProducts: (products: CartStore[]) => set({ products }),
}))

 */

import { create } from 'zustand'

/* import { Product } from "../types" */
type CartStore = {
  id: string
  nome: string
  valor: number
  quantidade: number
  imagem_url: string
}

// Define the interface of the Cart state
interface State {
  cart: CartStore[]
  totalItems: number
  totalPrice: number
  totalProductsOnCart: () => number
}

// Define the interface of the actions that can be performed in the Cart
interface Actions {
  addToCart: (Item: CartStore) => void
  removeFromCart: (Item: CartStore) => void
}

// Initialize a default state
const INITIAL_STATE: State = {
  cart: [],
  totalItems: 0,
  totalPrice: 0,
  totalProductsOnCart: () => 0,
}

// Create the store with Zustand, combining the status interface and actions
export const useCartStore = create<State & Actions>((set, get) => ({
  cart: INITIAL_STATE.cart,
  totalItems: INITIAL_STATE.totalItems,
  totalPrice: INITIAL_STATE.totalPrice,
  totalProductsOnCart: () => {
    const cart = get().cart
    const totalItems = cart.reduce((total, item) => {
      return total + (item.quantidade as number)
    }, 0)
    return totalItems
  },
  addToCart: (product: CartStore) => {
    const cart = get().cart
    const cartItem = cart.find((item) => item.id === product.id)

    // If the item already exists in the Cart, increase its quantidade
    if (cartItem) {
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantidade: product.quantidade as number }
          : item
      )
      set((state) => ({
        cart: updatedCart,
        totalItems: state.totalItems + 1,
        totalPrice: state.totalPrice + product?.valor,
      }))
    } else {
      const updatedCart = [
        ...cart,
        { ...product, quantidade: product.quantidade },
      ]

      set((state) => ({
        cart: updatedCart,
        totalItems: state.totalItems + 1,
        totalPrice: state.totalPrice + product?.valor,
      }))
    }
  },
  removeFromCart: (product: CartStore) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== product.id),
      totalItems: state.totalItems - 1,
      totalPrice: state.totalPrice - product?.valor,
    }))
  },
}))

