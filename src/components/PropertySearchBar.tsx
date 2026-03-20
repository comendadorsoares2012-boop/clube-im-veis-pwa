import { useState } from "react";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
import { Search, SlidersHorizontal, ChevronDown, X, ArrowRight } from "lucide-react";
=======
import { Search, SlidersHorizontal, ChevronDown, X } from "lucide-react";
>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3
import { motion, AnimatePresence } from "framer-motion";

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

const priceRanges = [
  { label: "Qualquer preço", value: "" },
  { label: "Até R$ 200.000", value: "0-200000" },
  { label: "R$ 200.000 – R$ 500.000", value: "200000-500000" },
  { label: "R$ 500.000 – R$ 1.000.000", value: "500000-1000000" },
  { label: "Acima de R$ 1.000.000", value: "1000000+" },
];

export interface SearchFilters {
  mode: "comprar" | "alugar";
  neighborhood: string;
  priceRange: string;
  query: string;
}

interface PropertySearchBarProps {
  filters: SearchFilters;
  onChange: (filters: SearchFilters) => void;
}

const PropertySearchBar = ({ filters, onChange }: PropertySearchBarProps) => {
  const [showFilters, setShowFilters] = useState(false);
<<<<<<< HEAD
  const navigate = useNavigate();
=======
>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3

  const update = (partial: Partial<SearchFilters>) =>
    onChange({ ...filters, ...partial });

<<<<<<< HEAD
  const handleSearch = () => {
    const params = new URLSearchParams();
    if (filters.query) params.append("q", filters.query);
    if (filters.neighborhood !== "Todos") params.append("neighborhood", filters.neighborhood);
    if (filters.mode) params.append("purpose", filters.mode);
    navigate(`/buscar?${params.toString()}`);
  };

=======
>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3
  return (
    <div className="space-y-3">
      {/* Mode toggle */}
      <div className="flex rounded-xl bg-secondary p-1">
        {(["comprar", "alugar"] as const).map((mode) => (
          <button
            key={mode}
            onClick={() => update({ mode })}
            className={`relative flex-1 rounded-lg py-2.5 text-sm font-semibold transition-colors ${
              filters.mode === mode
                ? "bg-card text-foreground shadow-card"
                : "text-muted-foreground"
            }`}
          >
            {mode === "comprar" ? "Comprar" : "Alugar"}
          </button>
        ))}
      </div>

      {/* Search input row */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar em Nova Iguaçu..."
            value={filters.query}
            onChange={(e) => update({ query: e.target.value })}
            className="w-full rounded-xl bg-secondary py-3.5 pl-11 pr-4 text-sm outline-none ring-1 ring-foreground/5 transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/40"
          />
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center justify-center rounded-xl px-4 transition-colors ${
            showFilters
              ? "bg-foreground text-primary-foreground"
              : "bg-secondary text-muted-foreground ring-1 ring-foreground/5"
          }`}
        >
          <SlidersHorizontal className="h-4 w-4" />
        </motion.button>
<<<<<<< HEAD
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleSearch}
          className="flex items-center justify-center rounded-xl bg-primary px-4 text-primary-foreground shadow-lg shadow-primary/20"
        >
          <ArrowRight className="h-4 w-4" />
        </motion.button>
=======
>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3
      </div>

      {/* Expandable filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
            className="overflow-hidden"
          >
            <div className="space-y-3 rounded-xl bg-secondary p-4 ring-1 ring-foreground/5">
              {/* Neighborhood */}
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Bairro
                </label>
                <div className="relative">
                  <select
                    value={filters.neighborhood}
                    onChange={(e) => update({ neighborhood: e.target.value })}
                    className="w-full appearance-none rounded-lg bg-card px-4 py-2.5 pr-10 text-sm ring-1 ring-foreground/5 outline-none focus:ring-2 focus:ring-primary/40"
                  >
                    {neighborhoods.map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>

              {/* Price range */}
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Faixa de preço
                </label>
                <div className="relative">
                  <select
                    value={filters.priceRange}
                    onChange={(e) => update({ priceRange: e.target.value })}
                    className="w-full appearance-none rounded-lg bg-card px-4 py-2.5 pr-10 text-sm ring-1 ring-foreground/5 outline-none focus:ring-2 focus:ring-primary/40"
                  >
                    {priceRanges.map((r) => (
                      <option key={r.value} value={r.value}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>

              {/* Clear filters */}
              <button
                onClick={() =>
                  update({
                    neighborhood: "Todos",
                    priceRange: "",
                    query: "",
                  })
                }
                className="flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="h-3 w-3" />
                Limpar filtros
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PropertySearchBar;
