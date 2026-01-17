import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DateHeaderProps {
  currentDate: Date;
  isToday: boolean;
  onPrevDay: () => void;
  onNextDay: () => void;
  onToday: () => void;
}

export const DateHeader = ({
  currentDate,
  isToday,
  onPrevDay,
  onNextDay,
  onToday,
}: DateHeaderProps) => {
  const formatDisplayDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString('zh-CN', options);
  };

  return (
    <div className="flex items-center justify-between mb-8 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onPrevDay}
          className="hover:bg-accent transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        
        <div className="text-center min-w-[280px]">
          <h2 className="text-2xl font-semibold text-foreground">
            {formatDisplayDate(currentDate)}
          </h2>
          {isToday && (
            <span className="text-sm text-primary font-medium">今天</span>
          )}
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={onNextDay}
          className="hover:bg-accent transition-colors"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
      
      {!isToday && (
        <Button
          variant="outline"
          onClick={onToday}
          className="gap-2 border-primary/20 hover:bg-primary/5 hover:border-primary/40"
        >
          <Calendar className="h-4 w-4" />
          回到今天
        </Button>
      )}
    </div>
  );
};
