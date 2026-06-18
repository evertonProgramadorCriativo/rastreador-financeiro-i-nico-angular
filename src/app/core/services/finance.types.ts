// ─────────────────────────────────────────────────────────────
// Interfaces e tipos centrais do domínio financeiro
// ─────────────────────────────────────────────────────────────

export type TransactionType = 'income' | 'expense';

export interface Category {
  id: string;
  name: string;
  icon: string;       // nome do ícone Ionicons
  color: string;      // hex usado nos gráficos
}

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  categoryId: string;
  date: string;       // ISO 8601  ex: '2024-06-15'
  createdAt: string;  // ISO 8601 com hora
}

/** Resumo de um único mês — usado no gráfico de linha */
export interface MonthlySummary {
  month: string;      // ex: 'Jan', 'Fev'
  monthIndex: number; // 0–11
  year: number;
  income: number;
  expense: number;
  balance: number;
}

/** Total por categoria — usado no gráfico de pizza */
export interface CategorySummary {
  category: Category;
  total: number;
  percentage: number;
}

/** Resumo geral exibido nos cards do dashboard */
export interface FinanceSummary {
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
  byCategory: CategorySummary[];
  monthlySummaries: MonthlySummary[];
  recentTransactions: Transaction[];
}

/** Payload para criar uma nova transação */
export interface CreateTransactionDto {
  type: TransactionType;
  amount: number;
  description: string;
  categoryId: string;
  date: string;
}