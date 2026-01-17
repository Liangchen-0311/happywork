import { useState, useEffect } from 'react';
import { DayRecord, Task, DailyGoal } from '@/types/worklog';

const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

export const useWorklog = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [records, setRecords] = useState<Record<string, DayRecord>>({});

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('worklog-records');
    if (saved) {
      setRecords(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('worklog-records', JSON.stringify(records));
  }, [records]);

  const dateKey = formatDate(currentDate);
  const currentRecord: DayRecord = records[dateKey] || {
    date: dateKey,
    goals: [],
    tasks: [],
    notes: '',
  };

  const updateRecord = (updates: Partial<DayRecord>) => {
    setRecords((prev) => ({
      ...prev,
      [dateKey]: { ...currentRecord, ...updates },
    }));
  };

  // Goals
  const addGoal = (text: string) => {
    const newGoal: DailyGoal = {
      id: generateId(),
      text,
      achieved: false,
    };
    updateRecord({ goals: [...currentRecord.goals, newGoal] });
  };

  const toggleGoal = (id: string) => {
    updateRecord({
      goals: currentRecord.goals.map((g) =>
        g.id === id ? { ...g, achieved: !g.achieved } : g
      ),
    });
  };

  const deleteGoal = (id: string) => {
    updateRecord({
      goals: currentRecord.goals.filter((g) => g.id !== id),
    });
  };

  // Tasks
  const addTask = (text: string) => {
    const newTask: Task = {
      id: generateId(),
      text,
      completed: false,
      createdAt: new Date(),
    };
    updateRecord({ tasks: [...currentRecord.tasks, newTask] });
  };

  const toggleTask = (id: string) => {
    updateRecord({
      tasks: currentRecord.tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      ),
    });
  };

  const deleteTask = (id: string) => {
    updateRecord({
      tasks: currentRecord.tasks.filter((t) => t.id !== id),
    });
  };

  // Notes
  const updateNotes = (notes: string) => {
    updateRecord({ notes });
  };

  // Navigation
  const goToNextDay = () => {
    const next = new Date(currentDate);
    next.setDate(next.getDate() + 1);
    setCurrentDate(next);
  };

  const goToPrevDay = () => {
    const prev = new Date(currentDate);
    prev.setDate(prev.getDate() - 1);
    setCurrentDate(prev);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const isToday = formatDate(currentDate) === formatDate(new Date());

  // Stats
  const completedTasks = currentRecord.tasks.filter((t) => t.completed).length;
  const totalTasks = currentRecord.tasks.length;
  const achievedGoals = currentRecord.goals.filter((g) => g.achieved).length;
  const totalGoals = currentRecord.goals.length;

  return {
    currentDate,
    currentRecord,
    isToday,
    // Goals
    addGoal,
    toggleGoal,
    deleteGoal,
    // Tasks
    addTask,
    toggleTask,
    deleteTask,
    // Notes
    updateNotes,
    // Navigation
    goToNextDay,
    goToPrevDay,
    goToToday,
    // Stats
    completedTasks,
    totalTasks,
    achievedGoals,
    totalGoals,
  };
};
