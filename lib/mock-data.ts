export type TaskStatus = "TODO" | "IN_PROGRESS" | "COMPLETED";

export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  category: string;
  dueDate: string;
}

export const tasks: Task[] = [
  {
    id: 1,
    title: "Học Next.js",
    description: "Tìm hiểu App Router",
    status: "IN_PROGRESS",
    priority: "HIGH",
    category: "Học tập",
    dueDate: "2026-08-08",
  },
  {
    id: 2,
    title: "Thiết kế giao diện",
    description: "Làm UI danh sách công việc",
    status: "TODO",
    priority: "MEDIUM",
    category: "Dự án",
    dueDate: "2026-08-09",
  },
  {
    id: 3,
    title: "Push GitHub",
    description: "Đưa source code lên GitHub",
    status: "COMPLETED",
    priority: "HIGH",
    category: "Dự án",
    dueDate: "2026-08-06",
  },
];