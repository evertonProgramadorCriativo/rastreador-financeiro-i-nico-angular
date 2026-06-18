import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonCard, IonCardContent, IonIcon } from '@ionic/angular/standalone';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { addIcons } from 'ionicons';
import { trendingUpOutline } from 'ionicons/icons';

import { MonthlySummary } from '../../../core/services/finance.types';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [CommonModule, IonCard, IonCardContent, IonIcon, BaseChartDirective],
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnChanges {
  /** Resumos mensais dos últimos 6 meses vindos do FinanceService */
  @Input({ required: true }) monthlySummaries: MonthlySummary[] = [];

  chartData: ChartData<'line'> = { labels: [], datasets: [] };

  readonly chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',      // tooltip mostra os dois datasets juntos
      intersect: false,
    },
    plugins: {
      legend: { display: false }, // legenda customizada no template
      tooltip: {
        backgroundColor: '#1e1e2e',
        titleColor: '#cdd6f4',
        bodyColor: '#a6adc8',
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: (ctx) => {
            const label  = ctx.dataset.label ?? '';
            const value  = ctx.parsed.y as number;
            const formatted = value.toLocaleString('pt-BR', {
              style: 'currency', currency: 'BRL',
            });
            return ` ${label}: ${formatted}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#888780', font: { size: 11 } },
      },
      y: {
        position: 'right',
        grid: { color: 'rgba(136,135,128,0.12)' },
        ticks: {
          color: '#888780',
          font: { size: 10 },
          callback: (value) => {
            const n = value as number;
            return n >= 1000 ? 'R$ ' + (n / 1000).toFixed(0) + 'k' : 'R$ ' + n;
          },
        },
      },
    },
  };

  constructor() {
    addIcons({ trendingUpOutline });
  }

  ngOnChanges(): void {
    this.buildChart();
  }

  private buildChart(): void {
    if (!this.monthlySummaries.length) return;

    this.chartData = {
      labels: this.monthlySummaries.map(m => m.month),
      datasets: [
        {
          label: 'Receitas',
          data: this.monthlySummaries.map(m => m.income),
          borderColor: '#1D9E75',
          backgroundColor: 'rgba(29,158,117,0.12)',
          pointBackgroundColor: '#1D9E75',
          pointRadius: 4,
          pointHoverRadius: 6,
          fill: true,
          tension: 0.4,
        },
        {
          label: 'Despesas',
          data: this.monthlySummaries.map(m => m.expense),
          borderColor: '#E24B4A',
          backgroundColor: 'rgba(226,75,74,0.10)',
          pointBackgroundColor: '#E24B4A',
          pointRadius: 4,
          pointHoverRadius: 6,
          fill: true,
          tension: 0.4,
        },
      ],
    };
  }
}