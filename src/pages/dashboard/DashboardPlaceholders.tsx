import DashboardLayout from "@/components/dashboard/DashboardLayout";

const PlaceholderDashboardPage = ({ title }: { title: string }) => (
  <DashboardLayout title={title}>
    <div className="flex items-center justify-center py-20">
      <div className="text-center">
        <h2 className="text-lg font-bold tracking-display">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">Em breve</p>
      </div>
    </div>
  </DashboardLayout>
);

export const LeadsPage = () => <PlaceholderDashboardPage title="Interessados" />;
export const PlansPage = () => <PlaceholderDashboardPage title="Planos e Pagamentos" />;
export const DashboardProfilePage = () => <PlaceholderDashboardPage title="Perfil" />;
