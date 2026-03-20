import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, ArrowRight, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Preencha todos os campos.");
      return;
    }
    
    setLoading(true);
    const { data: { user }, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    
    if (error) {
      toast.error("Acesso negado: Credenciais incorretas.");
      return;
    }

    if (user && user.user_metadata?.role === "admin") {
      toast.success("Bem-vindo ao Painel de Controle!");
      navigate("/admin");
    } else {
      // Se logar mas não for admin, desloga imediatamente
      await supabase.auth.signOut();
      toast.error("Acesso bloqueado: Esta conta não possui privilégios de Administrador.");
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-zinc-950 p-6 font-sans text-zinc-100">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl"
      >
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-primary">
            <ShieldAlert className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Login Administrativo</h1>
          <p className="mt-2 text-center text-sm text-zinc-400">
            Acesso restrito à equipe do Clube Aqui Tem Imóveis
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <input
                type="email"
                placeholder="E-mail administrador"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-3.5 pl-11 pr-4 text-sm text-white placeholder-zinc-500 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <input
                type="password"
                placeholder="Senha de acesso"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-3.5 pl-11 pr-4 text-sm text-white placeholder-zinc-500 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-primary-foreground transition-all hover:brightness-110 disabled:opacity-50"
          >
            {loading ? "Autenticando..." : "Entrar no Painel"}
            {!loading && <ArrowRight className="h-4 w-4" />}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
