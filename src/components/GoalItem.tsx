import { Target, Trash2, Check } from 'lucide-react';
import { DailyGoal } from '@/types/worklog';
import { cn } from '@/lib/utils';

interface GoalItemProps {
  goal: DailyGoal;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const GoalItem = ({ goal, onToggle, onDelete }: GoalItemProps) => {
  return (
    <div
      className={cn(
        'group flex items-center gap-3 p-3 rounded-lg transition-all duration-200',
        'hover:bg-accent/50',
        goal.achieved && 'bg-success-light'
      )}
    >
      <button
        onClick={() => onToggle(goal.id)}
        className={cn(
          'flex items-center justify-center w-6 h-6 rounded-full border-2 transition-all duration-200',
          goal.achieved
            ? 'bg-success border-success text-primary-foreground'
            : 'border-muted-foreground/30 hover:border-primary'
        )}
      >
        {goal.achieved && <Check className="w-4 h-4 animate-check" />}
      </button>
      
      <Target className={cn(
        'w-4 h-4 flex-shrink-0',
        goal.achieved ? 'text-success' : 'text-primary'
      )} />
      
      <span
        className={cn(
          'flex-1 text-sm transition-all duration-200',
          goal.achieved && 'line-through text-muted-foreground'
        )}
      >
        {goal.text}
      </span>
      
      <button
        onClick={() => onDelete(goal.id)}
        className="opacity-0 group-hover:opacity-100 p-1.5 rounded hover:bg-destructive/10 transition-all"
      >
        <Trash2 className="w-4 h-4 text-destructive" />
      </button>
    </div>
  );
};
