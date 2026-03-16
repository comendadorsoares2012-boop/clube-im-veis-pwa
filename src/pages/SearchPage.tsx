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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import PropertyCardFull, { PropertyCardFullProps } from "@/components/PropertyCardFull";

import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";
import property5 from "@/assets/property-5.jpg";
import property6 from "@/assets/property-6.jpg";

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
const SearchPage = () => {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [showFilters, setShowFilters] = useState(false);
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

  return (
    <div className="min-h-svh bg-background">
      <Header />

      <main className="pb-24">
        {/* Search bar + filter toggle */}
        <section className="sticky top-16 z-40 bg-background/95 px-4 pb-3 pt-4 backdrop-blur-md">
          {/* Purpose toggle */}
          <div className="mb-3 flex rounded-xl bg-secondary p-1">
            {(["todos", "comprar", "alugar"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => update({ purpose: mode })}
                className={`relative flex-1 rounded-lg py-2 text-sm font-semibold transition-colors ${
                  filters.purpose === mode
                    ? "bg-card text-foreground shadow-card"
                    : "text-muted-foreground"
                }`}
              >
                {mode === "todos" ? "Todos" : mode === "comprar" ? "Comprar" : "Alugar"}
              </button>
            ))}
          </div>

          {/* Search row */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar endereço ou bairro..."
                value={filters.query}
                onChange={(e) => update({ query: e.target.value })}
                className="w-full rounded-xl bg-secondary py-3 pl-11 pr-4 text-sm outline-none ring-1 ring-foreground/5 transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/40"
              />
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
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
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {propertyTypes.map((pt) => {
              const isActive = filters.propertyType === pt.value;
              const Icon = pt.icon;
              return (
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
              );
            })}
          </div>
        </section>

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
              </div>
            </motion.section>
          )}
        </AnimatePresence>

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
            <PropertyCardFull key={`search-${i}`} {...p} />
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
            )}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

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
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  </div>
);

export default SearchPage;
