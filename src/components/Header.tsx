<<<<<<< HEAD
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LogIn, LogOut, Home, Search, PlusCircle, Heart, User } from "lucide-react";
import { motion } from "framer-motion";

import logo from "@/assets/logo.png";

const navItems = [
  { icon: Home, label: "Início", path: "/" },
  { icon: Search, label: "Buscar", path: "/buscar" },
  { icon: PlusCircle, label: "Anunciar", path: "/anunciar" },
  { icon: Heart, label: "Favoritos", path: "/favoritos" },
  { icon: User, label: "Perfil", path: "/perfil" },
];

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-foreground/5 bg-background/90 backdrop-blur-md shadow-sm transition-all duration-300">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button onClick={() => navigate("/")} className="flex items-center gap-2 group">
          <img 
            src={logo} 
            alt="Clube Aqui Tem Imóveis" 
            className="h-9 w-9 object-contain transition-transform group-hover:scale-105" 
          />
          <span className="hidden sm:block text-sm font-bold tracking-display bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Clube Aqui Tem Imóveis
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 px-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`relative flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="header-active"
                    className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden text-xs font-semibold text-muted-foreground lg:block border-l pl-4 ml-1">
            Nova Iguaçu, RJ
          </span>
          {user ? (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={signOut}
              className="flex h-9 items-center gap-2 rounded-xl bg-secondary px-3 text-xs font-semibold text-muted-foreground transition-all hover:bg-destructive/10 hover:text-destructive active:scale-95"
              title="Sair"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Sair</span>
            </motion.button>
          ) : (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate("/login")}
              className="flex h-9 items-center gap-1.5 rounded-xl bg-primary px-4 text-xs font-bold text-primary-foreground shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-all"
            >
              <LogIn className="h-3.5 w-3.5" />
              Entrar
            </motion.button>
          )}
        </div>
=======
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
>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3
      </div>
    </header>
  );
};

export default Header;
