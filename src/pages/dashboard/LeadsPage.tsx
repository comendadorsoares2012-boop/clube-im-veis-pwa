import { useState, useEffect } from "react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, User, Home, Lock, Unlock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

interface Lead {
  id: string;
  status: "locked" | "unlocked";
  created_at: string;
  properties: {
    title: string;
    id: string;
  };
  interested_users: {
    name: string;
    email: string;
    phone: string;
  };
}

export default function LeadsPage() {
  const { user } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from("leads")
        .select(`
          *,
          properties (title, id),
          interested_users:users!leads_interested_user_id_fkey (name, email, phone)
        `)
        .eq("owner_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setLeads(data as any || []);
    } catch (error: any) {
      toast.error("Erro ao carregar interessados.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [user]);

  const handleUnlockLead = async (leadId: string) => {
    try {
      const { error } = await supabase
        .from("leads")
        .update({ status: "unlocked" })
        .eq("id", leadId);

      if (error) throw error;
      setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: "unlocked" } : l));
      toast.success("Lead liberado com sucesso!");
    } catch (error: any) {
      toast.error("Erro ao liberar lead.");
    }
  };

  return (
    <DashboardShell title="Interessados nos seus Imóveis" variant="owner">
      <div className="rounded-md border bg-card overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground animate-pulse">Carregando interessados...</div>
        ) : (
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Imóvel</TableHead>
                <TableHead>Interessado</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="text-right">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                    <div className="flex flex-col items-center gap-2">
                      <User className="h-8 w-8 opacity-20" />
                      <p>Nenhum interessado ainda.</p>
                      <p className="text-xs">Assim que alguém clicar em seu anúncio, ele aparecerá aqui.</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                leads.map((lead) => (
                  <TableRow key={lead.id} className="group">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Home className="h-3 w-3 text-muted-foreground" />
                        <span className="truncate max-w-[150px]">{lead.properties?.title}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold">{lead.interested_users?.name}</span>
                    </TableCell>
                    <TableCell>
                      {lead.status === "unlocked" ? (
                        <div className="flex flex-col gap-1 text-xs">
                          <div className="flex items-center gap-1.5">
                            <Phone className="h-3 w-3 text-primary" />
                            <span>{lead.interested_users?.phone || "Não informado"}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Mail className="h-3 w-3 text-primary" />
                            <span>{lead.interested_users?.email}</span>
                          </div>
                        </div>
                      ) : (
                        <Badge variant="outline" className="gap-1 border-dashed">
                          <Lock className="h-3 w-3" />
                          Bloqueado
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {new Date(lead.created_at).toLocaleDateString("pt-BR")}
                    </TableCell>
                    <TableCell className="text-right">
                      {lead.status === "locked" ? (
                        <Button 
                          size="sm" 
                          variant="secondary"
                          className="gap-2"
                          onClick={() => handleUnlockLead(lead.id)}
                        >
                          <Unlock className="h-3 w-3" />
                          Liberar Contato
                        </Button>
                      ) : (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => window.open(`https://wa.me/55${lead.interested_users?.phone?.replace(/\D/g, "")}`, "_blank")}
                          disabled={!lead.interested_users?.phone}
                        >
                          WhatsApp
                        </Button>
                      )}
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
