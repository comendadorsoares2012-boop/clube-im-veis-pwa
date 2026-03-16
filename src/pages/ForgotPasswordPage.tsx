import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Informe seu e-mail.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      setSent(true);
    }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-background px-6 py-12">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-foreground">
        <span className="text-2xl font-bold text-primary">C</span>
      </div>
      <h1 className="mt-4 text-xl font-bold tracking-display">Recuperar Senha</h1>

      {sent ? (
        <div className="mt-6 w-full max-w-sm text-center">
          <p className="text-sm text-muted-foreground">
            Enviamos um link de recuperação para <span className="font-semibold text-foreground">{email}</span>. Verifique sua caixa de entrada.
          </p>
          <Link to="/login" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary">
            <ArrowLeft className="h-4 w-4" />
            Voltar ao login
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 w-full max-w-sm space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            Informe seu e-mail e enviaremos um link para redefinir sua senha.
          </p>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="email"
              placeholder="Seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl bg-secondary py-3.5 pl-11 pr-4 text-sm outline-none ring-1 ring-foreground/5 placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/40"
            />
          </div>
          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-primary py-3.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            {loading ? "Enviando..." : "Enviar Link"}
          </motion.button>
          <Link to="/login" className="flex items-center justify-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3.5 w-3.5" />
            Voltar ao login
          </Link>
        </form>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
