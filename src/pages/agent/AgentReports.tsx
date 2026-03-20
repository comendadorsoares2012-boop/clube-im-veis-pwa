import { motion } from "framer-motion";
import { BarChart3, Eye, MapPin } from "lucide-react";
import DashboardShell from "@/components/dashboard/DashboardShell";

// Simple bar chart component (no dependency needed)
const SimpleBar = ({ label, value, max, color }: { label: string; value: number; max: number; color: string }) => (
  <div className="flex items-center gap-3">
    <span className="w-20 shrink-0 truncate text-xs text-muted-foreground">{label}</span>
    <div className="relative h-6 flex-1 overflow-hidden rounded-lg bg-muted">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${(value / max) * 100}%` }}
        transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
        className={`absolute inset-y-0 left-0 rounded-lg ${color}`}
      />
      <span className="relative z-10 flex h-full items-center pl-2 text-xs font-bold text-foreground">
        {value}
      </span>
    </div>
  </div>
);

const leadsPerMonth = [
  { label: "Out", value: 18 },
  { label: "Nov", value: 24 },
  { label: "Dez", value: 31 },
  { label: "Jan", value: 22 },
  { label: "Fev", value: 35 },
  { label: "Mar", value: 42 },
];

const mostViewedProperties = [
  { label: "Rua das Palmeiras", value: 342 },
  { label: "Av. Abílio Távora", value: 287 },
  { label: "Rua Marechal Floriano", value: 219 },
  { label: "Rua Bernardino", value: 185 },
  { label: "Rua Getúlio Vargas", value: 156 },
];

const bestNeighborhoods = [
  { label: "Centro", value: 89 },
  { label: "Califórnia", value: 67 },
  { label: "Miguel Couto", value: 52 },
  { label: "Comendador Soares", value: 41 },
  { label: "Austin", value: 33 },
];

const AgentReports = () => {
  const maxLeads = Math.max(...leadsPerMonth.map((l) => l.value));
  const maxViews = Math.max(...mostViewedProperties.map((p) => p.value));
  const maxNeighborhood = Math.max(...bestNeighborhoods.map((n) => n.value));

  return (
<<<<<<< HEAD
    <DashboardShell title="Relatórios" variant="owner">
=======
    <DashboardShell title="Relatórios" variant="agent">
>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Leads per month */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-border bg-card p-5 shadow-card"
        >
          <div className="mb-4 flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-bold tracking-display">Leads por Mês</h2>
          </div>
          <div className="space-y-2.5">
            {leadsPerMonth.map((item) => (
              <SimpleBar
                key={item.label}
                label={item.label}
                value={item.value}
                max={maxLeads}
                color="bg-primary"
              />
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Most viewed */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-border bg-card p-5 shadow-card"
          >
            <div className="mb-4 flex items-center gap-2">
              <Eye className="h-4 w-4 text-blue-500" />
              <h2 className="text-sm font-bold tracking-display">Imóveis Mais Vistos</h2>
            </div>
            <div className="space-y-2.5">
              {mostViewedProperties.map((item) => (
                <SimpleBar
                  key={item.label}
                  label={item.label}
                  value={item.value}
                  max={maxViews}
                  color="bg-blue-500"
                />
              ))}
            </div>
          </motion.div>

          {/* Best neighborhoods */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-2xl border border-border bg-card p-5 shadow-card"
          >
            <div className="mb-4 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-emerald-500" />
              <h2 className="text-sm font-bold tracking-display">Melhores Bairros</h2>
            </div>
            <div className="space-y-2.5">
              {bestNeighborhoods.map((item) => (
                <SimpleBar
                  key={item.label}
                  label={item.label}
                  value={item.value}
                  max={maxNeighborhood}
                  color="bg-emerald-500"
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardShell>
  );
};

export default AgentReports;
