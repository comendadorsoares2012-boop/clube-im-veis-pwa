import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: string;
  children?: ReactNode;
}

const SectionHeader = ({ title, subtitle, action }: SectionHeaderProps) => {
  return (
    <div className="flex items-end justify-between">
      <div>
        <h2 className="text-lg font-bold tracking-display">{title}</h2>
        {subtitle && (
          <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {action && (
        <button className="flex items-center gap-1 text-xs font-semibold text-primary transition-colors hover:text-primary/80">
          {action}
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
};

export default SectionHeader;
