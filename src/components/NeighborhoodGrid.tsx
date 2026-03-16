import { MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const neighborhoods = [
  { name: "Centro", count: 24 },
  { name: "Comendador Soares", count: 18 },
  { name: "Austin", count: 12 },
  { name: "Posse", count: 15 },
  { name: "Cabuçu", count: 9 },
  { name: "Miguel Couto", count: 11 },
  { name: "Jardim Alvorada", count: 7 },
];

const NeighborhoodGrid = () => {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
      {neighborhoods.map((n) => (
        <motion.button
          key={n.name}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
          className="group flex flex-col items-start gap-2 rounded-xl bg-secondary p-4 ring-1 ring-foreground/5 transition-shadow hover:shadow-card"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
            <MapPin className="h-4 w-4 text-primary" />
          </div>
          <div className="text-left">
            <h3 className="text-sm font-semibold leading-tight">{n.name}</h3>
            <p className="text-xs text-muted-foreground">
              {n.count} imóveis
            </p>
          </div>
          <ArrowRight className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-1" />
        </motion.button>
      ))}
    </div>
  );
};

export default NeighborhoodGrid;
