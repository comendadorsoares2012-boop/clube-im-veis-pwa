import { useState, useEffect } from "react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Users2, BarChart3 } from "lucide-react";

interface DBLead {
  id: string;
  status: string;
  created_at: string;
  properties: { title: string };
  owners: { name: string };
  interested_users: { name: string };
}

export default function AdminLeads() {
  const [leads, setLeads] = useState<DBLead[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    try {
      const { data, error } = await supabase
        .from("leads")
        .select(`
          id, status, created_at,
          properties (title),
          owners:users!leads_owner_id_fkey (name),
          interested_users:users!leads_interested_user_id_fkey (name)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setLeads(data as any || []);
    } catch (error) {
      toast.error("Erro ao carregar visão geral de leads.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <DashboardShell title="Visão Geral de Leads (Global)" variant="admin">
      <div className="grid gap-4 md:grid-cols-2 mb-6">
        <div className="rounded-xl border bg-card p-5 shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Users2 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total de Conversões</p>
            <p className="text-2xl font-bold">{leads.length}</p>
          </div>
        </div>
        <div className="rounded-xl border bg-card p-5 shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
            <BarChart3 className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Status Liberado</p>
            <p className="text-2xl font-bold">{leads.filter(l => l.status === 'unlocked').length}</p>
          </div>
        </div>
      </div>

      <div className="rounded-md border bg-card overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-muted-foreground animate-pulse font-medium">Carregando mapa de leads...</div>
        ) : (
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Imóvel</TableHead>
                <TableHead>Proprietário</TableHead>
                <TableHead>Interessado</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground italic">Nenhuma atividade de leads detectada no momento.</TableCell>
                </TableRow>
              ) : (
                leads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell className="font-medium">{lead.properties?.title}</TableCell>
                    <TableCell>{lead.owners?.name}</TableCell>
                    <TableCell>{lead.interested_users?.name}</TableCell>
                    <TableCell className="text-xs">{new Date(lead.created_at).toLocaleDateString("pt-BR")}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant={lead.status === "unlocked" ? "default" : "outline"} className="capitalize">
                        {lead.status === "unlocked" ? "Liberado" : "Bloqueado"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </DashboardShell>
  );
}
