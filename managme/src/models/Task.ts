import { User } from './User';

export type TaskStatus = "todo" | "doing" | "done";

export interface Task {
  id: number;
  name: string;
  description: string;
  priority: "low" | "medium" | "high";
  story: string; 
  estimatedTime: number; 
  status: TaskStatus;
  creationDate: string; 
  startDate?: string; 
  endDate?: string; 
  assignedUser?: User;
}