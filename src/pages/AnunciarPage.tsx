import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Building2, Store, TreePine, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
<<<<<<< HEAD
import { supabase } from "@/integrations/supabase/client";
=======
>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import PhotoUpload, { type PhotoItem } from "@/components/PhotoUpload";

const propertyTypes = [
  { value: "house", label: "Casa", icon: Home },
  { value: "apartment", label: "Apartamento", icon: Building2 },
  { value: "commercial", label: "Comercial", icon: Store },
  { value: "land", label: "Terreno", icon: TreePine },
];

const neighborhoods = [
  "Centro", "Miguel Couto", "Califórnia", "Jardim Iguaçu",
  "Comendador Soares", "Austin", "Vila Nova", "Posse",
  "Cabuçu", "Km 32", "Santa Rita", "Botafogo",
];

const AnunciarPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

<<<<<<< HEAD
  const [title, setTitle] = useState("");
=======
>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3
  const [purpose, setPurpose] = useState<"sale" | "rent">("sale");
  const [propertyType, setPropertyType] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [price, setPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [parking, setParking] = useState("");
  const [area, setArea] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [submitting, setSubmitting] = useState(false);
<<<<<<< HEAD
  const [maxPhotos, setMaxPhotos] = useState(5); // Default to basic

  useState(() => {
    const checkPlan = async () => {
        if (!user) return;
        const { data: sub } = await supabase
            .from("subscriptions")
            .select("plans(max_photos)")
            .eq("user_id", user.id)
            .eq("status", "active")
            .maybeSingle();
        
        if (sub?.plans) {
            setMaxPhotos((sub.plans as any).max_photos || 5);
        }
    };
    checkPlan();
  });
=======
>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3




  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Faça login para anunciar seu imóvel.");
      navigate("/login");
      return;
    }
<<<<<<< HEAD
    if (!title || !propertyType || !neighborhood || !price) {
=======
    if (!propertyType || !neighborhood || !price) {
>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }
    setSubmitting(true);
<<<<<<< HEAD

    try {
      // 1. Insert property
      const { data: property, error: pError } = await supabase
        .from("properties")
        .insert({
          user_id: user.id,
          title,
          description,
          price: parseFloat(price.replace(/\./g, "").replace(",", ".")),
          type: purpose,
          property_type: propertyType,
          city: "Nova Iguaçu", // Default city for now
          neighborhood: neighborhood,
          bedrooms: parseInt(bedrooms) || 0,
          bathrooms: parseInt(bathrooms) || 0,
          parking_spaces: parseInt(parking) || 0,
          size: parseFloat(area) || 0,
          status: "active", // Changed from 'free' for demo visibility, usually would be pending or free
        })
        .select()
        .single();

      if (pError) throw pError;

      // 2. Upload and insert images
      if (photos.length > 0) {
        const imageUploads = photos.map(async (photo, index) => {
          const fileExt = photo.file.name.split('.').pop();
          const fileName = `${property.id}/${crypto.randomUUID()}.${fileExt}`;
          
          const { error: uploadError } = await supabase.storage
            .from('property-images')
            .upload(fileName, photo.file);

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from('property-images')
            .getPublicUrl(fileName);

          return {
            property_id: property.id,
            image_url: publicUrl,
            position: index,
          };
        });

        const imageRecords = await Promise.all(imageUploads);
        const { error: iError } = await supabase.from("property_images").insert(imageRecords);
        if (iError) throw iError;
      }

      toast.success("Imóvel cadastrado com sucesso!");
      navigate("/");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Erro ao publicar imóvel.");
    } finally {
      setSubmitting(false);
    }
=======
    // Simulate submission
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitting(false);
    toast.success("Imóvel cadastrado com sucesso! Seu anúncio ficará gratuito por 7 dias.");
    navigate("/");
>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3
  };

  return (
    <div className="min-h-svh bg-background pb-28">
      <Header />

      <main className="mx-auto max-w-lg px-4 pt-20">
        {/* Free badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3"
        >
          <Sparkles className="h-5 w-5 shrink-0 text-primary" />
          <p className="text-sm font-medium text-foreground">
            Seu imóvel ficará <span className="font-bold text-primary">gratuito por 7 dias</span>.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
<<<<<<< HEAD
          {/* Title */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Título do Anúncio
            </Label>
            <Input
              placeholder="Ex: Apartamento 3 quartos no Centro"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-xl"
            />
          </div>

=======
>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3
          {/* Purpose */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Finalidade
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {(["sale", "rent"] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPurpose(p)}
                  className={`rounded-xl border py-3 text-sm font-semibold transition-all ${
                    purpose === p
                      ? "border-primary bg-primary text-primary-foreground shadow-md"
                      : "border-input bg-background text-foreground hover:border-primary/40"
                  }`}
                >
                  {p === "sale" ? "Venda" : "Aluguel"}
                </button>
              ))}
            </div>
          </div>

          {/* Property type */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Tipo do Imóvel
            </Label>
            <div className="grid grid-cols-4 gap-2">
              {propertyTypes.map((t) => {
                const Icon = t.icon;
                return (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => setPropertyType(t.value)}
                    className={`flex flex-col items-center gap-1.5 rounded-xl border py-3 text-xs font-medium transition-all ${
                      propertyType === t.value
                        ? "border-primary bg-primary text-primary-foreground shadow-md"
                        : "border-input bg-background text-foreground hover:border-primary/40"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Neighborhood */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Bairro
            </Label>
            <Select value={neighborhood} onValueChange={setNeighborhood}>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Selecione o bairro" />
              </SelectTrigger>
              <SelectContent>
                {neighborhoods.map((n) => (
                  <SelectItem key={n} value={n}>{n}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Preço (R$)
            </Label>
            <Input
              type="text"
              inputMode="numeric"
              placeholder="Ex: 350.000"
              value={price}
              onChange={(e) => setPrice(e.target.value.replace(/[^0-9.]/g, ""))}
              className="rounded-xl"
            />
          </div>

          {/* Specs grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Quartos
              </Label>
              <Select value={bedrooms} onValueChange={setBedrooms}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="0" />
                </SelectTrigger>
                <SelectContent>
                  {[0, 1, 2, 3, 4, 5].map((n) => (
                    <SelectItem key={n} value={String(n)}>{n}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Banheiros
              </Label>
              <Select value={bathrooms} onValueChange={setBathrooms}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="0" />
                </SelectTrigger>
                <SelectContent>
                  {[0, 1, 2, 3, 4, 5].map((n) => (
                    <SelectItem key={n} value={String(n)}>{n}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Vagas
              </Label>
              <Select value={parking} onValueChange={setParking}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="0" />
                </SelectTrigger>
                <SelectContent>
                  {[0, 1, 2, 3, 4, 5].map((n) => (
                    <SelectItem key={n} value={String(n)}>{n}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Área (m²)
              </Label>
              <Input
                type="text"
                inputMode="numeric"
                placeholder="Ex: 120"
                value={area}
                onChange={(e) => setArea(e.target.value.replace(/[^0-9]/g, ""))}
                className="rounded-xl"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Descrição
            </Label>
            <Textarea
              placeholder="Descreva o imóvel, diferenciais, localização..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[120px] rounded-xl"
              maxLength={2000}
            />
            <p className="text-right text-xs text-muted-foreground">{description.length}/2000</p>
          </div>

          {/* Photos */}
<<<<<<< HEAD
          <PhotoUpload photos={photos} onChange={setPhotos} max={maxPhotos} />
=======
          <PhotoUpload photos={photos} onChange={setPhotos} max={10} />
>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3

          {/* Submit */}
          <Button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl py-6 text-base font-bold shadow-lg"
          >
            {submitting ? "Publicando..." : "Publicar Imóvel"}
          </Button>
        </form>
      </main>

      <BottomNav />
    </div>
  );
};

export default AnunciarPage;
