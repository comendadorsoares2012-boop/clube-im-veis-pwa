import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  Users,
  CreditCard,
  UserCircle,
  LogOut,
  Crown,
  BarChart3,
<<<<<<< HEAD
  Shield,
  MessageSquare,
  Heart,
=======
>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3
} from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

interface MenuItem {
  title: string;
  url: string;
  icon: React.ElementType;
}

const ownerMenu: MenuItem[] = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Meus Imóveis", url: "/dashboard/imoveis", icon: Building2 },
  { title: "Interessados", url: "/dashboard/leads", icon: Users },
  { title: "Planos e Pagamentos", url: "/dashboard/planos", icon: CreditCard },
  { title: "Perfil", url: "/dashboard/perfil", icon: UserCircle },
];

<<<<<<< HEAD
const normalUserMenu: MenuItem[] = [
  { title: "Dashboard", url: "/dashboard/usuario", icon: LayoutDashboard },
  { title: "Favoritos", url: "/dashboard/favoritos", icon: Heart },
  { title: "Meu Perfil", url: "/dashboard/perfil", icon: UserCircle },
];

const adminMenu: MenuItem[] = [
  { title: "Visão Geral", url: "/admin", icon: LayoutDashboard },
  { title: "Usuários", url: "/admin/usuarios", icon: Users },
  { title: "Imóveis", url: "/admin/imoveis", icon: Building2 },
  { title: "Financeiro", url: "/admin/financeiro", icon: BarChart3 },
  { title: "Leads", url: "/admin/leads", icon: MessageSquare },
  { title: "Planos", url: "/admin/planos", icon: Shield },
];

import logo from "@/assets/logo.png";

=======
const agentMenu: MenuItem[] = [
  { title: "Dashboard", url: "/agente", icon: LayoutDashboard },
  { title: "Meus Anúncios", url: "/agente/anuncios", icon: Building2 },
  { title: "Leads", url: "/agente/leads", icon: Users },
  { title: "Relatórios", url: "/agente/relatorios", icon: BarChart3 },
  { title: "Planos", url: "/agente/planos", icon: CreditCard },
  { title: "Perfil", url: "/agente/perfil", icon: UserCircle },
];

>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3
function DashboardSidebarInner({ menu, subtitle }: { menu: MenuItem[]; subtitle: string }) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const baseRoute = menu[0]?.url || "/dashboard";
  const isActive = (path: string) =>
    path === baseRoute
      ? location.pathname === baseRoute
      : location.pathname.startsWith(path);

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarContent>
<<<<<<< HEAD
        <div className="flex items-center gap-2 px-3 py-5">
          <img src={logo} alt="Logo" className="h-10 w-10 shrink-0 object-contain" />
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-xs font-bold leading-tight tracking-tight text-foreground">
                Clube Aqui Tem Imóveis
=======
        <div className="flex items-center gap-2 px-4 py-5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary">
            <Crown className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-display text-foreground">
                Clube Aqui Tem
>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3
              </span>
              <span className="text-[10px] font-medium text-muted-foreground">
                {subtitle}
              </span>
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] uppercase tracking-widest text-muted-foreground">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menu.map((item) => {
                const active = isActive(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      onClick={() => navigate(item.url)}
                      className={`transition-colors ${
                        active
                          ? "bg-primary/10 text-primary font-semibold"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={async () => {
                await signOut();
                navigate("/");
              }}
              className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut className="h-4 w-4 shrink-0" />
              {!collapsed && <span>Sair</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

function DashboardBottomNavInner({ menu }: { menu: MenuItem[] }) {
  const location = useLocation();
  const navigate = useNavigate();
  const baseRoute = menu[0]?.url || "/dashboard";
  // Show max 5 items on mobile
  const visibleItems = menu.slice(0, 5);

  const isActive = (path: string) =>
    path === baseRoute
      ? location.pathname === baseRoute
      : location.pathname.startsWith(path);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-lg">
      <div className="mx-auto grid max-w-lg" style={{ gridTemplateColumns: `repeat(${visibleItems.length}, 1fr)` }}>
        {visibleItems.map((item) => {
          const active = isActive(item.url);
          const Icon = item.icon;
          return (
            <button
              key={item.url}
              onClick={() => navigate(item.url)}
              className="relative flex flex-col items-center gap-0.5 py-2 transition-colors"
            >
              {active && (
                <span className="absolute left-1/2 top-0 h-0.5 w-6 -translate-x-1/2 rounded-full bg-primary" />
              )}
              <Icon className={`h-5 w-5 ${active ? "text-primary" : "text-muted-foreground"}`} />
              <span className={`text-[10px] font-medium ${active ? "text-primary" : "text-muted-foreground"}`}>
                {item.title}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

interface DashboardShellProps {
  children: ReactNode;
  title?: string;
<<<<<<< HEAD
  variant?: "owner" | "user" | "admin";
=======
  variant?: "owner" | "agent";
>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3
}

const DashboardShell = ({ children, title, variant = "owner" }: DashboardShellProps) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
<<<<<<< HEAD
  
  const menu = variant === "admin" 
    ? adminMenu 
    : variant === "user" 
      ? normalUserMenu 
      : ownerMenu;

  const subtitle = variant === "admin" 
    ? "Painel do Administrador" 
    : variant === "user" 
      ? "Painel do Usuário" 
      : "Painel do Proprietário/Corretor";

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/login");
      } else if (variant === "admin" && user.user_metadata?.role !== "admin") {
        navigate("/");
      }
    }
  }, [loading, user, navigate, variant]);
=======
  const menu = variant === "agent" ? agentMenu : ownerMenu;
  const subtitle = variant === "agent" ? "Painel do Corretor" : "Painel do Proprietário";

  useEffect(() => {
    if (!loading && !user) navigate("/login");
  }, [loading, user, navigate]);
>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3

  if (loading) {
    return (
      <div className="flex h-svh items-center justify-center bg-background">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-svh w-full bg-background">
        <div className="hidden md:block">
          <DashboardSidebarInner menu={menu} subtitle={subtitle} />
        </div>
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur-sm">
            <SidebarTrigger className="hidden md:flex" />
            {title && (
              <h1 className="text-base font-bold tracking-display">{title}</h1>
            )}
          </header>
          <main className="flex-1 overflow-y-auto p-4 pb-24 md:p-6 md:pb-6">
            {children}
          </main>
        </div>
        <div className="md:hidden">
          <DashboardBottomNavInner menu={menu} />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardShell;
