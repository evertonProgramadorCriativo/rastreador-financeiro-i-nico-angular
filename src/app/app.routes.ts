import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },

  // Rotas públicas (sem guard)
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/auth/login/login.page')
        .then((m) => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/auth/register/register.page')
        .then((m) => m.RegisterPage),
  },

  // Rotas protegidas (com AuthGuard)
  {
    path: 'dashboard',
    //canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/dashboard/dashboard.page')
        .then((m) => m.DashboardPage),
  },
  {
    path: 'invoices',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/invoices/invoices.page')
        .then((m) => m.InvoicesPage),
  },
  {
    path: 'transactions',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/transactions/transactions.page')
        .then((m) => m.TransactionsPage),
  },
  {
    path: 'reports',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/reports/reports.page')
        .then((m) => m.ReportsPage),
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/profile/profile.page')
        .then((m) => m.ProfilePage),
  },

  // Fallback
  { path: '**', redirectTo: 'dashboard' },
];