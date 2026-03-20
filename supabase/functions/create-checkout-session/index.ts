import Stripe from "https://esm.sh/stripe@14.21.0"
 
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const { planId, planName, price, userId, email } = await req.json()
    
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient(),
    })

    // Create a Checkout Session
    // We use 'payment' mode for now for PIX/Card (one-time) as requested "pix a vista" 
    // If you want full recurring (subscription), mode should be 'subscription'
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'pix'],
      payment_method_options: {
        pix: {
          expires_after_seconds: 3600, // 1 hour for PIX
        },
      },
      line_items: [{
        price_data: {
          currency: 'brl',
          product_data: { 
            name: planName,
            description: `Plano Mensal - Clube Aqui Tem Imóveis`,
          },
          unit_amount: Math.round(price * 100),
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/dashboard/planos?success=true`,
      cancel_url: `${req.headers.get('origin')}/dashboard/planos?canceled=true`,
      customer_email: email,
      client_reference_id: userId,
      metadata: { planId, userId }
    })

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
