import { Search } from "lucide-react";
import { motion } from "framer-motion";

const SearchTrigger = () => {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className="w-full flex items-center gap-3 rounded-2xl bg-secondary px-5 py-4 shadow-card transition-shadow hover:shadow-card-hover"
    >
      <Search className="h-5 w-5 text-muted-foreground shrink-0" />
      <span className="text-sm text-muted-foreground text-left">
        Onde em Nova Iguaçu você quer morar?
      </span>
    </motion.button>
  );
};

export default SearchTrigger;
