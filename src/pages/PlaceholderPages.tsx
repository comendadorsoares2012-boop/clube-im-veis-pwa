import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";

const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="min-h-svh bg-background">
    <Header />
    <main className="flex items-center justify-center pb-24 pt-20">
      <div className="text-center">
        <h1 className="text-xl font-bold tracking-display">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">Em breve</p>
      </div>
    </main>
    <BottomNav />
  </div>
);

export const BuscarPage = () => <PlaceholderPage title="Buscar Imóveis" />;
export const AnunciarPage = () => <PlaceholderPage title="Anunciar Imóvel" />;
export const FavoritosPage = () => <PlaceholderPage title="Meus Favoritos" />;
export const PerfilPage = () => <PlaceholderPage title="Meu Perfil" />;
