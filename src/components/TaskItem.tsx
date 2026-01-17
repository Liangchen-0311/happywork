import { Trash2, Check } from 'lucide-react';
import { Task } from '@/types/worklog';
import { cn } from '@/lib/utils';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskItem = ({ task, onToggle, onDelete }: TaskItemProps) => {
  return (
    <div
      className={cn(
        'group flex items-center gap-3 p-3 rounded-lg transition-all duration-200',
        'hover:bg-accent/50',
        task.completed && 'bg-success-light/50'
      )}
    >
      <button
        onClick={() => onToggle(task.id)}
        className={cn(
          'flex items-center justify-center w-5 h-5 rounded border-2 transition-all duration-200',
          task.completed
            ? 'bg-success border-success text-primary-foreground'
            : 'border-muted-foreground/30 hover:border-primary'
        )}
      >
        {task.completed && <Check className="w-3 h-3 animate-check" />}
      </button>
      
      <span
        className={cn(
          'flex-1 text-sm transition-all duration-200',
          task.completed && 'line-through text-muted-foreground'
        )}
      >
        {task.text}
      </span>
      
      <button
        onClick={() => onDelete(task.id)}
        className="opacity-0 group-hover:opacity-100 p-1.5 rounded hover:bg-destructive/10 transition-all"
      >
        <Trash2 className="w-4 h-4 text-destructive" />
      </button>
    </div>
  );
};
