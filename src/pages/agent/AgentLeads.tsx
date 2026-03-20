import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Unlock, Phone, Calendar, Building2 } from "lucide-react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Lead {
  id: string;
  name: string;
  phone: string;
  property: string;
  date: string;
  unlocked: boolean;
}

const mockLeads: Lead[] = [
  { id: "1", name: "João Silva", phone: "(21) 99876-5432", property: "Rua das Palmeiras, 120", date: "15/03/2026", unlocked: true },
  { id: "2", name: "Maria Santos", phone: "(21) 98765-4321", property: "Av. Gov. Amaral Peixoto, 45", date: "14/03/2026", unlocked: false },
  { id: "3", name: "Carlos Oliveira", phone: "(21) 97654-3210", property: "Rua Marechal Floriano, 300", date: "13/03/2026", unlocked: false },
  { id: "4", name: "Ana Rodrigues", phone: "(21) 96543-2109", property: "Rua das Palmeiras, 120", date: "12/03/2026", unlocked: true },
  { id: "5", name: "Pedro Mendes", phone: "(21) 95432-1098", property: "Rua Bernardino de Melo, 200", date: "11/03/2026", unlocked: false },
  { id: "6", name: "Luciana Costa", phone: "(21) 94321-0987", property: "Av. Abílio Augusto Távora, 500", date: "10/03/2026", unlocked: false },
  { id: "7", name: "Fernando Lima", phone: "(21) 93210-9876", property: "Rua Getúlio Vargas, 88", date: "09/03/2026", unlocked: true },
  { id: "8", name: "Beatriz Almeida", phone: "(21) 92109-8765", property: "Av. Gov. Amaral Peixoto, 45", date: "08/03/2026", unlocked: false },
];

const isPremium = false; // mock — set true to auto-unlock

const AgentLeads = () => {
  const [leads, setLeads] = useState(mockLeads);

  const handleUnlock = (id: string) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, unlocked: true } : l))
    );
    toast.success("Lead desbloqueado com sucesso!");
  };

  const maskPhone = (phone: string) =>
    phone.replace(/(\(\d{2}\) \d)\d{4}/, "$1****");

  return (
    <DashboardShell title="Leads" variant="owner">
      <div className="mx-auto max-w-5xl space-y-5">
        {/* Info banner */}
        {!isPremium && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3"
          >
            <Lock className="h-5 w-5 shrink-0 text-primary" />
            <p className="text-sm text-foreground">
              No plano <span className="font-bold text-primary">Premium</span>, todos os contatos são desbloqueados automaticamente.
            </p>
          </motion.div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Total de Leads</p>
            <p className="mt-1 text-2xl font-bold tabular-nums tracking-display">{leads.length}</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Desbloqueados</p>
            <p className="mt-1 text-2xl font-bold tabular-nums tracking-display text-emerald-500">{leads.filter((l) => l.unlocked || isPremium).length}</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Bloqueados</p>
            <p className="mt-1 text-2xl font-bold tabular-nums tracking-display text-destructive">{isPremium ? 0 : leads.filter((l) => !l.unlocked).length}</p>
          </div>
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-hidden rounded-2xl border border-border bg-card shadow-card sm:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Nome</th>
                <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Telefone</th>
                <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Imóvel</th>
                <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Data</th>
                <th className="px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Ação</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => {
                const unlocked = lead.unlocked || isPremium;
                return (
                  <tr key={lead.id} className="border-b border-border last:border-0 transition-colors hover:bg-muted/30">
                    <td className="px-4 py-3 text-sm font-medium text-foreground">{lead.name}</td>
                    <td className="px-4 py-3 text-sm">
                      {unlocked ? (
                        <span className="flex items-center gap-1.5 text-foreground">
                          <Phone className="h-3.5 w-3.5 text-emerald-500" />
                          {lead.phone}
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-muted-foreground">
                          <Lock className="h-3.5 w-3.5" />
                          {maskPhone(lead.phone)}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Building2 className="h-3.5 w-3.5" />
                        {lead.property}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {lead.date}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {!unlocked ? (
                        <Button size="sm" className="rounded-lg text-xs" onClick={() => handleUnlock(lead.id)}>
                          <Unlock className="mr-1 h-3 w-3" /> Desbloquear
                        </Button>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold uppercase text-emerald-600">
                          Desbloqueado
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="space-y-3 sm:hidden">
          {leads.map((lead) => {
            const unlocked = lead.unlocked || isPremium;
            return (
              <div key={lead.id} className="rounded-2xl border border-border bg-card p-4 shadow-card">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{lead.name}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{lead.property}</p>
                  </div>
                  <span className="text-[10px] text-muted-foreground">{lead.date}</span>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                  {unlocked ? (
                    <span className="flex items-center gap-1.5 text-sm text-foreground">
                      <Phone className="h-3.5 w-3.5 text-emerald-500" />
                      {lead.phone}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Lock className="h-3.5 w-3.5" />
                      {maskPhone(lead.phone)}
                    </span>
                  )}
                  {!unlocked && (
                    <Button size="sm" className="rounded-lg text-xs" onClick={() => handleUnlock(lead.id)}>
                      <Unlock className="mr-1 h-3 w-3" /> Desbloquear
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardShell>
  );
};

export default AgentLeads;
