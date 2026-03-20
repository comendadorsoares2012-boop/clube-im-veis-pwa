import { motion } from "framer-motion";
import { Users, Building2, CheckCircle2, AlertTriangle, DollarSign, Activity } from "lucide-react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboard() {
  const stats = [
    { title: "Total de Usuários", value: "150", icon: Users },
    { title: "Total de Imóveis", value: "48", icon: Building2 },
    { title: "Imóveis Ativos", value: "32", icon: CheckCircle2 },
    { title: "Expirados", value: "5", icon: AlertTriangle },
    { title: "Total de Leads", value: "1.024", icon: Activity },
    { title: "Receita Mensal", value: "R$ 15.420", icon: DollarSign },
  ];

  return (
    <DashboardShell title="Visão Geral" variant="admin">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </DashboardShell>
  );
}
