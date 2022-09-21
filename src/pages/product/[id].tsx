import axios from "axios"
import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import Image from "next/image"
import { useState } from "react"
import Stripe from "stripe"
import { stripe } from "../../lib/stripe"
import { 
  ProductContainer, 
  ImageContainer, 
  ProductDetails 
} from "../../styles/pages/product"

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: string
    description: string
    defaultPriceId: string
  }
}

export default function Product({ product }: ProductProps) {
  const [isCheckoutSession, setIsCheckoutSession] = useState(false)

  async function handleBuyProduct() {
    try {
      setIsCheckoutSession(true)
      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl

    } catch (error) {
      alert('Falha ao redirecionar!')
      setIsCheckoutSession(false)
    }
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>

          <button disabled={isCheckoutSession} onClick={handleBuyProduct}>Comprar agora</button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = 
  async () => {
    return {
      paths: [
        { params: { id: 'prod_MRXZWFIRRYSp5Y' } }
      ],
      fallback: 'blocking',
    }
  }

export const getStaticProps: GetStaticProps<any, {id: string}> = 
  async ({ params }) => {
    const productId = params.id

    const product = await stripe.products.retrieve(productId, {
      expand: ['default_price'],
    })

    const price = product.default_price as Stripe.Price

    return {
      props: {
        product: {
          id: product.id,
          name: product.name,
          imageUrl: product.images[0],
          price: new Intl.NumberFormat('pt-BR', {
            style:'currency',
            currency:'BRL',
          }).format(price.unit_amount / 100),
          description: product.description,
          defaultPriceId: price.id
        }
      },
      revalidate: 60 * 60 * 1,
    }
  }