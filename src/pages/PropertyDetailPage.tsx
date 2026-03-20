import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  Share2,
  Bed,
  Bath,
  Car,
  Maximize,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Check,
  Home,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface DBProperty {
  id: string;
  user_id: string;
  title: string;
  description: string;
  price: number;
  type: "sale" | "rent";
  property_type: string;
  neighborhood: string;
  bedrooms: number;
  bathrooms: number;
  parking_spaces: number;
  size: number;
  property_images: { image_url: string }[];
}

const PropertyDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [property, setProperty] = useState<DBProperty | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [liked, setLiked] = useState(false);
  const [interested, setInterested] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;
      try {
        const { data, error } = await supabase
          .from("properties")
          .select("*, property_images(image_url)")
          .eq("id", id)
          .single();

        if (error) throw error;
        setProperty(data as any);
      } catch (error) {
        console.error("Erro ao buscar imóvel:", error);
        toast.error("Imóvel não encontrado.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const images = property?.property_images?.map(img => img.image_url) || ["/placeholder.svg"];

  const nextImage = useCallback(() => {
    setDirection(1);
    setCurrentImage((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setDirection(-1);
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const handleInterest = async () => {
    if (!user) {
      toast.error("Você precisa estar logado para enviar interesse.", {
        action: {
          label: "Login",
          onClick: () => navigate("/login")
        }
      });
      return;
    }

    if (!property) return;

    if (user.id === property.user_id) {
      toast.error("Você não pode enviar interesse no seu próprio imóvel.");
      return;
    }

    try {
      const { error } = await supabase.from("leads").insert({
        property_id: property.id,
        owner_id: property.user_id,
        interested_user_id: user.id,
        status: "locked"
      });

      if (error) {
        if (error.code === '23505') {
          toast.info("Você já enviou interesse neste imóvel anteriormente.");
          setInterested(true);
          return;
        }
        throw error;
      }

      setInterested(true);
      toast.success("Seu interesse foi enviado ao proprietário!", {
        duration: 4000,
        icon: <Check className="h-4 w-4" />,
      });
    } catch (error) {
      toast.error("Falha ao enviar interesse. Tente novamente.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-svh flex items-center justify-center bg-background">
        <div className="text-center animate-pulse">
          <div className="h-12 w-12 bg-secondary rounded-full mx-auto mb-4" />
          <p className="text-muted-foreground">Carregando imóvel...</p>
        </div>
      </div>
    );
  }

  if (!property) return null;

  return (
    <div className="min-h-svh bg-background pb-32">
      {/* ── Image Gallery ──────────────────────────── */}
      <div className="relative w-full bg-secondary" style={{ aspectRatio: "16/10" }}>
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.img
            key={currentImage}
            custom={direction}
            variants={{
              enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.2, 0, 0, 1] }}
            src={images[currentImage]}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>

        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-foreground/40 to-transparent" />
        <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between p-4 pt-[max(1rem,env(safe-area-inset-top))]">
          <button onClick={() => navigate(-1)} className="flex h-10 w-10 items-center justify-center rounded-full bg-card/20 backdrop-blur-md">
            <ArrowLeft className="h-5 w-5 text-card" />
          </button>
          <div className="flex gap-2">
            <button onClick={() => setLiked(!liked)} className="flex h-10 w-10 items-center justify-center rounded-full bg-card/20 backdrop-blur-md">
              <Heart className={`h-5 w-5 transition-colors ${liked ? "fill-primary text-primary" : "text-card"}`} />
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-card/20 backdrop-blur-md">
              <Share2 className="h-5 w-5 text-card" />
            </button>
          </div>
        </div>

        {images.length > 1 && (
          <>
            <button onClick={prevImage} className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-card/20 backdrop-blur-sm"><ChevronLeft className="h-5 w-5 text-card" /></button>
            <button onClick={nextImage} className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-card/20 backdrop-blur-sm"><ChevronRight className="h-5 w-5 text-card" /></button>
          </>
        )}

        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
          {images.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === currentImage ? "w-6 bg-primary" : "w-1.5 bg-card/50"}`} />
          ))}
        </div>
      </div>

      <div className="px-4 pt-5">
        <div className="flex gap-2">
          <span className="rounded-lg bg-foreground px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-foreground">
            {property.type === "sale" ? "Venda" : "Aluguel"}
          </span>
          <span className="flex items-center gap-1 rounded-lg bg-secondary px-3 py-1 text-[11px] font-semibold text-foreground uppercase">
            <Home className="h-3 w-3" />
            {property.property_type === "house" ? "Casa" : property.property_type === "apartment" ? "Apartamento" : property.property_type === "land" ? "Terreno" : "Comercial"}
          </span>
        </div>

        <div className="mt-4 flex items-baseline gap-1">
          <span className="text-sm font-medium text-primary">R$</span>
          <span className="text-3xl font-bold tabular-nums tracking-display text-primary">
            {property.price.toLocaleString("pt-BR")}
          </span>
          {property.type === "rent" && <span className="text-sm text-muted-foreground">/mês</span>}
        </div>

        <div className="mt-2 flex items-start gap-2">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">{property.title}</p>
            <p className="text-xs text-muted-foreground">{property.neighborhood}, Nova Iguaçu – RJ</p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-4 gap-3">
          {[
            { icon: Bed, value: property.bedrooms, label: "Quartos" },
            { icon: Bath, value: property.bathrooms, label: "Banheiros" },
            { icon: Car, value: property.parking_spaces, label: "Vagas" },
            { icon: Maximize, value: `${property.size}m²`, label: "Área" },
          ].map((spec) => (
            <div key={spec.label} className="flex flex-col items-center gap-1.5 rounded-xl bg-secondary p-3 ring-1 ring-foreground/5">
              <spec.icon className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-bold tabular-nums">{spec.value}</span>
              <span className="text-[10px] text-muted-foreground">{spec.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <h2 className="text-base font-bold tracking-display">Descrição</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground whitespace-pre-line">{property.description}</p>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-foreground/5 bg-background/95 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-lg">
        <div className="mx-auto flex max-w-lg items-center gap-3">
          <div className="flex-1">
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              {property.type === "rent" ? "Aluguel mensal" : "Preço"}
            </span>
            <div className="flex items-baseline gap-0.5">
              <span className="text-xs font-medium text-primary">R$</span>
              <span className="text-lg font-bold tabular-nums tracking-display text-primary">
                {property.price.toLocaleString("pt-BR")}
              </span>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handleInterest}
            disabled={interested}
            className={`flex-1 rounded-xl py-3.5 text-sm font-bold transition-colors ${interested ? "bg-secondary text-muted-foreground" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}
          >
            {interested ? <span className="flex items-center justify-center gap-2"><Check className="h-4 w-4" /> Interesse enviado</span> : "Tenho Interesse"}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;
