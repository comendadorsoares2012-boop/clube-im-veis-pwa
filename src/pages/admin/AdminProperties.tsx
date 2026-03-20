import { useState, useEffect } from "react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AdminProperty {
  id: string;
  title: string;
  type: string;
  status: string;
  users: {
    name: string;
  };
}

export default function AdminProperties() {
  const [properties, setProperties] = useState<AdminProperty[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase
        .from("properties")
        .select(`
          id, title, type, status,
          users (name)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProperties(data as any || []);
    } catch (error: any) {
      toast.error("Erro ao carregar imóveis.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("properties")
        .update({ status: newStatus as any })
        .eq("id", id);
      
      if (error) throw error;
      setProperties((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
      );
      toast.success(`Status atualizado para ${newStatus}.`);
    } catch (error: any) {
      toast.error("Erro ao atualizar status.");
    }
  };

  return (
    <DashboardShell title="Gerenciamento de Imóveis" variant="admin">
      <div className="rounded-md border bg-card">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground animate-pulse">Carregando imóveis...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Dono</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {properties.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">Nenhum imóvel cadastrado.</TableCell>
                </TableRow>
              ) : (
                properties.map((property) => (
                  <TableRow key={property.id}>
                    <TableCell className="font-medium">{property.title}</TableCell>
                    <TableCell>{property.users?.name || "N/A"}</TableCell>
                    <TableCell className="capitalize">{property.type === 'sale' ? 'Venda' : 'Aluguel'}</TableCell>
                    <TableCell>
                      <Badge variant={property.status === "active" ? "default" : property.status === "premium" ? "secondary" : "outline"}>
                        {property.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleUpdateStatus(property.id, property.status === "active" ? "expired" : "active")}
                      >
                        {property.status === "active" ? "Desativar" : "Ativar"}
                      </Button>
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => handleUpdateStatus(property.id, "premium")}
                        disabled={property.status === "premium"}
                      >
                        Destaque
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
