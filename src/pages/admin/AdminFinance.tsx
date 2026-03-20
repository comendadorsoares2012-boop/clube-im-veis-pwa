import { useState, useEffect } from "react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface DBPayment {
  id: string;
  amount: number;
  type: string;
  status: string;
  created_at: string;
  users: {
    name: string;
  };
}

export default function AdminFinance() {
  const [payments, setPayments] = useState<DBPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from("payments")
        .select(`
          *,
          users(name)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPayments(data as any || []);
      
      const total = (data || []).reduce((acc: number, curr: any) => acc + (curr.status === 'completed' ? curr.amount : 0), 0);
      setTotalRevenue(total);
    } catch (error: any) {
      toast.error("Erro ao carregar dados financeiros.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DashboardShell title="Painel Financeiro" variant="admin">
      <div className="grid gap-4 md:grid-cols-2 mb-6">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Receita Total Acumulada</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              R$ {totalRevenue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">Valor total de pagamentos concluídos</p>
          </CardContent>
        </Card>
        <Card className="bg-orange-500/5 border-orange-500/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pagamentos Falhos</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {payments.filter(p => p.status === 'failed').length} transações
            </div>
            <p className="text-xs text-muted-foreground">Tentativas que não foram concluídas</p>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-md border bg-card overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground animate-pulse">Carregando transações...</div>
        ) : (
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Usuário</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">Nenhuma transação registrada.</TableCell>
                </TableRow>
              ) : (
                payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.users?.name || "N/A"}</TableCell>
                    <TableCell>R$ {payment.amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</TableCell>
                    <TableCell className="capitalize">
                      <Badge variant="outline">{payment.type}</Badge>
                    </TableCell>
                    <TableCell>{new Date(payment.created_at).toLocaleDateString("pt-BR")}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant={payment.status === "completed" ? "default" : "destructive"}>
                        {payment.status === "completed" ? "Concluído" : "Falhou"}
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
