import { motion } from "framer-motion";

interface FilterChipsProps {
  active: string;
  onChange: (value: string) => void;
}

const chips = [
  { label: "Todos", value: "todos" },
  { label: "Comprar", value: "venda" },
  { label: "Alugar", value: "aluguel" },
  { label: "Casas", value: "casa" },
  { label: "Apartamentos", value: "apartamento" },
];

const FilterChips = ({ active, onChange }: FilterChipsProps) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
      {chips.map((chip) => {
        const isActive = active === chip.value;
        return (
          <motion.button
            key={chip.value}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(chip.value)}
            className={`shrink-0 rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "bg-foreground text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:bg-muted"
            }`}
          >
            {chip.label}
          </motion.button>
        );
      })}
    </div>
  );
};

export default FilterChips;
