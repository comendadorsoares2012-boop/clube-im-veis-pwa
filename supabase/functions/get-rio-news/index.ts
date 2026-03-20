const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    // Fonte Oficial do CRECI-RJ (Conselho Regional de Corretores de Imóveis)
    const RSS_URL = "https://www.creci-rj.gov.br/feed/";
    const response = await fetch(RSS_URL, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
        }
    });

    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    
    const xmlText = await response.text();
    const items = [];

    // Tentar separar por <item>
    const itemChunks = xmlText.split("<item>");

    // Ignorar o primeiro chunk (header)
    for (let i = 1; i < itemChunks.length; i++) {
        if (items.length >= 6) break;
        const p = itemChunks[i];

        const title = p.match(/<title>([\s\S]*?)<\/title>/)?.[1]?.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/, '$1') || "Notícia CRECI-RJ";
        const link = p.match(/<link>([\s\S]*?)<\/link>/)?.[1] || "#";
        
        const descMatch = p.match(/<description>([\s\S]*?)<\/description>/)?.[1]
                      || p.match(/<!\[CDATA\[([\s\S]*?)\]\]>/)?.[1];
        
        const summary = descMatch?.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').substring(0, 100).trim() + "...";

        // Tentar buscar imagem no conteúdo ou feed
        let imageUrl = "https://images.unsplash.com/photo-1448630360428-6e238892bf7f?auto=format&fit=crop&q=80&w=400";
        const imgMatch = p.match(/url="([^"]+)"/) || p.match(/src="([^"]+)"/);
        if (imgMatch) imageUrl = imgMatch[1];

        items.push({
            title: title.trim(),
            link: link.trim(),
            image: imageUrl,
            summary: summary,
            source: "CRECI-RJ"
        });
    }

    return new Response(JSON.stringify(items), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200, // Retornar 200 com array vazio para o frontend não travar visualmente em erro
      body: JSON.stringify([])
    })
  }
})
