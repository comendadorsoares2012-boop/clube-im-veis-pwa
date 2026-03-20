import { useState, useEffect, useCallback, useRef } from "react";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  X,
  ArrowUpDown,
  Loader2,
  Home,
  Building2,
  Store,
  LandPlot,
  Map as MapIcon,
  LayoutGrid,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import PropertyCardFull from "@/components/PropertyCardFull";
import { useFavoritesContext } from "@/contexts/FavoritesContext";
import { supabase } from "@/integrations/supabase/client";
import PropertyMap from "@/components/PropertyMap";
import { toast } from "sonner";

// ── Types ─────────────────────────────────────────────
type SortOption = "newest" | "price_asc" | "price_desc" | "featured";

interface Filters {
  query: string;
  purpose: "todos" | "comprar" | "alugar";
  propertyType: string;
  neighborhood: string;
  priceMin: string;
  priceMax: string;
  beds: string;
  parking: string;
  areaMin: string;
}

const defaultFilters: Filters = {
  query: "",
  purpose: "todos",
  propertyType: "Todos",
  neighborhood: "Todos",
  priceMin: "",
  priceMax: "",
  beds: "Qualquer",
  parking: "Qualquer",
  areaMin: "",
};

const neighborhoods = ["Todos", "Centro", "Comendador Soares", "Austin", "Posse", "Cabuçu", "Miguel Couto", "Jardim Alvorada"];
const propertyTypes = [
  { label: "Todos", value: "Todos", icon: null },
  { label: "Casa", value: "Casa", icon: Home },
  { label: "Apartamento", value: "Apartamento", icon: Building2 },
  { label: "Comercial", value: "Comercial", icon: Store },
  { label: "Terreno", value: "Terreno", icon: LandPlot },
];

const sortOptions: { label: string; value: SortOption }[] = [
  { label: "Mais recentes", value: "newest" },
  { label: "Menor preço", value: "price_asc" },
  { label: "Maior preço", value: "price_desc" },
  { label: "Destaques", value: "featured" },
];

interface DBProperty {
  id: string;
  title: string;
  price: number;
  type: "sale" | "rent";
  property_type: string;
  neighborhood: string;
  bedrooms: number;
  bathrooms: number;
  parking_spaces: number;
  size: number;
  status: string;
  latitude: number;
  longitude: number;
  created_at: string;
  property_images: { image_url: string }[];
}

const SearchPage = () => {
  const { isFavorite, toggleFavorite } = useFavoritesContext();
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [sort, setSort] = useState<SortOption>("newest");
  const [showSort, setShowSort] = useState(false);
  const [properties, setProperties] = useState<DBProperty[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from("properties")
        .select("*, property_images(image_url)")
        .in("status", ["active", "premium"]);

      if (filters.purpose === "comprar") query = query.eq("type", "sale");
      if (filters.purpose === "alugar") query = query.eq("type", "rent");
      if (filters.propertyType !== "Todos") {
        const typeMap: Record<string, string> = {
          'Casa': 'house',
          'Apartamento': 'apartment',
          'Comercial': 'commercial',
          'Terreno': 'land'
        };
        query = query.eq("property_type", typeMap[filters.propertyType] || 'house');
      }
      if (filters.neighborhood !== "Todos") query = query.ilike("neighborhood", `%${filters.neighborhood}%`);
      if (filters.priceMin) query = query.gte("price", parseFloat(filters.priceMin));
      if (filters.priceMax) query = query.lte("price", parseFloat(filters.priceMax));
      if (filters.beds !== "Qualquer") query = query.gte("bedrooms", parseInt(filters.beds));
      if (filters.query) query = query.or(`title.ilike.%${filters.query}%,neighborhood.ilike.%${filters.query}%`);

      // Sorting
      if (sort === "price_asc") query = query.order("price", { ascending: true });
      else if (sort === "price_desc") query = query.order("price", { ascending: false });
      else if (sort === "featured") query = query.order("status", { ascending: false });
      else query = query.order("created_at", { ascending: false });

      const { data, error } = await query;
      if (error) throw error;
      setProperties(data as any || []);
    } catch (error) {
      toast.error("Erro ao buscar imóveis.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [filters, sort]);

  const update = (partial: Partial<Filters>) => setFilters((f) => ({ ...f, ...partial }));

  const mapToCard = (p: DBProperty) => ({
    id: p.id,
    image: p.property_images?.[0]?.image_url || "/placeholder.svg",
    type: p.type === "sale" ? ("Venda" as const) : ("Aluguel" as const),
    propertyType: p.property_type === "house" ? "Casa" : p.property_type === "apartment" ? "Apartamento" : p.property_type === "land" ? "Terreno" : "Comercial",
    price: p.price.toLocaleString("pt-BR"),
    address: p.title,
    neighborhood: p.neighborhood,
    beds: p.bedrooms || 0,
    baths: p.bathrooms || 0,
    area: p.size || 0,
    parking: p.parking_spaces || 0,
    premium: p.status === "premium",
  });

  return (
    <div className="min-h-svh bg-background">
      <Header />

      <main className="pt-16 pb-24">
        {/* Sticky Filters Header */}
        <section className="sticky top-16 z-40 bg-background/95 px-4 pb-3 pt-4 backdrop-blur-md shadow-sm">
          <div className="mb-3 flex rounded-xl bg-secondary p-1">
            {(["todos", "comprar", "alugar"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => update({ purpose: mode })}
                className={`relative flex-1 rounded-lg py-2 text-sm font-semibold transition-colors ${filters.purpose === mode ? "bg-card text-foreground shadow-card" : "text-muted-foreground"}`}
              >
                {mode === "todos" ? "Todos" : mode === "comprar" ? "Comprar" : "Alugar"}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar endereço ou bairro..."
                value={filters.query}
                onChange={(e) => update({ query: e.target.value })}
                className="w-full rounded-xl bg-secondary py-3 pl-11 pr-4 text-sm outline-none ring-1 ring-foreground/5 placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/40"
              />
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center justify-center rounded-xl px-4 ${showFilters ? "bg-foreground text-primary-foreground" : "bg-secondary text-muted-foreground ring-1 ring-foreground/5"}`}
            >
              <SlidersHorizontal className="h-4 w-4" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode(viewMode === "grid" ? "map" : "grid")}
              className="flex items-center justify-center rounded-xl bg-primary text-primary-foreground px-4 shadow-lg shadow-primary/20"
            >
              {viewMode === "grid" ? <MapIcon className="h-4 w-4" /> : <LayoutGrid className="h-4 w-4" />}
            </motion.button>
          </div>

          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {propertyTypes.map((pt) => {
              const isActive = filters.propertyType === pt.value;
              const Icon = pt.icon;
              return (
                <button
                  key={pt.value}
                  onClick={() => update({ propertyType: pt.value })}
                  className={`flex shrink-0 items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium transition-colors ${isActive ? "bg-foreground text-primary-foreground" : "bg-secondary text-muted-foreground"}`}
                >
                  {Icon && <Icon className="h-3.5 w-3.5" />}
                  {pt.label}
                </button>
              );
            })}
          </div>
        </section>

        <AnimatePresence>
          {showFilters && (
            <motion.section initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden px-4 mb-4">
              <div className="space-y-4 rounded-2xl bg-secondary p-4 ring-1 ring-foreground/5 mt-2">
                <div className="grid grid-cols-2 gap-3">
                  <FilterSelect label="Bairro" value={filters.neighborhood} onChange={(v) => update({ neighborhood: v })} options={neighborhoods} />
                  <FilterSelect label="Quartos" value={filters.beds} onChange={(v) => update({ beds: v })} options={["Qualquer", "1", "2", "3", "4+"]} />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Preço (R$)</label>
                  <div className="flex gap-2">
                    <input type="number" placeholder="Mín" value={filters.priceMin} onChange={(e) => update({ priceMin: e.target.value })} className="w-full rounded-lg bg-card px-3 py-2.5 text-sm ring-1 ring-foreground/5 outline-none focus:ring-2 focus:ring-primary/40" />
                    <input type="number" placeholder="Máx" value={filters.priceMax} onChange={(e) => update({ priceMax: e.target.value })} className="w-full rounded-lg bg-card px-3 py-2.5 text-sm ring-1 ring-foreground/5 outline-none focus:ring-2 focus:ring-primary/40" />
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* View Content */}
        {viewMode === "map" ? (
          <div className="h-[60vh] w-full px-4 mt-2">
            <PropertyMap properties={properties.map(p => ({
              id: p.id,
              title: p.title,
              price: p.price,
              latitude: p.latitude,
              longitude: p.longitude,
              neighborhood: p.neighborhood,
              image: p.property_images?.[0]?.image_url || "/placeholder.svg"
            }))} />
          </div>
        ) : (
          <div className="px-4 mt-4">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{properties.length}</span> imóveis encontrados
              </p>
              <button 
                onClick={() => setShowSort(!showSort)}
                className="flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium text-muted-foreground"
              >
                <ArrowUpDown className="h-3 w-3" />
                {sortOptions.find(o => o.value === sort)?.label}
              </button>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map(n => <div key={n} className="aspect-video animate-pulse rounded-2xl bg-muted" />)}
              </div>
            ) : properties.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {properties.map(p => <PropertyCardFull key={p.id} {...mapToCard(p)} liked={isFavorite(p.id)} onFavoriteToggle={() => toggleFavorite(p.id)} />)}
              </div>
            ) : (
              <div className="py-20 text-center">
                <p className="text-muted-foreground font-medium">Nenhum imóvel encontrado.</p>
                <button onClick={() => setFilters(defaultFilters)} className="text-primary text-sm mt-2 font-bold underline">Limpar filtros</button>
              </div>
            )}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

const FilterSelect = ({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) => (
  <div>
    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</label>
    <div className="relative">
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full appearance-none rounded-lg bg-card px-4 py-2.5 pr-10 text-sm ring-1 ring-foreground/5 outline-none focus:ring-2 focus:ring-primary/40">
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  </div>
);

export default SearchPage;
