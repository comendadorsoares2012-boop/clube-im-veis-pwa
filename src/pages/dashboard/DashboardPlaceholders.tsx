import DashboardShell from "@/components/dashboard/DashboardShell";

const PlaceholderDashboardPage = ({ title }: { title: string }) => (
  <DashboardShell title={title} variant="owner">
    <div className="flex items-center justify-center py-20">
      <div className="text-center">
        <h2 className="text-lg font-bold tracking-display">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">Em breve</p>
      </div>
    </div>
  </DashboardShell>
);

<<<<<<< HEAD
// No placeholders needed here as they are now implemented.
export const EmptyPlaceholder = () => <PlaceholderDashboardPage title="Em Breve" />;
=======
export const LeadsPage = () => <PlaceholderDashboardPage title="Interessados" />;
export const PlansPage = () => <PlaceholderDashboardPage title="Planos e Pagamentos" />;
export const DashboardProfilePage = () => <PlaceholderDashboardPage title="Perfil" />;
>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3
