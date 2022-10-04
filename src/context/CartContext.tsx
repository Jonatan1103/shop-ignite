import { createContext } from "react";

export interface Iproduct {
  id: string
  name: string
  imageUrl: string
  price: string
  numberPrice: number
  description: string
  defaultPriceId: string
}

interface CartContextData {
  cartItem: Iproduct[]
}

export const CartContext = createContext({} as CartContextData)