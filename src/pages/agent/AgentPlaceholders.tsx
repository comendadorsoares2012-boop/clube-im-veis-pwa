import DashboardShell from "@/components/dashboard/DashboardShell";

const Placeholder = ({ title }: { title: string }) => (
  <DashboardShell title={title} variant="agent">
    <div className="flex items-center justify-center py-20">
      <div className="text-center">
        <h2 className="text-lg font-bold tracking-display">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">Em breve</p>
      </div>
    </div>
  </DashboardShell>
);

export const AgentPlans = () => <Placeholder title="Planos" />;
export const AgentProfile = () => <Placeholder title="Perfil" />;
