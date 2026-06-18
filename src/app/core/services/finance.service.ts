import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import {
  Transaction, Category, FinanceSummary,
  MonthlySummary, CategorySummary, CreateTransactionDto,
} from './finance.types';
import { CATEGORIES, MOCK_TRANSACTIONS } from './finance.mock';

const STORAGE_KEY = 'finance_transactions';

const MONTH_LABELS = [
  'Jan','Fev','Mar','Abr','Mai','Jun',
  'Jul','Ago','Set','Out','Nov','Dez',
];

@Injectable({ providedIn: 'root' })
export class FinanceService {

  // BehaviorSubject é a fonte única de verdade
  private transactionsSubject = new BehaviorSubject<Transaction[]>(
    this.loadFromStorage()
  );

  // ── Observables públicos ───────────────────────────────────

  /** Stream de todas as transações */
  getTransactions$(): Observable<Transaction[]> {
    return this.transactionsSubject.asObservable().pipe(
      map(txs => [...txs].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ))
    );
  }

  /** Stream do resumo financeiro geral (cards + gráficos) */
  getSummary$(): Observable<FinanceSummary> {
    return this.transactionsSubject.asObservable().pipe(
      map(txs => this.calcSummary(txs))
    );
  }

  /** Stream dos resumos mensais para o gráfico de linha */
  getMonthlySummary$(): Observable<MonthlySummary[]> {
    return this.transactionsSubject.asObservable().pipe(
      map(txs => this.calcMonthlySummaries(txs))
    );
  }

  /** Transações filtradas por tipo */
  getByType$(type: 'income' | 'expense'): Observable<Transaction[]> {
    return this.getTransactions$().pipe(
      map(txs => txs.filter(t => t.type === type))
    );
  }

  /** Lista de categorias (síncrono) */
  getCategories(): Category[] {
    return CATEGORIES;
  }

  /** Categoria pelo id (síncrono) */
  getCategoryById(id: string): Category | undefined {
    return CATEGORIES.find(c => c.id === id);
  }

  // ── Mutações ──────────────────────────────────────────────

  addTransaction(dto: CreateTransactionDto): void {
    const newTx: Transaction = {
      id: crypto.randomUUID(),
      ...dto,
      createdAt: new Date().toISOString(),
    };
    const updated = [...this.transactionsSubject.value, newTx];
    this.transactionsSubject.next(updated);
    this.saveToStorage(updated);
  }

  deleteTransaction(id: string): void {
    const updated = this.transactionsSubject.value.filter(t => t.id !== id);
    this.transactionsSubject.next(updated);
    this.saveToStorage(updated);
  }

  updateTransaction(id: string, dto: Partial<CreateTransactionDto>): void {
    const updated = this.transactionsSubject.value.map(t =>
      t.id === id ? { ...t, ...dto } : t
    );
    this.transactionsSubject.next(updated);
    this.saveToStorage(updated);
  }

  // ── Persistência ──────────────────────────────────────────

  private loadFromStorage(): Transaction[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw) as Transaction[];
    } catch {
      console.warn('[FinanceService] Erro ao ler localStorage');
    }
    // Primeira vez: carrega os dados mock e persiste
    this.saveToStorage(MOCK_TRANSACTIONS);
    return MOCK_TRANSACTIONS;
  }

  private saveToStorage(txs: Transaction[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(txs));
    } catch {
      console.warn('[FinanceService] Erro ao salvar localStorage');
    }
  }

  // ── Cálculos ──────────────────────────────────────────────

  private calcSummary(txs: Transaction[]): FinanceSummary {
    const totalIncome  = txs.filter(t => t.type === 'income')
                            .reduce((s, t) => s + t.amount, 0);
    const totalExpense = txs.filter(t => t.type === 'expense')
                            .reduce((s, t) => s + t.amount, 0);

    return {
      totalBalance:      totalIncome - totalExpense,
      totalIncome,
      totalExpense,
      byCategory:        this.calcByCategory(txs),
      monthlySummaries:  this.calcMonthlySummaries(txs),
      recentTransactions: [...txs]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5),
    };
  }

  private calcByCategory(txs: Transaction[]): CategorySummary[] {
    const expenses = txs.filter(t => t.type === 'expense');
    const total    = expenses.reduce((s, t) => s + t.amount, 0);
    if (total === 0) return [];

    const grouped = new Map<string, number>();
    for (const tx of expenses) {
      grouped.set(tx.categoryId, (grouped.get(tx.categoryId) ?? 0) + tx.amount);
    }

    return Array.from(grouped.entries())
      .map(([categoryId, catTotal]) => ({
        category:   this.getCategoryById(categoryId) ?? CATEGORIES[CATEGORIES.length - 1],
        total:      catTotal,
        percentage: Math.round((catTotal / total) * 100),
      }))
      .sort((a, b) => b.total - a.total);
  }

  private calcMonthlySummaries(txs: Transaction[]): MonthlySummary[] {
    const now = new Date();
    const result: MonthlySummary[] = [];

    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const y = d.getFullYear();
      const m = d.getMonth();

      const monthTxs = txs.filter(t => {
        const td = new Date(t.date);
        return td.getFullYear() === y && td.getMonth() === m;
      });

      const income  = monthTxs.filter(t => t.type === 'income')
                               .reduce((s, t) => s + t.amount, 0);
      const expense = monthTxs.filter(t => t.type === 'expense')
                               .reduce((s, t) => s + t.amount, 0);

      result.push({
        month:      MONTH_LABELS[m],
        monthIndex: m,
        year:       y,
        income,
        expense,
        balance:    income - expense,
      });
    }

    return result;
  }
}