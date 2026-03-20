import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, Home, Briefcase, Search } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type UserType = "owner" | "agent" | "seeker";

const userTypes: { value: UserType; label: string; desc: string; icon: typeof Home }[] = [
  { value: "owner", label: "Proprietário", desc: "Tenho imóveis para vender ou alugar", icon: Home },
  { value: "agent", label: "Corretor", desc: "Sou profissional do mercado imobiliário", icon: Briefcase },
  { value: "seeker", label: "Procurando", desc: "Estou buscando um imóvel", icon: Search },
];

import logo from "@/assets/logo.png";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [userType, setUserType] = useState<UserType>("seeker");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }
    if (password.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: {
          full_name: name,
          phone,
          user_type: userType,
        },
      },
    });
    setLoading(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Cadastro realizado! Verifique seu e-mail para confirmar.");
      navigate("/login");
    }
  };

  return (
    <div className="flex min-h-svh flex-col bg-background">
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center">
          <img src={logo} alt="Clube Aqui Tem Imóveis" className="h-16 w-16 object-contain" />
          <h1 className="mt-4 text-xl font-bold tracking-display">
            Clube Aqui Tem Imóveis
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {step === 1 ? "Qual é o seu perfil?" : "Preencha seus dados"}
          </p>
        </div>

        {/* Step indicator */}
        <div className="mb-6 flex w-full max-w-sm items-center gap-2">
          <div className={`h-1 flex-1 rounded-full transition-colors ${step >= 1 ? "bg-primary" : "bg-foreground/10"}`} />
          <div className={`h-1 flex-1 rounded-full transition-colors ${step >= 2 ? "bg-primary" : "bg-foreground/10"}`} />
        </div>

        {step === 1 ? (
          /* Step 1: User type */
          <div className="w-full max-w-sm space-y-3">
            {userTypes.map((ut) => {
              const isActive = userType === ut.value;
              const Icon = ut.icon;
              return (
                <motion.button
                  key={ut.value}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setUserType(ut.value)}
                  className={`flex w-full items-center gap-4 rounded-xl p-4 text-left transition-all ring-1 ${
                    isActive
                      ? "bg-primary/5 ring-primary shadow-card"
                      : "bg-secondary ring-foreground/5 hover:bg-muted"
                  }`}
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                    isActive ? "bg-primary text-primary-foreground" : "bg-foreground/5 text-muted-foreground"
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{ut.label}</p>
                    <p className="text-xs text-muted-foreground">{ut.desc}</p>
                  </div>
                </motion.button>
              );
            })}

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setStep(2)}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Continuar
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </div>
        ) : (
          /* Step 2: Form */
          <form onSubmit={handleRegister} className="w-full max-w-sm space-y-4">
            {/* Name */}
            <div className="relative">
              <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl bg-secondary py-3.5 pl-11 pr-4 text-sm outline-none ring-1 ring-foreground/5 transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/40"
              />
            </div>

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

            {/* Phone */}
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="tel"
                placeholder="WhatsApp (opcional)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl bg-secondary py-3.5 pl-11 pr-4 text-sm outline-none ring-1 ring-foreground/5 transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/40"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Criar senha (mín. 6 caracteres)"
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

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 rounded-xl bg-secondary py-3.5 text-sm font-semibold text-muted-foreground ring-1 ring-foreground/5 transition-colors hover:bg-muted"
              >
                Voltar
              </button>
              <motion.button
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={loading}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
              >
                {loading ? "Criando..." : "Criar Conta"}
              </motion.button>
            </div>
          </form>
        )}

        {/* Login link */}
        <p className="mt-8 text-sm text-muted-foreground">
          Já tem uma conta?{" "}
          <Link to="/login" className="font-semibold text-primary hover:text-primary/80">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
