const Header = () => {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-foreground/5 bg-background/80 px-4 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground">
          <span className="text-sm font-bold text-primary">C</span>
        </div>
        <span className="text-sm font-bold tracking-display">
          Clube Imóveis
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-muted-foreground">
          Nova Iguaçu, RJ
        </span>
      </div>
    </header>
  );
};

export default Header;
