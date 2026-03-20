import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import Index from "./pages/Index.tsx";
import SearchPage from "./pages/SearchPage.tsx";
import PropertyDetailPage from "./pages/PropertyDetailPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.tsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.tsx";
import AnunciarPage from "./pages/AnunciarPage.tsx";
import FavoritosPage from "./pages/FavoritosPage.tsx";
import { PerfilPage } from "./pages/PlaceholderPages.tsx";
import DashboardOverview from "./pages/dashboard/DashboardOverview.tsx";
import MyPropertiesPage from "./pages/dashboard/MyPropertiesPage.tsx";
<<<<<<< HEAD
import DashboardProfilePage from "./pages/dashboard/DashboardProfilePage.tsx";
import UserPlansPage from "./pages/dashboard/UserPlansPage.tsx";
import LeadsPage from "./pages/dashboard/LeadsPage.tsx";
=======
import { LeadsPage, PlansPage, DashboardProfilePage } from "./pages/dashboard/DashboardPlaceholders.tsx";
>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3
import AgentDashboard from "./pages/agent/AgentDashboard.tsx";
import AgentListings from "./pages/agent/AgentListings.tsx";
import AgentLeads from "./pages/agent/AgentLeads.tsx";
import AgentReports from "./pages/agent/AgentReports.tsx";
import { AgentPlans, AgentProfile } from "./pages/agent/AgentPlaceholders.tsx";
<<<<<<< HEAD
import UserDashboard from "./pages/dashboard/UserDashboard.tsx";
import NotFound from "./pages/NotFound.tsx";
import AdminLogin from "./pages/admin/AdminLogin.tsx";
import AdminDashboard from "./pages/admin/AdminDashboard.tsx";
import AdminUsers from "./pages/admin/AdminUsers.tsx";
import AdminProperties from "./pages/admin/AdminProperties.tsx";
import AdminFinance from "./pages/admin/AdminFinance.tsx";
import AdminLeads from "./pages/admin/AdminLeads.tsx";
import AdminPlans from "./pages/admin/AdminPlans.tsx";const queryClient = new QueryClient();
=======
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();
>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <FavoritesProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/buscar" element={<SearchPage />} />
            <Route path="/imovel/:id" element={<PropertyDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cadastro" element={<RegisterPage />} />
            <Route path="/esqueci-senha" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/anunciar" element={<AnunciarPage />} />
            <Route path="/favoritos" element={<FavoritosPage />} />
            <Route path="/perfil" element={<PerfilPage />} />
            <Route path="/dashboard" element={<DashboardOverview />} />
            <Route path="/dashboard/imoveis" element={<MyPropertiesPage />} />
            <Route path="/dashboard/leads" element={<LeadsPage />} />
<<<<<<< HEAD
            <Route path="/dashboard/planos" element={<UserPlansPage />} />
            <Route path="/dashboard/usuario" element={<UserDashboard />} />
            <Route path="/dashboard/favoritos" element={<FavoritosPage />} />
=======
            <Route path="/dashboard/planos" element={<PlansPage />} />
>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3
            <Route path="/dashboard/perfil" element={<DashboardProfilePage />} />
            <Route path="/agente" element={<AgentDashboard />} />
            <Route path="/agente/anuncios" element={<AgentListings />} />
            <Route path="/agente/leads" element={<AgentLeads />} />
            <Route path="/agente/relatorios" element={<AgentReports />} />
            <Route path="/agente/planos" element={<AgentPlans />} />
            <Route path="/agente/perfil" element={<AgentProfile />} />
<<<<<<< HEAD
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/usuarios" element={<AdminUsers />} />
            <Route path="/admin/imoveis" element={<AdminProperties />} />
            <Route path="/admin/financeiro" element={<AdminFinance />} />
            <Route path="/admin/leads" element={<AdminLeads />} />
            <Route path="/admin/planos" element={<AdminPlans />} />
=======
>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
      </FavoritesProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
