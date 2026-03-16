import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import PropertyCardFull from "@/components/PropertyCardFull";
import { useFavoritesContext } from "@/contexts/FavoritesContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";
import property5 from "@/assets/property-5.jpg";
import property6 from "@/assets/property-6.jpg";

// Mock property data map (later replaced by DB)
const propertyMap: Record<string, any> = {
  "1": { image: property1, type: "Venda", propertyType: "Casa", price: "850.000", address: "Rua das Palmeiras, 120", neighborhood: "Centro", beds: 4, baths: 3, area: 220 },
  "2": { image: property2, type: "Aluguel", propertyType: "Apartamento", price: "2.800", address: "Av. Gov. Amaral Peixoto, 45", neighborhood: "Miguel Couto", beds: 2, baths: 1, area: 75 },
  "3": { image: property3, type: "Venda", propertyType: "Casa", price: "1.200.000", address: "Rua Marechal Floriano, 300", neighborhood: "Califórnia", beds: 5, baths: 4, area: 350 },
  "4": { image: property4, type: "Aluguel", propertyType: "Apartamento", price: "1.500", address: "Rua Silva Jardim, 88", neighborhood: "Jardim Iguaçu", beds: 1, baths: 1, area: 45 },
  "5": { image: property5, type: "Venda", propertyType: "Comercial", price: "3.500.000", address: "Av. Abílio Augusto Távora, 500", neighborhood: "Centro", beds: 0, baths: 2, area: 600 },
  "6": { image: property6, type: "Venda", propertyType: "Casa", price: "680.000", address: "Rua Bernardino de Melo, 200", neighborhood: "Comendador Soares", beds: 3, baths: 2, area: 180 },
};

const FavoritosPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { favoriteIds, toggleFavorite, isFavorite, loading } = useFavoritesContext();

  if (!user) {
    return (
      <div className="min-h-svh bg-background">
        <Header />
        <main className="flex flex-col items-center justify-center gap-4 px-6 pb-24 pt-32 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
            <Heart className="h-7 w-7 text-muted-foreground" />
          </div>
          <h1 className="text-xl font-bold tracking-display">Meus Favoritos</h1>
          <p className="text-sm text-muted-foreground">
            Faça login para salvar seus imóveis favoritos.
          </p>
          <Button onClick={() => navigate("/login")} className="mt-2 rounded-xl">
            Entrar
          </Button>
        </main>
        <BottomNav />
      </div>
    );
  }

  const favoriteProperties = Array.from(favoriteIds)
    .map((id) => (propertyMap[id] ? { id, ...propertyMap[id] } : null))
    .filter(Boolean);

  return (
    <div className="min-h-svh bg-background pb-24">
      <Header />
      <main className="mx-auto max-w-5xl px-4 pt-20">
        <h1 className="mb-6 text-xl font-bold tracking-display">
          Meus Favoritos
          {favoriteProperties.length > 0 && (
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              ({favoriteProperties.length})
            </span>
          )}
        </h1>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : favoriteProperties.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-20 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
              <Heart className="h-7 w-7 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              Você ainda não salvou nenhum imóvel.
            </p>
            <Button variant="outline" onClick={() => navigate("/buscar")} className="mt-2 rounded-xl">
              Explorar Imóveis
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {favoriteProperties.map((prop: any) => (
                <motion.div
                  key={prop.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <PropertyCardFull
                    id={prop.id}
                    image={prop.image}
                    type={prop.type}
                    propertyType={prop.propertyType}
                    price={prop.price}
                    address={prop.address}
                    neighborhood={prop.neighborhood}
                    beds={prop.beds}
                    baths={prop.baths}
                    area={prop.area}
                    liked={true}
                    onFavoriteToggle={() => toggleFavorite(prop.id)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  );
};

export default FavoritosPage;
