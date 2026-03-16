import { Heart, Bed, Bath, Maximize, ArrowRight, Car } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export interface PropertyCardFullProps {
  image: string;
  type: "Venda" | "Aluguel";
  propertyType: string;
  price: string;
  address: string;
  neighborhood: string;
  beds: number;
  baths: number;
  area: number;
  parking?: number;
}

const PropertyCardFull = ({
  image,
  type,
  propertyType,
  price,
  address,
  neighborhood,
  beds,
  baths,
  area,
  parking,
}: PropertyCardFullProps) => {
  const [liked, setLiked] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
      className="group relative flex flex-col rounded-2xl bg-card p-2 shadow-card ring-1 ring-foreground/5 transition-shadow hover:shadow-card-hover"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-secondary">
        <img
          src={image}
          alt={address}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute left-3 top-3 flex gap-1.5">
          <span className="rounded-lg bg-foreground px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
            {type}
          </span>
          <span className="rounded-lg bg-card/90 px-2.5 py-1 text-[10px] font-semibold text-foreground backdrop-blur-sm">
            {propertyType}
          </span>
        </div>
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={(e) => {
            e.stopPropagation();
            setLiked(!liked);
          }}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm transition-colors"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              liked ? "fill-primary text-primary" : "text-foreground"
            }`}
          />
        </motion.button>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-2 pb-2 pt-3">
        <div className="flex items-baseline gap-1">
          <span className="text-xs font-medium text-primary">R$</span>
          <span className="text-xl font-bold tabular-nums tracking-display text-primary">
            {price}
          </span>
          {type === "Aluguel" && (
            <span className="text-xs text-muted-foreground">/mês</span>
          )}
        </div>

        <h3 className="mt-1.5 truncate text-sm font-medium leading-tight">
          {address}
        </h3>
        <p className="text-xs text-muted-foreground">
          {neighborhood}, Nova Iguaçu
        </p>

        <div className="mt-3 flex items-center gap-3 border-t border-foreground/5 pt-3">
          <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
            <Bed className="h-3.5 w-3.5" /> {beds}
          </span>
          <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
            <Bath className="h-3.5 w-3.5" /> {baths}
          </span>
          {parking !== undefined && (
            <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
              <Car className="h-3.5 w-3.5" /> {parking}
            </span>
          )}
          <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
            <Maximize className="h-3.5 w-3.5" /> {area}m²
          </span>
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-foreground py-2.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-foreground/90"
        >
          Ver Detalhes
          <ArrowRight className="h-3.5 w-3.5" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PropertyCardFull;
