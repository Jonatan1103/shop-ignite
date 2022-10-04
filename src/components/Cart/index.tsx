import * as Dialog from '@radix-ui/react-dialog'
import axios from "axios"
import Image from 'next/image';
import { X } from 'phosphor-react';
import { useState } from 'react';
import { useCart } from '../../hooks/useCart';
import { CartButton } from "../CartButton";
import { CartClose, CartContent, CartFinalization, CartProduct, CartProductDetails, CartProductImage, FinalizationDetails } from './styles';

export function Cart () {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)
  const { cartItems, cartTotal, removeCartItem } = useCart()

  const cartQuantity = cartItems.length

  const formattedCartTotal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(cartTotal)

  async function handleCheckout() {
    try {
      setIsCreatingCheckoutSession(true)

      const response = await axios.post('/api/checkout', {
        products: cartItems,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl

    } catch(err) {
      setIsCreatingCheckoutSession(false)
      alert('Falha ao redirecionar ao checkout!')
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <CartButton />
      </Dialog.Trigger>

      <Dialog.Portal>

       <CartContent>
        <CartClose>
          <X size={24} weight="bold"/>
        </CartClose>

        <h2>Sacola de compras</h2>

        <section>
          {cartQuantity <= 0 && <p>Parece que seu carrinho esta vazio : (</p>}

          {cartItems.map(cartItem => (
            <CartProduct key={cartItem.id}>
              <CartProductImage>
                <Image 
                  width={100} 
                  height={93} 
                  alt='' 
                  src={cartItem.imageUrl} 
                />
              </CartProductImage>

              <CartProductDetails>
                <p>{cartItem.name}</p>
                <strong>{cartItem.price}</strong>
                <button onClick={() => removeCartItem(cartItem.id)}>
                  Remover
                </button>
              </CartProductDetails>
            </CartProduct>
          ))}


        </section>

        <CartFinalization>
          <FinalizationDetails>
            <div>
              <span>Quantidade</span>
              <p>
                {cartQuantity} {cartQuantity === 1 ? 'item' : 'itens'}
              </p>
            </div>

            <div>
              <span>Valor Total</span>
              <p>{formattedCartTotal}</p>
            </div>
          </FinalizationDetails>

          <button 
            onClick={handleCheckout}
            disabled={isCreatingCheckoutSession || cartQuantity <= 0}
          >
            Finalizar Compra
          </button>
        </CartFinalization>
       </CartContent>

      </Dialog.Portal>
    </Dialog.Root>
  )
}