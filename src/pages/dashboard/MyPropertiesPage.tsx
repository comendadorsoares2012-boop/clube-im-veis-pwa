import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Pencil,
  Trash2,
  Users,
  RotateCcw,
  Plus,
  AlertTriangle,
  Crown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
<<<<<<< HEAD
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
=======
>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3

import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";

<<<<<<< HEAD
const statusConfig: Record<string, { label: string; classes: string }> = {
  free: {
    label: "Grátis",
=======
type PropertyStatus = "free_trial" | "active" | "premium" | "expired";

interface OwnerProperty {
  id: string;
  image: string;
  price: string;
  neighborhood: string;
  address: string;
  status: PropertyStatus;
  views: number;
  leads: number;
}

const statusConfig: Record<PropertyStatus, { label: string; classes: string }> = {
  free_trial: {
    label: "Teste Grátis",
>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3
    classes: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  },
  active: {
    label: "Ativo",
    classes: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  },
  premium: {
    label: "Premium",
    classes: "bg-primary/10 text-primary border-primary/20",
  },
  expired: {
    label: "Expirado",
    classes: "bg-destructive/10 text-destructive border-destructive/20",
  },
};

<<<<<<< HEAD
interface PropertyImage {
  image_url: string;
}

interface OwnerProperty {
  id: string;
  title: string;
  price: number;
  neighborhood: string;
  status: string;
  property_images: PropertyImage[];
}

const MyPropertiesPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [properties, setProperties] = useState<OwnerProperty[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from("properties")
        .select(`
          id, title, price, neighborhood, status,
          property_images (image_url)
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProperties(data || []);
    } catch (error: any) {
      toast.error("Erro ao carregar seus imóveis.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [user]);

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("properties").delete().eq("id", id);
      if (error) throw error;
      setProperties((prev) => prev.filter((p) => p.id !== id));
      toast.success("Imóvel removido com sucesso.");
    } catch (error: any) {
      toast.error("Erro ao remover imóvel.");
    }
  };

  const handleReactivate = async (id: string) => {
    try {
      const { error } = await supabase
        .from("properties")
        .update({ status: "active" })
        .eq("id", id);
      
      if (error) throw error;
      setProperties((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: "active" } : p))
      );
      toast.success("Imóvel reativado com sucesso!");
    } catch (error: any) {
      toast.error("Erro ao reativar imóvel.");
    }
=======
const mockProperties: OwnerProperty[] = [
  { id: "1", image: property1, price: "850.000", neighborhood: "Centro", address: "Rua das Palmeiras, 120", status: "premium", views: 342, leads: 12 },
  { id: "2", image: property2, price: "2.800", neighborhood: "Miguel Couto", address: "Av. Gov. Amaral Peixoto, 45", status: "active", views: 189, leads: 5 },
  { id: "3", image: property3, price: "1.200.000", neighborhood: "Califórnia", address: "Rua Marechal Floriano, 300", status: "free_trial", views: 67, leads: 2 },
  { id: "4", image: property4, price: "680.000", neighborhood: "Comendador Soares", address: "Rua Bernardino de Melo, 200", status: "expired", views: 510, leads: 18 },
];

const MyPropertiesPage = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState(mockProperties);

  const handleDelete = (id: string) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
    toast.success("Imóvel removido com sucesso.");
  };

  const handleReactivate = (id: string) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "active" as PropertyStatus } : p))
    );
    toast.success("Imóvel reativado com sucesso!");
>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3
  };

  const expiredCount = properties.filter((p) => p.status === "expired").length;

  return (
    <DashboardShell title="Meus Imóveis" variant="owner">
      <div className="mx-auto max-w-5xl space-y-5">
        {/* Expired notification */}
        {expiredCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3 rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3"
          >
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
            <div>
              <p className="text-sm font-semibold text-foreground">
                {expiredCount} {expiredCount === 1 ? "imóvel expirado" : "imóveis expirados"}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Seu anúncio expirou. Reative para continuar recebendo interessados.
              </p>
            </div>
          </motion.div>
        )}

        {/* Publish CTA */}
        <Button
          onClick={() => navigate("/anunciar")}
          className="w-full rounded-2xl py-6 text-base font-bold shadow-lg"
        >
          <Plus className="mr-2 h-5 w-5" />
          Publicar Novo Imóvel
        </Button>

        {/* Property cards */}
<<<<<<< HEAD
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {properties.map((prop, i) => {
                const status = statusConfig[prop.status] || statusConfig.active;
                const coverImage = prop.property_images?.[0]?.image_url || "/placeholder.svg";
                return (
                  <motion.div
                    key={prop.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.04 }}
                    className={`group overflow-hidden rounded-2xl border bg-card shadow-card ${
                      prop.status === "expired" ? "border-destructive/20" : "border-border"
                    }`}
                  >
                    {/* Image */}
                    <div className="relative aspect-[16/9] overflow-hidden bg-secondary">
                      <img
                        src={coverImage}
                        alt={prop.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      {/* Status badge */}
                      <span
                        className={`absolute left-3 top-3 flex items-center gap-1 rounded-lg border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${status.classes}`}
                      >
                        {prop.status === "premium" && <Crown className="h-3 w-3" />}
                        {status.label}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <div className="flex items-baseline gap-1">
                        <span className="text-xs font-medium text-primary">R$</span>
                        <span className="text-xl font-bold tabular-nums tracking-display text-primary">
                          {prop.price.toLocaleString("pt-BR")}
                        </span>
                      </div>
                      <p className="mt-1 text-sm font-medium text-foreground">{prop.title}</p>
                      <p className="text-xs text-muted-foreground">{prop.neighborhood}, Nova Iguaçu</p>
=======
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {properties.map((prop, i) => {
              const status = statusConfig[prop.status];
              return (
                <motion.div
                  key={prop.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.04 }}
                  className={`group overflow-hidden rounded-2xl border bg-card shadow-card ${
                    prop.status === "expired" ? "border-destructive/20" : "border-border"
                  }`}
                >
                  {/* Image */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-secondary">
                    <img
                      src={prop.image}
                      alt={prop.address}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Status badge */}
                    <span
                      className={`absolute left-3 top-3 flex items-center gap-1 rounded-lg border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${status.classes}`}
                    >
                      {prop.status === "premium" && <Crown className="h-3 w-3" />}
                      {status.label}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xs font-medium text-primary">R$</span>
                      <span className="text-xl font-bold tabular-nums tracking-display text-primary">
                        {prop.price}
                      </span>
                    </div>
                    <p className="mt-1 text-sm font-medium text-foreground">{prop.address}</p>
                    <p className="text-xs text-muted-foreground">{prop.neighborhood}, Nova Iguaçu</p>

                    {/* Mini stats */}
                    <div className="mt-3 flex gap-4 border-t border-border pt-3">
                      <span className="text-xs text-muted-foreground">
                        <span className="font-semibold text-foreground">{prop.views}</span> visualizações
                      </span>
                      <span className="text-xs text-muted-foreground">
                        <span className="font-semibold text-foreground">{prop.leads}</span> interessados
                      </span>
>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3
                    </div>

                    {/* Actions */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 rounded-lg text-xs"
                        onClick={() => toast.info("Editar em breve.")}
                      >
                        <Pencil className="mr-1 h-3 w-3" />
                        Editar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 rounded-lg text-xs"
                        onClick={() => navigate(`/dashboard/leads`)}
                      >
                        <Users className="mr-1 h-3 w-3" />
                        Leads
                      </Button>
                      {prop.status === "expired" ? (
                        <Button
                          size="sm"
                          className="flex-1 rounded-lg text-xs"
                          onClick={() => handleReactivate(prop.id)}
                        >
                          <RotateCcw className="mr-1 h-3 w-3" />
                          Reativar
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-lg text-xs text-destructive hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => handleDelete(prop.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
<<<<<<< HEAD
                  </motion.div>
              );
            })}
          </AnimatePresence>
          </div>
        )}
=======
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3
      </div>
    </DashboardShell>
  );
};

export default MyPropertiesPage;
