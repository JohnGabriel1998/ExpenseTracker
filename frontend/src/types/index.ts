export interface User {
  id: string;
  name: string;
  email: string;
  preferences: {
    language: 'en' | 'jp';
    darkMode: boolean;
    currency: string;
  };
}

export interface Expense {
  _id: string;
  title: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export type ExpenseCategory = 
  | 'Boarding House'
  | 'Gas'
  | 'Water'
  | 'Electric Bill'
  | 'Foods'
  | 'Shopping'
  | 'Travel'
  | 'Send Money to Philippines'
  | 'Credit Card'
  | 'Others';

export interface DashboardSummary {
  monthlyTotals: Array<{ _id: number; total: number; count: number }>;
  categoryBreakdown: Array<{ _id: string; total: number; count: number }>;
  recentExpenses: Expense[];
  currentMonthTotal: number;
  weeklyBreakdown: Array<{ _id: number; total: number; count: number }>;
  year: number;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}