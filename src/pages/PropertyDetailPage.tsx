<<<<<<< HEAD
import { useState, useEffect, useCallback } from "react";
=======
import { useState, useCallback } from "react";
>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3
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
<<<<<<< HEAD
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
=======

import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";
import property5 from "@/assets/property-5.jpg";
import property6 from "@/assets/property-6.jpg";

// Mock data – in production this would come from an API
const allImages = [property1, property2, property3, property4, property5, property6];

const mockProperties: Record<
  string,
  {
    images: string[];
    type: "Venda" | "Aluguel";
    propertyType: string;
    price: string;
    address: string;
    neighborhood: string;
    beds: number;
    baths: number;
    parking: number;
    area: number;
    description: string;
    features: string[];
  }
> = {
  "1": {
    images: [property1, property3, property5],
    type: "Venda",
    propertyType: "Casa",
    price: "850.000",
    address: "Rua das Palmeiras, 120",
    neighborhood: "Centro",
    beds: 4,
    baths: 3,
    parking: 2,
    area: 220,
    description:
      "Excelente casa em localização privilegiada no Centro de Nova Iguaçu. Imóvel amplo com acabamento de primeira qualidade, piso porcelanato em todos os ambientes, cozinha planejada e quintal espaçoso. Próximo a comércio, escolas e transporte público. Ideal para famílias que buscam conforto e praticidade.",
    features: [
      "Piso porcelanato",
      "Cozinha planejada",
      "Quintal",
      "Churrasqueira",
      "Área de serviço",
      "Varanda",
    ],
  },
  "2": {
    images: [property2, property4, property6],
    type: "Aluguel",
    propertyType: "Apartamento",
    price: "2.800",
    address: "Av. Gov. Amaral Peixoto, 45",
    neighborhood: "Comendador Soares",
    beds: 2,
    baths: 1,
    parking: 1,
    area: 68,
    description:
      "Apartamento moderno em condomínio com infraestrutura completa. Sala ampla com varanda, quartos espaçosos e banheiro com box. Condomínio conta com portaria 24h, piscina, academia e salão de festas. Localização estratégica com fácil acesso a vias principais.",
    features: [
      "Portaria 24h",
      "Piscina",
      "Academia",
      "Salão de festas",
      "Playground",
      "Elevador",
    ],
  },
  "3": {
    images: [property3, property1, property6],
    type: "Venda",
    propertyType: "Apartamento",
    price: "420.000",
    address: "Rua Bernardino de Melo, 300",
    neighborhood: "Austin",
    beds: 3,
    baths: 2,
    parking: 1,
    area: 110,
    description:
      "Apartamento espaçoso com 3 quartos sendo 1 suíte, sala com 2 ambientes e varanda gourmet. Acabamento de alto padrão com armários planejados em todos os cômodos. Condomínio novo com lazer completo.",
    features: [
      "Suíte",
      "Varanda gourmet",
      "Armários planejados",
      "Ar-condicionado",
      "Área gourmet",
      "Bicicletário",
    ],
  },
};

// Fallback for any ID
const getFallbackProperty = (id: string) => ({
  images: [allImages[parseInt(id) % allImages.length], allImages[(parseInt(id) + 2) % allImages.length], allImages[(parseInt(id) + 4) % allImages.length]],
  type: (parseInt(id) % 2 === 0 ? "Aluguel" : "Venda") as "Venda" | "Aluguel",
  propertyType: parseInt(id) % 2 === 0 ? "Apartamento" : "Casa",
  price: parseInt(id) % 2 === 0 ? "2.500" : "550.000",
  address: `Rua Exemplo, ${id}00`,
  neighborhood: "Centro",
  beds: 3,
  baths: 2,
  parking: 1,
  area: 120,
  description:
    "Imóvel com ótima localização em Nova Iguaçu, próximo a comércio, escolas e transporte. Acabamento moderno e espaços amplos. Agende sua visita!",
  features: ["Piso porcelanato", "Cozinha planejada", "Quintal", "Varanda"],
});
>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3

const PropertyDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
<<<<<<< HEAD
  const { user } = useAuth();
  
  const [property, setProperty] = useState<DBProperty | null>(null);
  const [loading, setLoading] = useState(true);
=======
  const property = mockProperties[id || ""] || getFallbackProperty(id || "1");

>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3
  const [currentImage, setCurrentImage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [liked, setLiked] = useState(false);
  const [interested, setInterested] = useState(false);

<<<<<<< HEAD
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
=======
  const nextImage = useCallback(() => {
    setDirection(1);
    setCurrentImage((prev) => (prev + 1) % property.images.length);
  }, [property.images.length]);

  const prevImage = useCallback(() => {
    setDirection(-1);
    setCurrentImage((prev) => (prev - 1 + property.images.length) % property.images.length);
  }, [property.images.length]);

  const handleInterest = () => {
    setInterested(true);
    toast.success("Seu interesse foi enviado ao proprietário do imóvel.", {
      duration: 4000,
      icon: <Check className="h-4 w-4" />,
    });
  };

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
  };
>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3

  return (
    <div className="min-h-svh bg-background pb-32">
      {/* ── Image Gallery ──────────────────────────── */}
      <div className="relative w-full bg-secondary" style={{ aspectRatio: "16/10" }}>
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.img
            key={currentImage}
            custom={direction}
<<<<<<< HEAD
            variants={{
              enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
            }}
=======
            variants={slideVariants}
>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.2, 0, 0, 1] }}
<<<<<<< HEAD
            src={images[currentImage]}
=======
            src={property.images[currentImage]}
            alt={property.address}
>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>

<<<<<<< HEAD
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
=======
        {/* Top gradient */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-foreground/40 to-transparent" />

        {/* Top nav */}
        <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between p-4 pt-[max(1rem,env(safe-area-inset-top))]">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-card/20 backdrop-blur-md"
          >
            <ArrowLeft className="h-5 w-5 text-card" />
          </motion.button>
          <div className="flex gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setLiked(!liked)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-card/20 backdrop-blur-md"
            >
              <Heart
                className={`h-5 w-5 transition-colors ${
                  liked ? "fill-primary text-primary" : "text-card"
                }`}
              />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-card/20 backdrop-blur-md"
            >
              <Share2 className="h-5 w-5 text-card" />
            </motion.button>
          </div>
        </div>

        {/* Arrows */}
        {property.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-card/20 backdrop-blur-sm transition-colors hover:bg-card/40"
            >
              <ChevronLeft className="h-5 w-5 text-card" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-card/20 backdrop-blur-sm transition-colors hover:bg-card/40"
            >
              <ChevronRight className="h-5 w-5 text-card" />
            </button>
          </>
        )}

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
          {property.images.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > currentImage ? 1 : -1);
                setCurrentImage(i);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentImage ? "w-6 bg-primary" : "w-1.5 bg-card/50"
              }`}
            />
          ))}
        </div>

        {/* Image counter */}
        <span className="absolute bottom-3 right-3 z-10 rounded-lg bg-foreground/60 px-2.5 py-1 text-[10px] font-semibold text-card backdrop-blur-sm tabular-nums">
          {currentImage + 1}/{property.images.length}
        </span>
      </div>

      {/* ── Content ────────────────────────────────── */}
      <div className="px-4 pt-5">
        {/* Badges */}
        <div className="flex gap-2">
          <span className="rounded-lg bg-foreground px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-foreground">
            {property.type}
          </span>
          <span className="flex items-center gap-1 rounded-lg bg-secondary px-3 py-1 text-[11px] font-semibold text-foreground">
            <Home className="h-3 w-3" />
            {property.propertyType}
          </span>
        </div>

        {/* Price */}
        <div className="mt-4 flex items-baseline gap-1">
          <span className="text-sm font-medium text-primary">R$</span>
          <span className="text-3xl font-bold tabular-nums tracking-display text-primary">
            {property.price}
          </span>
          {property.type === "Aluguel" && (
            <span className="text-sm text-muted-foreground">/mês</span>
          )}
        </div>

        {/* Address */}
        <div className="mt-2 flex items-start gap-2">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">{property.address}</p>
            <p className="text-xs text-muted-foreground">
              {property.neighborhood}, Nova Iguaçu – RJ
            </p>
          </div>
        </div>

        {/* Specs grid */}
        <div className="mt-5 grid grid-cols-4 gap-3">
          {[
            { icon: Bed, value: property.beds, label: "Quartos" },
            { icon: Bath, value: property.baths, label: "Banheiros" },
            { icon: Car, value: property.parking, label: "Vagas" },
            { icon: Maximize, value: `${property.area}m²`, label: "Área" },
          ].map((spec) => (
            <div
              key={spec.label}
              className="flex flex-col items-center gap-1.5 rounded-xl bg-secondary p-3 ring-1 ring-foreground/5"
            >
>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3
              <spec.icon className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-bold tabular-nums">{spec.value}</span>
              <span className="text-[10px] text-muted-foreground">{spec.label}</span>
            </div>
          ))}
        </div>

<<<<<<< HEAD
        <div className="mt-6">
          <h2 className="text-base font-bold tracking-display">Descrição</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground whitespace-pre-line">{property.description}</p>
        </div>
      </div>

=======
        {/* Description */}
        <div className="mt-6">
          <h2 className="text-base font-bold tracking-display">Descrição</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {property.description}
          </p>
        </div>

        {/* Features */}
        <div className="mt-6">
          <h2 className="text-base font-bold tracking-display">Características</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {property.features.map((f) => (
              <span
                key={f}
                className="rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium text-foreground ring-1 ring-foreground/5"
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Fixed bottom CTA ───────────────────────── */}
>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-foreground/5 bg-background/95 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-lg">
        <div className="mx-auto flex max-w-lg items-center gap-3">
          <div className="flex-1">
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
<<<<<<< HEAD
              {property.type === "rent" ? "Aluguel mensal" : "Preço"}
=======
              {property.type === "Aluguel" ? "Aluguel mensal" : "Preço"}
>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3
            </span>
            <div className="flex items-baseline gap-0.5">
              <span className="text-xs font-medium text-primary">R$</span>
              <span className="text-lg font-bold tabular-nums tracking-display text-primary">
<<<<<<< HEAD
                {property.price.toLocaleString("pt-BR")}
=======
                {property.price}
>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3
              </span>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handleInterest}
            disabled={interested}
<<<<<<< HEAD
            className={`flex-1 rounded-xl py-3.5 text-sm font-bold transition-colors ${interested ? "bg-secondary text-muted-foreground" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}
          >
            {interested ? <span className="flex items-center justify-center gap-2"><Check className="h-4 w-4" /> Interesse enviado</span> : "Tenho Interesse"}
=======
            className={`flex-1 rounded-xl py-3.5 text-sm font-bold transition-colors ${
              interested
                ? "bg-secondary text-muted-foreground"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            }`}
          >
            {interested ? (
              <span className="flex items-center justify-center gap-2">
                <Check className="h-4 w-4" />
                Interesse enviado
              </span>
            ) : (
              "Tenho Interesse"
            )}
>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;
