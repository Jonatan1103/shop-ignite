import { createContext, ReactNode, useState } from "react";

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
  cartItems: Iproduct[]
  addToCart: (product: Iproduct) => void
  checkIfExistsProductInCart: (productId: string) => boolean
}

interface CartContextProviderProps {
  children: ReactNode
}

export const CartContext = createContext({} as CartContextData)

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cartItems, setCartItems] = useState<Iproduct[]>([])

  function addToCart(product: Iproduct) {
    setCartItems(state => [...state, product])
  }

  function checkIfExistsProductInCart(productId: string) {
    return cartItems.some(product => product.id === productId)
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, checkIfExistsProductInCart }}>
      {children}
    </CartContext.Provider>
  )
}