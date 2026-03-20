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

// No placeholders needed here as they are now implemented.
export const EmptyPlaceholder = () => <PlaceholderDashboardPage title="Em Breve" />;
