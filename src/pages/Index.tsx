import { Target, ListTodo, Sparkles, CalendarDays } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useWorklog } from '@/hooks/useWorklog';
import { DateHeader } from '@/components/DateHeader';
import { StatsOverview } from '@/components/StatsOverview';
import { SectionCard } from '@/components/SectionCard';
import { GoalItem } from '@/components/GoalItem';
import { TaskItem } from '@/components/TaskItem';
import { AddItemInput } from '@/components/AddItemInput';
import { NotesSection } from '@/components/NotesSection';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialDate = location.state?.date;
  
  const {
    currentDate,
    currentRecord,
    isToday,
    addGoal,
    toggleGoal,
    deleteGoal,
    addTask,
    toggleTask,
    deleteTask,
    updateNotes,
    goToNextDay,
    goToPrevDay,
    goToToday,
    completedTasks,
    totalTasks,
    achievedGoals,
    totalGoals,
  } = useWorklog(initialDate);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">工作日志</h1>
                <p className="text-sm text-muted-foreground">记录每一天的成长</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/calendar')}
              className="gap-2"
            >
              <CalendarDays className="w-4 h-4" />
              <span className="hidden sm:inline">日历</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <DateHeader
          currentDate={currentDate}
          isToday={isToday}
          onPrevDay={goToPrevDay}
          onNextDay={goToNextDay}
          onToday={goToToday}
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Stats - Right side on desktop */}
          <div className="lg:col-span-1 lg:order-2">
            <StatsOverview
              completedTasks={completedTasks}
              totalTasks={totalTasks}
              achievedGoals={achievedGoals}
              totalGoals={totalGoals}
            />
          </div>

          {/* Main content area */}
          <div className="lg:col-span-2 lg:order-1 space-y-6">
            {/* Goals Section */}
            <SectionCard
              title="今日目标"
              icon={<Target className="w-5 h-5" />}
            >
              <div className="space-y-2 mb-4">
                {currentRecord.goals.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    还没有设定今日目标，添加一个吧！
                  </p>
                ) : (
                  currentRecord.goals.map((goal) => (
                    <GoalItem
                      key={goal.id}
                      goal={goal}
                      onToggle={toggleGoal}
                      onDelete={deleteGoal}
                    />
                  ))
                )}
              </div>
              <AddItemInput
                placeholder="添加今日目标..."
                onAdd={addGoal}
              />
            </SectionCard>

            {/* Tasks Section */}
            <SectionCard
              title="任务清单"
              icon={<ListTodo className="w-5 h-5" />}
            >
              <div className="space-y-1 mb-4">
                {currentRecord.tasks.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    还没有任务，添加第一个任务吧！
                  </p>
                ) : (
                  currentRecord.tasks.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onToggle={toggleTask}
                      onDelete={deleteTask}
                    />
                  ))
                )}
              </div>
              <AddItemInput
                placeholder="添加新任务..."
                onAdd={addTask}
              />
            </SectionCard>

            {/* Notes Section */}
            <NotesSection
              notes={currentRecord.notes || ''}
              onUpdate={updateNotes}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-auto py-6">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            专注工作，记录成长 ✨
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
