import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Newspaper, ChevronRight, Loader2, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface NewsItem {
  title: string;
  link: string;
  image: string;
  summary: string;
  source: string;
}

const NewsFeed = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('get-rio-news');
        if (error) throw error;
        setNews(data);
      } catch (err) {
        console.error("Erro ao buscar notícias:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="flex h-32 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary/40" />
      </div>
    );
  }

  if (news.length === 0) return null;

  return (
    <section className="space-y-4 px-4 py-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight">
            <Newspaper className="h-5 w-5 text-primary" />
            Notícias do Mercado Rio
          </h2>
          <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest flex items-center gap-1.5">
            <Sparkles className="h-3 w-3 text-amber-500" />
            Em Tempo Real
          </p>
        </div>
        <button className="text-xs font-bold text-primary flex items-center gap-1.5 hover:underline">
          Ver todas <ChevronRight className="h-3 w-3" />
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 snap-x">
        {news.map((item, i) => (
          <motion.a
            key={i}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="group min-w-[280px] w-[280px] overflow-hidden rounded-3xl bg-card border border-border/50 shadow-sm transition-all hover:shadow-lg hover:border-primary/20 snap-start"
          >
            <div className="relative h-32 overflow-hidden">
                <img 
                    src={item.image} 
                    alt={item.title} 
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 left-3">
                    <span className="bg-black/60 backdrop-blur-md text-[10px] font-bold text-white px-2 py-0.5 rounded-full uppercase">
                        {item.source}
                    </span>
                </div>
            </div>
            <div className="p-4 space-y-2">
                <h3 className="line-clamp-2 text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                </h3>
                <p className="line-clamp-2 text-[11px] text-muted-foreground leading-relaxed italic">
                    {item.summary.length > 5 ? item.summary : "Clique para ler os detalhes da matéria completa no portal do Extra Rio."}
                </p>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default NewsFeed;
