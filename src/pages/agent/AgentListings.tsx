import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Pencil,
  Trash2,
  Users,
  RotateCcw,
  Plus,
  Crown,
  Megaphone,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";
import property5 from "@/assets/property-5.jpg";
import property6 from "@/assets/property-6.jpg";

type Status = "free_trial" | "active" | "premium" | "expired";

interface Listing {
  id: string;
  image: string;
  price: string;
  neighborhood: string;
  address: string;
  status: Status;
  leads: number;
}

const statusConfig: Record<Status, { label: string; classes: string }> = {
  free_trial: { label: "Teste Grátis", classes: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
  active: { label: "Ativo", classes: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" },
  premium: { label: "Premium", classes: "bg-primary/10 text-primary border-primary/20" },
  expired: { label: "Expirado", classes: "bg-destructive/10 text-destructive border-destructive/20" },
};

const mockListings: Listing[] = [
  { id: "1", image: property1, price: "850.000", neighborhood: "Centro", address: "Rua das Palmeiras, 120", status: "premium", leads: 18 },
  { id: "2", image: property2, price: "2.800", neighborhood: "Miguel Couto", address: "Av. Gov. Amaral Peixoto, 45", status: "active", leads: 7 },
  { id: "3", image: property3, price: "1.200.000", neighborhood: "Califórnia", address: "Rua Marechal Floriano, 300", status: "active", leads: 12 },
  { id: "4", image: property4, price: "680.000", neighborhood: "Comendador Soares", address: "Rua Bernardino de Melo, 200", status: "expired", leads: 22 },
  { id: "5", image: property5, price: "3.500.000", neighborhood: "Centro", address: "Av. Abílio Augusto Távora, 500", status: "free_trial", leads: 3 },
  { id: "6", image: property6, price: "420.000", neighborhood: "Austin", address: "Rua Getúlio Vargas, 88", status: "active", leads: 9 },
];

const AgentListings = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState(mockListings);

  const handleDelete = (id: string) => {
    setListings((prev) => prev.filter((p) => p.id !== id));
    toast.success("Anúncio removido.");
  };

  const handleReactivate = (id: string) => {
    setListings((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "active" as Status } : p))
    );
    toast.success("Anúncio reativado!");
  };

  const handlePromote = (id: string) => {
    setListings((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "premium" as Status } : p))
    );
    toast.success("Imóvel promovido para Premium!");
  };

  return (
    <DashboardShell title="Meus Anúncios" variant="agent">
      <div className="mx-auto max-w-5xl space-y-5">
        <Button
          onClick={() => navigate("/anunciar")}
          className="w-full rounded-2xl py-6 text-base font-bold shadow-lg"
        >
          <Plus className="mr-2 h-5 w-5" />
          Publicar Novo Imóvel
        </Button>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {listings.map((prop, i) => {
              const st = statusConfig[prop.status];
              return (
                <motion.div
                  key={prop.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.03 }}
                  className={`group overflow-hidden rounded-2xl border bg-card shadow-card ${
                    prop.status === "expired" ? "border-destructive/20" : "border-border"
                  }`}
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-secondary">
                    <img src={prop.image} alt={prop.address} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    <span className={`absolute left-3 top-3 flex items-center gap-1 rounded-lg border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${st.classes}`}>
                      {prop.status === "premium" && <Crown className="h-3 w-3" />}
                      {st.label}
                    </span>
                  </div>

                  <div className="p-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xs font-medium text-primary">R$</span>
                      <span className="text-xl font-bold tabular-nums tracking-display text-primary">{prop.price}</span>
                    </div>
                    <p className="mt-1 truncate text-sm font-medium text-foreground">{prop.address}</p>
                    <p className="text-xs text-muted-foreground">{prop.neighborhood}, Nova Iguaçu</p>

                    <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">
                      <Users className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        <span className="font-semibold text-foreground">{prop.leads}</span> leads
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <Button size="sm" variant="outline" className="flex-1 rounded-lg text-xs" onClick={() => toast.info("Editar em breve.")}>
                        <Pencil className="mr-1 h-3 w-3" /> Editar
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 rounded-lg text-xs" onClick={() => navigate("/agente/leads")}>
                        <Users className="mr-1 h-3 w-3" /> Leads
                      </Button>
                      {prop.status === "expired" ? (
                        <Button size="sm" className="flex-1 rounded-lg text-xs" onClick={() => handleReactivate(prop.id)}>
                          <RotateCcw className="mr-1 h-3 w-3" /> Reativar
                        </Button>
                      ) : prop.status !== "premium" ? (
                        <Button size="sm" variant="outline" className="flex-1 rounded-lg text-xs border-primary/30 text-primary hover:bg-primary/10" onClick={() => handlePromote(prop.id)}>
                          <Megaphone className="mr-1 h-3 w-3" /> Promover
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline" className="rounded-lg text-xs text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={() => handleDelete(prop.id)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </DashboardShell>
  );
};

export default AgentListings;
