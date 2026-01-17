export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export interface DailyGoal {
  id: string;
  text: string;
  achieved: boolean;
}

export interface DayRecord {
  date: string; // YYYY-MM-DD format
  goals: DailyGoal[];
  tasks: Task[];
  notes?: string;
}
