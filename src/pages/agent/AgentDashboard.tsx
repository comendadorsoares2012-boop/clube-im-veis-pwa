import { motion } from "framer-motion";
import {
  Building2,
  CheckCircle2,
  Clock,
  Users,
  TrendingUp,
  Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Total de Imóveis", value: "47", icon: Building2, color: "text-foreground" },
  { label: "Anúncios Ativos", value: "38", icon: CheckCircle2, color: "text-emerald-500" },
  { label: "Expirados", value: "5", icon: Clock, color: "text-destructive" },
  { label: "Leads Recebidos", value: "214", icon: Users, color: "text-primary" },
  { label: "Taxa de Conversão", value: "12%", icon: TrendingUp, color: "text-blue-500" },
];

const AgentDashboard = () => {
  const navigate = useNavigate();

  return (
<<<<<<< HEAD
    <DashboardShell title="Dashboard" variant="owner">
=======
    <DashboardShell title="Dashboard" variant="agent">
>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Stats */}
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

export default AgentDashboard;
