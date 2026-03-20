import { useState, useEffect } from "react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface DBPlan {
  id: string;
  name: string;
  price: number;
  type: string;
  duration_days: number;
  created_at: string;
}

export default function AdminPlans() {
  const [plans, setPlans] = useState<DBPlan[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPlans = async () => {
    try {
      const { data, error } = await supabase
        .from("plans")
        .select("*")
        .order("price", { ascending: true });

      if (error) throw error;
      setPlans(data || []);
    } catch (error: any) {
      toast.error("Erro ao carregar planos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleDeletePlan = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este plano?")) return;
    try {
      const { error } = await supabase.from("plans").delete().eq("id", id);
      if (error) throw error;
      setPlans(prev => prev.filter(p => p.id !== id));
      toast.success("Plano removido.");
    } catch (error: any) {
      toast.error("Erro ao remover plano.");
    }
  };

  return (
    <DashboardShell title="Gerenciamento de Planos" variant="admin">
      <div className="mb-4">
        <Button onClick={() => toast.info("Funcionalidade de criação em desenvolvimento.")}>
          Criar Novo Plano
        </Button>
      </div>
      
      <div className="rounded-md border bg-card">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground animate-pulse">Carregando planos...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome do Plano</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Duração (dias)</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {plans.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">Nenhum plano disponível.</TableCell>
                </TableRow>
              ) : (
                plans.map((plan) => (
                  <TableRow key={plan.id}>
                    <TableCell className="font-medium">{plan.name}</TableCell>
                    <TableCell className="capitalize">
                      <Badge variant="outline">{plan.type}</Badge>
                    </TableCell>
                    <TableCell>{plan.duration_days} dias</TableCell>
                    <TableCell>R$ {plan.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="sm" onClick={() => toast.info("Edição em desenvolvimento.")}>
                        Editar
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDeletePlan(plan.id)}>
                        Excluir
                      </Button>
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
