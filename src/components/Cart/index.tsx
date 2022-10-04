import * as Dialog from '@radix-ui/react-dialog'
import Image from 'next/image';
import { X } from 'phosphor-react';
import { CartButton } from "../CartButton";
import { CartClose, CartContent, CartFinalization, CartProduct, CartProductDetails, CartProductImage, FinalizationDetails } from './styles';

export function Cart () {
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
          {/* <p>Parece que seu carrinho esta vazio : (</p> */}

          <CartProduct>
            <CartProductImage>
              <Image width={100} height={93} alt='' src={''}/>
            </CartProductImage>

            <CartProductDetails>
              <p>Produto 1</p>
              <strong>90,00</strong>
              <button>Remover</button>
            </CartProductDetails>
          </CartProduct>
        </section>

        <CartFinalization>
          <FinalizationDetails>
            <div>
              <span>Quantidade</span>
              <p>2 itens</p>
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