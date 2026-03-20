import Stripe from "https://esm.sh/stripe@14.21.0"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

Deno.serve(async (req) => {
  const signature = req.headers.get('stripe-signature')
  const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
    apiVersion: '2023-10-16',
    httpClient: Stripe.createFetchHttpClient(),
  })

  const supabaseAdmin = createClient(
    Deno.env.get('SUPABASE_URL') || '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
  )

  try {
    const body = await req.text()
    const endpointSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')
    
    let event
    if (endpointSecret) {
      event = await stripe.webhooks.constructEventAsync(body, signature || '', endpointSecret)
    } else {
      event = JSON.parse(body)
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object
      const { planId, userId } = session.metadata

      // 1. Create payment record
      const { error: pError } = await supabaseAdmin.from('payments').insert({
        user_id: userId,
        amount: session.amount_total / 100,
        status: 'completed',
        type: 'plan',
        stripe_id: session.id
      })
      
      if (pError) throw pError

      // 2. Activate subscription
      const { data: plan } = await supabaseAdmin.from('plans').select('duration_days').eq('id', planId).single()
      
      if (plan) {
        const endDate = new Date()
        endDate.setDate(endDate.getDate() + plan.duration_days)

        const { error: sError } = await supabaseAdmin.from('subscriptions').insert({
          user_id: userId,
          plan_id: planId,
          status: 'active',
          end_date: endDate.toISOString()
        })
        
        if (sError) throw sError
      }
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 })
  } catch (err) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 })
  }
})
