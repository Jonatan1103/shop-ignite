import * as Dialog from '@radix-ui/react-dialog'
import Image from 'next/image';
import { X } from 'phosphor-react';
import { useCart } from '../../hooks/useCart';
import { CartButton } from "../CartButton";
import { CartClose, CartContent, CartFinalization, CartProduct, CartProductDetails, CartProductImage, FinalizationDetails } from './styles';

export function Cart () {
  const { cartItems } = useCart()
  const cartQuantity = cartItems.length

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

          {cartItems.map(cartItems => (
            <CartProduct key={cartItems.id}>
              <CartProductImage>
                <Image 
                  width={100} 
                  height={93} 
                  alt='' 
                  src={cartItems.imageUrl} 
                />
              </CartProductImage>

              <CartProductDetails>
                <p>{cartItems.name}</p>
                <strong>{cartItems.price}</strong>
                <button onClick={() => console.log('removeu')}>
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
                {cartQuantity} {cartQuantity > 1 ? 'itens' : 'item'}
              </p>
            </div>

            <div>
              <span>Valor Total</span>
              <p>R$ 100,00</p>
            </div>
          </FinalizationDetails>

          <button>Finalizar Compra</button>
        </CartFinalization>
       </CartContent>

      </Dialog.Portal>
    </Dialog.Root>
  )
}