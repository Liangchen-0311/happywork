import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Target, ListTodo, FileText, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

const CalendarView = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [records, setRecords] = useState<Record<string, any>>(() => {
    const saved = localStorage.getItem('worklog-records');
    return saved ? JSON.parse(saved) : {};
  });

  const formatDateKey = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  const selectedRecord = selectedDate ? records[formatDateKey(selectedDate)] : null;

  // Get dates that have records
  const datesWithRecords = Object.keys(records).filter(dateKey => {
    const record = records[dateKey];
    return record.goals?.length > 0 || record.tasks?.length > 0 || record.notes;
  });

  const hasRecord = (date: Date) => {
    return datesWithRecords.includes(formatDateKey(date));
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const handleGoToDate = () => {
    if (selectedDate) {
      navigate('/', { state: { date: formatDateKey(selectedDate) } });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-foreground">日历视图</h1>
              <p className="text-sm text-muted-foreground">选择日期查看工作记录</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Calendar */}
          <Card className="border-border/50 shadow-sm">
            <CardContent className="p-4">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                locale={zhCN}
                className="pointer-events-auto"
                modifiers={{
                  hasRecord: (date) => hasRecord(date),
                }}
                modifiersClassNames={{
                  hasRecord: 'relative after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-primary after:rounded-full',
                }}
              />
            </CardContent>
          </Card>

          {/* Selected Date Details */}
          <div className="space-y-4">
            {selectedDate && (
              <>
                <Card className="border-border/50 shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center justify-between">
                      <span>
                        {format(selectedDate, 'yyyy年M月d日', { locale: zhCN })}
                      </span>
                      <Button size="sm" onClick={handleGoToDate}>
                        编辑此日
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedRecord ? (
                      <>
                        {/* Goals */}
                        {selectedRecord.goals?.length > 0 && (
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                              <Target className="w-4 h-4" />
                              <span>目标</span>
                            </div>
                            <ul className="space-y-1.5">
                              {selectedRecord.goals.map((goal: any) => (
                                <li
                                  key={goal.id}
                                  className="flex items-center gap-2 text-sm"
                                >
                                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                    goal.achieved 
                                      ? 'bg-primary border-primary' 
                                      : 'border-muted-foreground/30'
                                  }`}>
                                    {goal.achieved && (
                                      <Check className="w-3 h-3 text-primary-foreground" />
                                    )}
                                  </div>
                                  <span className={goal.achieved ? 'text-muted-foreground line-through' : ''}>
                                    {goal.text}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Tasks */}
                        {selectedRecord.tasks?.length > 0 && (
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                              <ListTodo className="w-4 h-4" />
                              <span>任务</span>
                              <span className="text-xs">
                                ({selectedRecord.tasks.filter((t: any) => t.completed).length}/{selectedRecord.tasks.length})
                              </span>
                            </div>
                            <ul className="space-y-1.5">
                              {selectedRecord.tasks.map((task: any) => (
                                <li
                                  key={task.id}
                                  className="flex items-center gap-2 text-sm"
                                >
                                  <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                                    task.completed 
                                      ? 'bg-primary border-primary' 
                                      : 'border-muted-foreground/30'
                                  }`}>
                                    {task.completed && (
                                      <Check className="w-3 h-3 text-primary-foreground" />
                                    )}
                                  </div>
                                  <span className={task.completed ? 'text-muted-foreground line-through' : ''}>
                                    {task.text}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Notes */}
                        {selectedRecord.notes && (
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                              <FileText className="w-4 h-4" />
                              <span>备注</span>
                            </div>
                            <p className="text-sm text-foreground/80 whitespace-pre-wrap bg-muted/30 rounded-lg p-3">
                              {selectedRecord.notes}
                            </p>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <p className="text-sm">这一天还没有记录</p>
                        <Button
                          variant="link"
                          size="sm"
                          onClick={handleGoToDate}
                          className="mt-2"
                        >
                          添加记录
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Stats for selected date */}
                {selectedRecord && (selectedRecord.goals?.length > 0 || selectedRecord.tasks?.length > 0) && (
                  <Card className="border-border/50 shadow-sm bg-primary/5">
                    <CardContent className="py-4">
                      <div className="flex justify-around text-center">
                        <div>
                          <p className="text-2xl font-bold text-primary">
                            {selectedRecord.goals?.filter((g: any) => g.achieved).length || 0}
                            <span className="text-sm text-muted-foreground font-normal">
                              /{selectedRecord.goals?.length || 0}
                            </span>
                          </p>
                          <p className="text-xs text-muted-foreground">目标完成</p>
                        </div>
                        <div className="w-px bg-border" />
                        <div>
                          <p className="text-2xl font-bold text-primary">
                            {selectedRecord.tasks?.filter((t: any) => t.completed).length || 0}
                            <span className="text-sm text-muted-foreground font-normal">
                              /{selectedRecord.tasks?.length || 0}
                            </span>
                          </p>
                          <p className="text-xs text-muted-foreground">任务完成</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CalendarView;
