import { motion } from "framer-motion";
import {
  Building2,
  CheckCircle2,
  Clock,
  Eye,
  Users,
  Plus,
  AlertTriangle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Total de Imóveis", value: "12", icon: Building2, color: "text-foreground" },
  { label: "Imóveis Ativos", value: "8", icon: CheckCircle2, color: "text-emerald-500" },
  { label: "Expirados", value: "3", icon: Clock, color: "text-destructive" },
  { label: "Visualizações", value: "1.847", icon: Eye, color: "text-primary" },
  { label: "Interessados", value: "34", icon: Users, color: "text-blue-500" },
];

const DashboardOverview = () => {
  const navigate = useNavigate();
  const hasExpired = true; // mock

  return (
    <DashboardShell title="Dashboard" variant="owner">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Expired banner */}
        {hasExpired && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3 rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3"
          >
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
            <div>
              <p className="text-sm font-semibold text-foreground">
                Imóveis expirados
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Seu anúncio expirou. Reative para continuar recebendo interessados.
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => navigate("/dashboard/imoveis")}
              className="ml-auto shrink-0 rounded-lg border-destructive/30 text-xs text-destructive hover:bg-destructive/10"
            >
              Ver imóveis
            </Button>
          </motion.div>
        )}

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-border bg-card p-4 shadow-card"
              >
                <div className="flex items-center gap-2">
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
                <p className="mt-2 text-2xl font-bold tabular-nums tracking-display text-foreground">
                  {stat.value}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <Button
          onClick={() => navigate("/anunciar")}
          className="w-full rounded-2xl py-6 text-base font-bold shadow-lg"
        >
          <Plus className="mr-2 h-5 w-5" />
          Publicar Novo Imóvel
        </Button>
      </div>
    </DashboardShell>
  );
};

export default DashboardOverview;
