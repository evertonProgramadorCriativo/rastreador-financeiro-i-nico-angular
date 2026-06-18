import { Category, Transaction } from './finance.types';

// ─────────────────────────────────────────────────────────────
// Categorias padrão do app
// ─────────────────────────────────────────────────────────────
export const CATEGORIES: Category[] = [
  { id: 'housing',    name: 'Moradia',      icon: 'home-outline',         color: '#534AB7' },
  { id: 'food',       name: 'Alimentação',  icon: 'restaurant-outline',   color: '#1D9E75' },
  { id: 'transport',  name: 'Transporte',   icon: 'car-outline',          color: '#E24B4A' },
  { id: 'health',     name: 'Saúde',        icon: 'medkit-outline',       color: '#BA7517' },
  { id: 'leisure',    name: 'Lazer',        icon: 'game-controller-outline', color: '#378ADD' },
  { id: 'education',  name: 'Educação',     icon: 'book-outline',         color: '#D85A30' },
  { id: 'salary',     name: 'Salário',      icon: 'cash-outline',         color: '#0F6E56' },
  { id: 'other',      name: 'Outros',       icon: 'ellipsis-horizontal-outline', color: '#888780' },
];

// ─────────────────────────────────────────────────────────────
// Transações mock — últimos 6 meses
// ─────────────────────────────────────────────────────────────
function makeDate(monthsAgo: number, day: number): string {
  const d = new Date();
  d.setMonth(d.getMonth() - monthsAgo);
  d.setDate(day);
  return d.toISOString().split('T')[0];
}

export const MOCK_TRANSACTIONS: Transaction[] = [
  // Mês atual
  { id: '1',  type: 'income',  amount: 5200,  description: 'Salário',             categoryId: 'salary',    date: makeDate(0, 5),  createdAt: new Date().toISOString() },
  { id: '2',  type: 'expense', amount: 1400,  description: 'Aluguel',             categoryId: 'housing',   date: makeDate(0, 6),  createdAt: new Date().toISOString() },
  { id: '3',  type: 'expense', amount: 320,   description: 'Supermercado',        categoryId: 'food',      date: makeDate(0, 8),  createdAt: new Date().toISOString() },
  { id: '4',  type: 'expense', amount: 95,    description: 'Uber',                categoryId: 'transport', date: makeDate(0, 10), createdAt: new Date().toISOString() },
  { id: '5',  type: 'expense', amount: 180,   description: 'Academia',            categoryId: 'health',    date: makeDate(0, 12), createdAt: new Date().toISOString() },
  { id: '6',  type: 'expense', amount: 240,   description: 'Restaurante',         categoryId: 'food',      date: makeDate(0, 15), createdAt: new Date().toISOString() },
  { id: '7',  type: 'income',  amount: 800,   description: 'Freelance',           categoryId: 'salary',    date: makeDate(0, 18), createdAt: new Date().toISOString() },
  { id: '8',  type: 'expense', amount: 60,    description: 'Netflix / Spotify',   categoryId: 'leisure',   date: makeDate(0, 20), createdAt: new Date().toISOString() },

  // Mês passado
  { id: '9',  type: 'income',  amount: 5200,  description: 'Salário',             categoryId: 'salary',    date: makeDate(1, 5),  createdAt: new Date().toISOString() },
  { id: '10', type: 'expense', amount: 1400,  description: 'Aluguel',             categoryId: 'housing',   date: makeDate(1, 6),  createdAt: new Date().toISOString() },
  { id: '11', type: 'expense', amount: 290,   description: 'Supermercado',        categoryId: 'food',      date: makeDate(1, 9),  createdAt: new Date().toISOString() },
  { id: '12', type: 'expense', amount: 350,   description: 'Curso Angular',       categoryId: 'education', date: makeDate(1, 11), createdAt: new Date().toISOString() },
  { id: '13', type: 'expense', amount: 120,   description: 'Farmácia',            categoryId: 'health',    date: makeDate(1, 14), createdAt: new Date().toISOString() },

  // 2 meses atrás
  { id: '14', type: 'income',  amount: 5200,  description: 'Salário',             categoryId: 'salary',    date: makeDate(2, 5),  createdAt: new Date().toISOString() },
  { id: '15', type: 'expense', amount: 1400,  description: 'Aluguel',             categoryId: 'housing',   date: makeDate(2, 6),  createdAt: new Date().toISOString() },
  { id: '16', type: 'expense', amount: 420,   description: 'Supermercado',        categoryId: 'food',      date: makeDate(2, 10), createdAt: new Date().toISOString() },
  { id: '17', type: 'expense', amount: 85,    description: 'Combustível',         categoryId: 'transport', date: makeDate(2, 13), createdAt: new Date().toISOString() },

  // 3–5 meses atrás
  { id: '18', type: 'income',  amount: 5200,  description: 'Salário',             categoryId: 'salary',    date: makeDate(3, 5),  createdAt: new Date().toISOString() },
  { id: '19', type: 'expense', amount: 1400,  description: 'Aluguel',             categoryId: 'housing',   date: makeDate(3, 6),  createdAt: new Date().toISOString() },
  { id: '20', type: 'income',  amount: 5200,  description: 'Salário',             categoryId: 'salary',    date: makeDate(4, 5),  createdAt: new Date().toISOString() },
  { id: '21', type: 'expense', amount: 1400,  description: 'Aluguel',             categoryId: 'housing',   date: makeDate(4, 6),  createdAt: new Date().toISOString() },
  { id: '22', type: 'income',  amount: 5200,  description: 'Salário',             categoryId: 'salary',    date: makeDate(5, 5),  createdAt: new Date().toISOString() },
  { id: '23', type: 'expense', amount: 1400,  description: 'Aluguel',             categoryId: 'housing',   date: makeDate(5, 6),  createdAt: new Date().toISOString() },
];