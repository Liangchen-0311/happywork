import { Target, CheckCircle2 } from 'lucide-react';
import { ProgressRing } from './ProgressRing';

interface StatsOverviewProps {
  completedTasks: number;
  totalTasks: number;
  achievedGoals: number;
  totalGoals: number;
}

export const StatsOverview = ({
  completedTasks,
  totalTasks,
  achievedGoals,
  totalGoals,
}: StatsOverviewProps) => {
  const taskProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const goalProgress = totalGoals > 0 ? Math.round((achievedGoals / totalGoals) * 100) : 0;

  return (
    <div className="bg-gradient-hero rounded-xl border border-border p-6 shadow-card animate-fade-in">
      <h3 className="font-semibold text-foreground mb-4">今日概览</h3>
      
      <div className="flex items-center justify-around">
        <div className="flex flex-col items-center gap-2">
          <ProgressRing completed={completedTasks} total={totalTasks} />
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            <span>任务完成</span>
          </div>
          <span className="text-xs text-muted-foreground">{taskProgress}%</span>
        </div>
        
        <div className="w-px h-20 bg-border" />
        
        <div className="flex flex-col items-center gap-2">
          <ProgressRing completed={achievedGoals} total={totalGoals} />
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Target className="w-4 h-4 text-primary" />
            <span>目标达成</span>
          </div>
          <span className="text-xs text-muted-foreground">{goalProgress}%</span>
        </div>
      </div>
    </div>
  );
};
