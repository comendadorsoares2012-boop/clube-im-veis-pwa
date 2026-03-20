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
<<<<<<< HEAD
  Map as MapIcon,
  LayoutGrid,
=======
>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
<<<<<<< HEAD
import PropertyCardFull from "@/components/PropertyCardFull";
import { useFavoritesContext } from "@/contexts/FavoritesContext";
import { supabase } from "@/integrations/supabase/client";
import PropertyMap from "@/components/PropertyMap";
import { toast } from "sonner";
=======
import PropertyCardFull, { PropertyCardFullProps } from "@/components/PropertyCardFull";
import { useFavoritesContext } from "@/contexts/FavoritesContext";

import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";
import property5 from "@/assets/property-5.jpg";
import property6 from "@/assets/property-6.jpg";
>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3

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

<<<<<<< HEAD
const neighborhoods = ["Todos", "Centro", "Comendador Soares", "Austin", "Posse", "Cabuçu", "Miguel Couto", "Jardim Alvorada"];
=======
// ── Data ──────────────────────────────────────────────
const neighborhoods = [
  "Todos",
  "Centro",
  "Comendador Soares",
  "Austin",
  "Posse",
  "Cabuçu",
  "Miguel Couto",
  "Jardim Alvorada",
];

>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3
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

<<<<<<< HEAD
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

=======
const images = [property1, property2, property3, property4, property5, property6];

type PropertyData = PropertyCardFullProps & { featured: boolean; createdAt: number };

const generateProperties = (count: number, offset: number = 0): PropertyData[] => {
  const types = ["Casa", "Apartamento", "Comercial", "Terreno"];
  const purposes: ("Venda" | "Aluguel")[] = ["Venda", "Aluguel"];
  const streets = [
    "Rua das Palmeiras",
    "Av. Gov. Amaral Peixoto",
    "Rua Bernardino de Melo",
    "Rua Dr. Mário Guimarães",
    "Rua Getúlio Vargas",
    "Rua Silva Addor",
    "Rua Coronel Alfredo",
    "Trav. dos Manacás",
    "Rua José Bonifácio",
    "Av. Abílio Augusto Távora",
  ];

  return Array.from({ length: count }, (_, i) => {
    const idx = offset + i;
    const purpose = purposes[idx % 2];
    const priceNum =
      purpose === "Aluguel"
        ? 1200 + Math.floor(Math.random() * 4800)
        : 180000 + Math.floor(Math.random() * 1200000);
    const price = priceNum.toLocaleString("pt-BR");
    const beds = 1 + (idx % 5);
    const baths = 1 + (idx % 3);
    const parking = idx % 3;
    const area = 40 + Math.floor(Math.random() * 310);

    return {
      id: String(idx + 1),
      image: images[idx % images.length],
      type: purpose,
      propertyType: types[idx % types.length],
      price,
      address: `${streets[idx % streets.length]}, ${100 + idx * 10}`,
      neighborhood: neighborhoods[1 + (idx % (neighborhoods.length - 1))],
      beds,
      baths,
      area,
      parking,
      featured: idx % 4 === 0,
      createdAt: Date.now() - idx * 86400000,
    };
  });
};

// ── Page Size ─────────────────────────────────────────
const PAGE_SIZE = 12;

// ── Component ─────────────────────────────────────────
>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3
const SearchPage = () => {
  const { isFavorite, toggleFavorite } = useFavoritesContext();
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [showFilters, setShowFilters] = useState(false);
<<<<<<< HEAD
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
=======
  const [sort, setSort] = useState<SortOption>("newest");
  const [showSort, setShowSort] = useState(false);
  const [allData] = useState<PropertyData[]>(() => generateProperties(60));
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const update = (partial: Partial<Filters>) =>
    setFilters((f) => ({ ...f, ...partial }));

  // ── Filter + Sort ─────────────────────────────────
  const filtered = allData
    .filter((p) => {
      if (filters.purpose === "comprar" && p.type !== "Venda") return false;
      if (filters.purpose === "alugar" && p.type !== "Aluguel") return false;
      if (filters.propertyType !== "Todos" && p.propertyType !== filters.propertyType)
        return false;
      if (filters.neighborhood !== "Todos" && p.neighborhood !== filters.neighborhood)
        return false;
      if (filters.beds !== "Qualquer" && p.beds < parseInt(filters.beds))
        return false;
      if (
        filters.parking !== "Qualquer" &&
        (p.parking ?? 0) < parseInt(filters.parking)
      )
        return false;
      if (filters.query) {
        const q = filters.query.toLowerCase();
        if (
          !p.address.toLowerCase().includes(q) &&
          !p.neighborhood.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    })
    .sort((a, b) => {
      const parsePrice = (s: string) =>
        parseFloat(s.replace(/\./g, "").replace(",", "."));
      switch (sort) {
        case "price_asc":
          return parsePrice(a.price) - parsePrice(b.price);
        case "price_desc":
          return parsePrice(b.price) - parsePrice(a.price);
        case "featured":
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        default:
          return b.createdAt - a.createdAt;
      }
    });

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  // ── Infinite Scroll ───────────────────────────────
  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((v) => v + PAGE_SIZE);
      setLoading(false);
    }, 600);
  }, [loading, hasMore]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) loadMore();
      },
      { rootMargin: "200px" }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  // Reset visible count on filter change
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [filters, sort]);

  const activeFilterCount = [
    filters.propertyType !== "Todos",
    filters.neighborhood !== "Todos",
    filters.beds !== "Qualquer",
    filters.parking !== "Qualquer",
    filters.priceMin !== "",
    filters.priceMax !== "",
    filters.areaMin !== "",
  ].filter(Boolean).length;
>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3

  return (
    <div className="min-h-svh bg-background">
      <Header />

<<<<<<< HEAD
      <main className="pt-16 pb-24">
        {/* Sticky Filters Header */}
        <section className="sticky top-16 z-40 bg-background/95 px-4 pb-3 pt-4 backdrop-blur-md shadow-sm">
=======
      <main className="pb-24">
        {/* Search bar + filter toggle */}
        <section className="sticky top-16 z-40 bg-background/95 px-4 pb-3 pt-4 backdrop-blur-md">
          {/* Purpose toggle */}
>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3
          <div className="mb-3 flex rounded-xl bg-secondary p-1">
            {(["todos", "comprar", "alugar"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => update({ purpose: mode })}
<<<<<<< HEAD
                className={`relative flex-1 rounded-lg py-2 text-sm font-semibold transition-colors ${filters.purpose === mode ? "bg-card text-foreground shadow-card" : "text-muted-foreground"}`}
=======
                className={`relative flex-1 rounded-lg py-2 text-sm font-semibold transition-colors ${
                  filters.purpose === mode
                    ? "bg-card text-foreground shadow-card"
                    : "text-muted-foreground"
                }`}
>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3
              >
                {mode === "todos" ? "Todos" : mode === "comprar" ? "Comprar" : "Alugar"}
              </button>
            ))}
          </div>

<<<<<<< HEAD
=======
          {/* Search row */}
>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar endereço ou bairro..."
                value={filters.query}
                onChange={(e) => update({ query: e.target.value })}
<<<<<<< HEAD
                className="w-full rounded-xl bg-secondary py-3 pl-11 pr-4 text-sm outline-none ring-1 ring-foreground/5 placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/40"
=======
                className="w-full rounded-xl bg-secondary py-3 pl-11 pr-4 text-sm outline-none ring-1 ring-foreground/5 transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/40"
>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3
              />
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
<<<<<<< HEAD
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

=======
              className={`relative flex items-center justify-center rounded-xl px-4 transition-colors ${
                showFilters
                  ? "bg-foreground text-primary-foreground"
                  : "bg-secondary text-muted-foreground ring-1 ring-foreground/5"
              }`}
            >
              <SlidersHorizontal className="h-4 w-4" />
              {activeFilterCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
                  {activeFilterCount}
                </span>
              )}
            </motion.button>
          </div>

          {/* Property type chips */}
>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {propertyTypes.map((pt) => {
              const isActive = filters.propertyType === pt.value;
              const Icon = pt.icon;
              return (
<<<<<<< HEAD
                <button
                  key={pt.value}
                  onClick={() => update({ propertyType: pt.value })}
                  className={`flex shrink-0 items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium transition-colors ${isActive ? "bg-foreground text-primary-foreground" : "bg-secondary text-muted-foreground"}`}
                >
                  {Icon && <Icon className="h-3.5 w-3.5" />}
                  {pt.label}
                </button>
=======
                <motion.button
                  key={pt.value}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => update({ propertyType: pt.value })}
                  className={`flex shrink-0 items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-foreground text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {Icon && <Icon className="h-3.5 w-3.5" />}
                  {pt.label}
                </motion.button>
>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3
              );
            })}
          </div>
        </section>

<<<<<<< HEAD
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
=======
        {/* Expandable advanced filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.section
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
              className="overflow-hidden px-4"
            >
              <div className="space-y-4 rounded-2xl bg-secondary p-4 ring-1 ring-foreground/5">
                {/* Neighborhood */}
                <FilterSelect
                  label="Bairro"
                  value={filters.neighborhood}
                  onChange={(v) => update({ neighborhood: v })}
                  options={neighborhoods}
                />

                {/* Price range */}
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Faixa de preço (R$)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Mínimo"
                      value={filters.priceMin}
                      onChange={(e) => update({ priceMin: e.target.value })}
                      className="w-full rounded-lg bg-card px-3 py-2.5 text-sm ring-1 ring-foreground/5 outline-none focus:ring-2 focus:ring-primary/40 tabular-nums"
                    />
                    <input
                      type="text"
                      placeholder="Máximo"
                      value={filters.priceMax}
                      onChange={(e) => update({ priceMax: e.target.value })}
                      className="w-full rounded-lg bg-card px-3 py-2.5 text-sm ring-1 ring-foreground/5 outline-none focus:ring-2 focus:ring-primary/40 tabular-nums"
                    />
                  </div>
                </div>

                {/* Beds + Parking row */}
                <div className="grid grid-cols-2 gap-3">
                  <FilterSelect
                    label="Quartos"
                    value={filters.beds}
                    onChange={(v) => update({ beds: v })}
                    options={["Qualquer", "1", "2", "3", "4", "5"]}
                  />
                  <FilterSelect
                    label="Vagas"
                    value={filters.parking}
                    onChange={(v) => update({ parking: v })}
                    options={["Qualquer", "1", "2", "3"]}
                  />
                </div>

                {/* Area */}
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Área mínima (m²)
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: 60"
                    value={filters.areaMin}
                    onChange={(e) => update({ areaMin: e.target.value })}
                    className="w-full rounded-lg bg-card px-3 py-2.5 text-sm ring-1 ring-foreground/5 outline-none focus:ring-2 focus:ring-primary/40 tabular-nums"
                  />
                </div>

                {/* Clear */}
                <button
                  onClick={() => setFilters(defaultFilters)}
                  className="flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                  Limpar filtros
                </button>
>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3
              </div>
            </motion.section>
          )}
        </AnimatePresence>

<<<<<<< HEAD
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
=======
        {/* Results header */}
        <section className="mt-5 flex items-center justify-between px-4">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
            imóveis encontrados
          </p>
          <div className="relative">
            <button
              onClick={() => setShowSort(!showSort)}
              className="flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium text-muted-foreground ring-1 ring-foreground/5 transition-colors hover:text-foreground"
            >
              <ArrowUpDown className="h-3 w-3" />
              {sortOptions.find((s) => s.value === sort)?.label}
            </button>
            <AnimatePresence>
              {showSort && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full z-50 mt-1 w-44 rounded-xl bg-card p-1 shadow-card-hover ring-1 ring-foreground/5"
                >
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setSort(opt.value);
                        setShowSort(false);
                      }}
                      className={`w-full rounded-lg px-3 py-2 text-left text-xs font-medium transition-colors ${
                        sort === opt.value
                          ? "bg-secondary text-foreground"
                          : "text-muted-foreground hover:bg-secondary/60"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Results grid */}
        <section className="mt-4 grid grid-cols-1 gap-4 px-4 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => (
            <PropertyCardFull key={`search-${i}`} {...p} liked={isFavorite(String(p.id || i))} onFavoriteToggle={() => toggleFavorite(String(p.id || i))} />
          ))}
        </section>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="mt-16 text-center">
            <p className="text-sm font-medium text-muted-foreground">
              Nenhum imóvel encontrado com esses filtros.
            </p>
            <button
              onClick={() => setFilters(defaultFilters)}
              className="mt-3 text-xs font-semibold text-primary"
            >
              Limpar filtros
            </button>
          </div>
        )}

        {/* Infinite scroll sentinel */}
        {hasMore && (
          <div ref={sentinelRef} className="flex items-center justify-center py-8">
            {loading && (
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3
            )}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

<<<<<<< HEAD
const FilterSelect = ({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) => (
  <div>
    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</label>
    <div className="relative">
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full appearance-none rounded-lg bg-card px-4 py-2.5 pr-10 text-sm ring-1 ring-foreground/5 outline-none focus:ring-2 focus:ring-primary/40">
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
=======
// ── Sub-component: FilterSelect ─────────────────────
const FilterSelect = ({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) => (
  <div>
    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
      {label}
    </label>
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-lg bg-card px-4 py-2.5 pr-10 text-sm ring-1 ring-foreground/5 outline-none focus:ring-2 focus:ring-primary/40"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  </div>
);

export default SearchPage;
