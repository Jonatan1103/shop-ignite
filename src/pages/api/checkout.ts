import { NextApiRequest, NextApiResponse } from "next";
import { Iproduct } from "../../context/CartContext";
import { stripe } from "../../lib/stripe";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { products } = req.body as { products: Iproduct[] }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido.' })
  }

  if (!products) {
    return res.status(400).json({ error: 'Produto Não foi encontrado.' })
  }

  const success_Url = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancel_Url = `${process.env.NEXT_URL}/`

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: success_Url,
    cancel_url: cancel_Url,
    mode: 'payment',
    line_items: products.map(product => ({
      price: product.defaultPriceId,
      quantity: 1,
    })),
  })

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  })
}