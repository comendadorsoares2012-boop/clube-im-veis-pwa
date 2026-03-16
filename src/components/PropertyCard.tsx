import { Heart, Bed, Bath, Maximize } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface PropertyCardProps {
  image: string;
  type: "Venda" | "Aluguel";
  price: string;
  address: string;
  neighborhood: string;
  beds: number;
  baths: number;
  area: number;
}

const PropertyCard = ({
  image,
  type,
  price,
  address,
  neighborhood,
  beds,
  baths,
  area,
}: PropertyCardProps) => {
  const [liked, setLiked] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
      className="group relative flex flex-col gap-3 rounded-2xl bg-card p-2 shadow-card ring-1 ring-foreground/5 transition-shadow hover:shadow-card-hover"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-secondary">
        <img
          src={image}
          alt={address}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute left-3 top-3 rounded-lg bg-foreground px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-foreground">
          {type}
        </span>
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => setLiked(!liked)}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm transition-colors"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              liked ? "fill-primary text-primary" : "text-foreground"
            }`}
          />
        </motion.button>
      </div>

      <div className="px-2 pb-2">
        <div className="flex items-baseline gap-1">
          <span className="text-xs font-medium text-muted-foreground">R$</span>
          <span className="text-2xl font-bold tabular-nums tracking-display">
            {price}
          </span>
        </div>
        <h3 className="mt-1 truncate text-sm font-medium leading-tight">
          {address}
        </h3>
        <p className="mb-3 text-xs text-muted-foreground">
          {neighborhood}, Nova Iguaçu
        </p>

        <div className="flex items-center gap-4 border-t border-foreground/5 pt-3">
          <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Bed className="h-3.5 w-3.5" /> {beds}
          </span>
          <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Bath className="h-3.5 w-3.5" /> {baths}
          </span>
          <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Maximize className="h-3.5 w-3.5" /> {area}m²
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
