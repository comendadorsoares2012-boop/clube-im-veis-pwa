import { motion } from "framer-motion";
import { Heart, UserCircle, Search, Home } from "lucide-react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useFavoritesContext } from "@/contexts/FavoritesContext";

const UserDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { favoriteIds } = useFavoritesContext();

  return (
    <DashboardShell title="Bem-vindo" variant="user">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Banner de Boas-vindas */}
        <section className="relative overflow-hidden rounded-3xl bg-primary p-8 text-primary-foreground shadow-xl">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                Olá, {user?.user_metadata?.name || "Usuário"}! 👋
              </h2>
              <p className="max-w-md text-primary-foreground/80">
                O seu lugar está aqui em Nova Iguaçu. Explore os melhores bairros e salve o que você gostar.
              </p>
            </div>
            <Button 
                variant="secondary" 
                onClick={() => navigate("/buscar")} 
                className="rounded-xl font-bold px-8 h-12"
            >
              Começar a Buscar
            </Button>
          </div>
          <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        </section>

        {/* Atalhos Rápidos */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <motion.button
            whileHover={{ y: -5 }}
            onClick={() => navigate("/dashboard/favoritos")}
            className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-border bg-card p-8 text-center shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-500">
              <Heart className="h-7 w-7" />
            </div>
            <div>
                <h3 className="font-bold text-foreground">Favoritos</h3>
                <p className="text-sm text-muted-foreground">{favoriteIds.size} imóveis salvos</p>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ y: -5 }}
            onClick={() => navigate("/dashboard/perfil")}
            className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-border bg-card p-8 text-center shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500">
              <UserCircle className="h-7 w-7" />
            </div>
            <div>
                <h3 className="font-bold text-foreground">Meu Perfil</h3>
                <p className="text-sm text-muted-foreground">Gerenciar seus dados</p>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ y: -5 }}
            onClick={() => navigate("/")}
            className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-border bg-card p-8 text-center shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500">
              <Home className="h-7 w-7" />
            </div>
            <div>
                <h3 className="font-bold text-foreground">Loja de Imóveis</h3>
                <p className="text-sm text-muted-foreground">Voltar para a vitrine</p>
            </div>
          </motion.button>
        </div>
      </div>
    </DashboardShell>
  );
};

export default UserDashboard;
