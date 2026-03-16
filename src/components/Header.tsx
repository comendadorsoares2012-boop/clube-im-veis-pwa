import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LogIn, LogOut } from "lucide-react";
import { motion } from "framer-motion";

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-foreground/5 bg-background/80 px-4 backdrop-blur-md">
      <button onClick={() => navigate("/")} className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground">
          <span className="text-sm font-bold text-primary">C</span>
        </div>
        <span className="text-sm font-bold tracking-display">
          Clube Imóveis
        </span>
      </button>
      <div className="flex items-center gap-3">
        <span className="hidden text-xs font-medium text-muted-foreground sm:block">
          Nova Iguaçu, RJ
        </span>
        {user ? (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={signOut}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary ring-1 ring-foreground/5"
            title="Sair"
          >
            <LogOut className="h-3.5 w-3.5 text-muted-foreground" />
          </motion.button>
        ) : (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/login")}
            className="flex h-8 items-center gap-1.5 rounded-full bg-primary px-3 text-xs font-semibold text-primary-foreground"
          >
            <LogIn className="h-3.5 w-3.5" />
            Entrar
          </motion.button>
        )}
      </div>
    </header>
  );
};

export default Header;
