import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Zap, ShieldCheck, Loader2, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

interface Plan {
  id: string;
  name: string;
  price: number;
  type: string;
  duration_days: number;
  max_properties: number;
  max_photos: number;
  lead_price: number;
}

interface Subscription {
  id: string;
  plan_id: string;
  status: string;
  end_date: string;
  plans: Plan;
}

export default function UserPlansPage() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const { data: plansData } = await supabase.from("plans").select("*").order("price", { ascending: true });
      setPlans(plansData as Plan[] || []);

      if (user) {
        const { data: subData } = await supabase
          .from("subscriptions")
          .select("*, plans(*)")
          .eq("user_id", user.id)
          .eq("status", "active")
          .maybeSingle();
        
        setSubscription(subData as any);
      }
    } catch (error) {
      console.error("Erro ao carregar planos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Pagamento confirmado! Sua assinatura será ativada em instantes.");
    }
    if (searchParams.get("canceled")) {
      toast.error("O pagamento foi cancelado.");
    }
  }, [searchParams]);

  const handleBuyPlan = async (plan: Plan) => {
    if (!user) {
      toast.error("Você precisa estar logado.");
      return;
    }

    if (plan.price === 0) {
        // Ativar plano gratuito diretamente
        setSubmitting(plan.id);
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + plan.duration_days);

        const { error } = await supabase.from("subscriptions").insert({
            user_id: user.id,
            plan_id: plan.id,
            status: 'active',
            end_date: endDate.toISOString()
        });

        if (error) {
            toast.error("Erro ao ativar plano básico.");
        } else {
            toast.success("Plano básico ativado com sucesso!");
            fetchData();
        }
        setSubmitting(null);
        return;
    }

    setSubmitting(plan.id);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: {
          planId: plan.id,
          planName: plan.name,
          price: plan.price,
          userId: user.id,
          email: user.email
        }
      });

      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("Não foi possível gerar a sessão de checkout.");
      }
    } catch (error: any) {
      console.error("Erro ao criar checkout:", error);
      toast.error("Erro ao processar pagamento com Stripe.");
    } finally {
      setSubmitting(null);
    }
  };

  return (
    <DashboardShell title="Assinatura e Planos" variant="owner">
      {loading ? (
        <div className="flex h-64 items-center justify-center animate-pulse text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin mr-2" />
          Carregando planos...
        </div>
      ) : (
        <div className="space-y-8">
          {subscription ? (
            <Card className="bg-primary/5 border-primary/20 shadow-lg border-2 ring-1 ring-primary/10">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase tracking-widest text-primary/70">Sua Assinatura Atual</p>
                  <CardTitle className="text-2xl font-bold tracking-tight">{subscription.plans.name}</CardTitle>
                </div>
                <Badge variant="default" className="bg-primary hover:bg-primary font-bold px-4 py-1.5 shadow-md">ATIVA</Badge>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-sm text-foreground/80">
                    <ShieldCheck className="h-4 w-4 text-green-500" />
                    <span>Benefícios: <strong>{subscription.plans.max_properties} Imóveis | {subscription.plans.max_photos} Fotos | Leads: {subscription.plans.lead_price > 0 ? `R$ ${subscription.plans.lead_price.toLocaleString("pt-BR")}` : 'GRÁTIS'}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Zap className="h-4 w-4 text-amber-500" />
                    <span>Próxima renovação: <strong>{new Date(subscription.end_date).toLocaleDateString("pt-BR")}</strong></span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-primary to-primary p-8 text-primary-foreground shadow-xl transition-all hover:shadow-2xl">
              <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="space-y-2">
                  <h2 className="text-3xl font-extrabold tracking-tight">Potencialize seus negócios</h2>
                  <p className="max-w-md text-primary-foreground/90 font-medium leading-relaxed">
                    Escolha o plano ideal para destacar seus imóveis e atrair mais leads qualificados em toda a Baixada.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="px-3 py-1 font-bold">PROMOÇÃO ATIVA</Badge>
                </div>
              </div>
              <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card key={plan.id} className={`relative flex flex-col transition-all hover:shadow-xl hover:-translate-y-1 duration-300 ${subscription?.plan_id === plan.id ? 'ring-2 ring-primary border-primary bg-primary/[0.02]' : 'bg-card border-border/60 hover:border-primary/50'}`}>
                {plan.id === 'plan_pro' && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <Badge className="bg-amber-500 text-white font-bold shadow-lg h-7 px-4 border-2 border-white uppercase tracking-wider text-[10px]">MAIS VENDIDO</Badge>
                  </div>
                )}
                {plan.id === 'plan_premium' && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <Badge className="bg-primary text-white font-bold shadow-lg h-7 px-4 border-2 border-white uppercase tracking-wider text-[10px]">PAGINA PRINCIPAL</Badge>
                  </div>
                )}
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-extrabold flex items-center gap-2">
                      {plan.id === 'plan_premium' ? <Crown className="h-5 w-5 text-amber-500" /> : <Zap className="h-5 w-5 text-primary" />}
                      {plan.name}
                    </CardTitle>
                  </div>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold tracking-tight">
                        {plan.price === 0 ? "GRÁTIS" : `R$ ${plan.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
                    </span>
                    {plan.price > 0 && <span className="text-xs text-muted-foreground font-semibold uppercase tracking-widest">/mês</span>}
                  </div>
                </CardHeader>
                <CardContent className="flex-1 pb-6">
                  <ul className="space-y-4 text-sm font-medium">
                    <li className="flex items-start gap-3">
                      <div className="mt-0.5 h-4.5 w-4.5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-foreground/90 font-bold">{plan.max_properties === 1 ? '1 Imóvel' : `Até ${plan.max_properties} Imóveis`}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-0.5 h-4.5 w-4.5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-foreground/80">Até {plan.max_photos} Fotos por imóvel</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-0.5 h-4.5 w-4.5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-foreground/80">Lead: <strong>{plan.lead_price > 0 ? `R$ ${plan.lead_price.toLocaleString("pt-BR")}` : 'GRÁTIS'}</strong></span>
                    </li>
                    {plan.id === 'plan_premium' && (
                        <li className="flex items-start gap-3">
                        <div className="mt-0.5 h-4.5 w-4.5 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                            <Sparkles className="h-3 w-3 text-amber-500" />
                        </div>
                        <span className="text-amber-600 font-bold italic">Destaque Banner Principal</span>
                        </li>
                    )}
                  </ul>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button 
                    className={`w-full font-bold h-12 rounded-xl text-md transition-all ${subscription?.plan_id === plan.id ? "bg-white text-muted-foreground border-2 border-border" : "shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-95"}`} 
                    variant={subscription?.plan_id === plan.id ? "outline" : "default"}
                    onClick={() => handleBuyPlan(plan)}
                    disabled={subscription?.plan_id === plan.id || submitting !== null}
                  >
                    {submitting === plan.id ? <Loader2 className="h-5 w-5 animate-spin" /> : subscription?.plan_id === plan.id ? "Seu Plano Selecionado" : plan.price === 0 ? "Ativar Agora" : "Escolher este Plano"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="rounded-3xl bg-muted/40 p-6 border border-border/50">
            <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Dúvidas sobre os pagamentos?
            </h3>
            <p className="text-sm text-muted-foreground">
                Assinaturas via **Cartão de Crédito** são renovadas mensalmente de forma automática. 
                Pagamentos via **PIX** ativam o plano por 30 dias e precisam de renovação manual após o vencimento.
            </p>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
