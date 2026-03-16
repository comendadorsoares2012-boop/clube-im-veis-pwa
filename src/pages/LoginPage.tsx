import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, ArrowRight, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Preencha todos os campos.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message === "Invalid login credentials"
        ? "E-mail ou senha incorretos."
        : error.message);
    } else {
      toast.success("Login realizado com sucesso!");
      navigate("/");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { lovable } = await import("@/integrations/lovable/index");
      const { error } = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (error) toast.error("Erro ao conectar com Google.");
    } catch {
      toast.error("Login com Google indisponível no momento.");
    }
  };

  return (
    <div className="flex min-h-svh flex-col bg-background">
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        {/* Logo */}
        <div className="mb-10 flex flex-col items-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-foreground">
            <span className="text-2xl font-bold text-primary">C</span>
          </div>
          <h1 className="mt-3 text-xl font-bold tracking-display">
            Clube Imóveis
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Entre na sua conta
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="email"
              placeholder="Seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl bg-secondary py-3.5 pl-11 pr-4 text-sm outline-none ring-1 ring-foreground/5 transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/40"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl bg-secondary py-3.5 pl-11 pr-11 text-sm outline-none ring-1 ring-foreground/5 transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/40"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          {/* Forgot */}
          <div className="text-right">
            <Link
              to="/esqueci-senha"
              className="text-xs font-medium text-primary hover:text-primary/80"
            >
              Esqueceu a senha?
            </Link>
          </div>

          {/* Login button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar"}
            {!loading && <ArrowRight className="h-4 w-4" />}
          </motion.button>
        </form>

        {/* Divider */}
        <div className="my-6 flex w-full max-w-sm items-center gap-3">
          <div className="h-px flex-1 bg-foreground/10" />
          <span className="text-xs text-muted-foreground">ou continue com</span>
          <div className="h-px flex-1 bg-foreground/10" />
        </div>

        {/* Social login */}
        <div className="flex w-full max-w-sm gap-3">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleGoogleLogin}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-secondary py-3 text-sm font-semibold ring-1 ring-foreground/5 transition-colors hover:bg-muted"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => toast.info("Login via WhatsApp em breve!")}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-secondary py-3 text-sm font-semibold ring-1 ring-foreground/5 transition-colors hover:bg-muted"
          >
            <MessageCircle className="h-4 w-4 text-green-600" />
            WhatsApp
          </motion.button>
        </div>

        {/* Register link */}
        <p className="mt-8 text-sm text-muted-foreground">
          Não tem uma conta?{" "}
          <Link to="/cadastro" className="font-semibold text-primary hover:text-primary/80">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
