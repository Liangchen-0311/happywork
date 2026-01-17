import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
  headerAction?: ReactNode;
}

export const SectionCard = ({
  title,
  icon,
  children,
  className,
  headerAction,
}: SectionCardProps) => {
  return (
    <div
      className={cn(
        'bg-card rounded-xl border border-border p-5 shadow-card',
        'animate-slide-up',
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-primary">{icon}</span>
          <h3 className="font-semibold text-foreground">{title}</h3>
        </div>
        {headerAction}
      </div>
      {children}
    </div>
  );
};
