import { useState, useEffect } from "react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Save, User as UserIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export default function DashboardProfilePage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setRole(user.role || "");
    }
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { error } = await supabase
        .from("users")
        .update({
          name,
          phone,
        })
        .eq("id", user.id);

      if (error) throw error;
      toast.success("Perfil atualizado com sucesso!");
    } catch (error: any) {
      toast.error("Erro ao atualizar perfil: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardShell title="Meu Perfil" variant="owner">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-sm border-none bg-card/60 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="relative mx-auto w-24 h-24 mb-4">
              <Avatar className="w-full h-full border-4 border-background shadow-xl">
                <AvatarFallback className="text-2xl bg-primary/10 text-primary font-bold">
                  {name ? name.substring(0, 2).toUpperCase() : <UserIcon />}
                </AvatarFallback>
              </Avatar>
              <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 rounded-full h-8 w-8 shadow-md">
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <CardTitle className="text-xl">{name}</CardTitle>
            <CardDescription className="capitalize">Conta {role}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Seu nome"
                className="bg-background/50"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">E-mail</Label>
              <Input 
                id="email" 
                value={email} 
                disabled 
                className="bg-muted/50 cursor-not-allowed"
              />
              <p className="text-[10px] text-muted-foreground italic">O e-mail não pode ser alterado por segurança.</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">WhatsApp / Telefone</Label>
              <Input 
                id="phone" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                placeholder="(21) 99999-9999"
                className="bg-background/50"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end pt-2">
            <Button onClick={handleSave} disabled={loading} className="gap-2">
              <Save className="h-4 w-4" />
              {loading ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardShell>
  );
}
