import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { IonCard, IonCardContent, IonIcon } from '@ionic/angular/standalone';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { addIcons } from 'ionicons';
import { pieChartOutline } from 'ionicons/icons';

import { CategorySummary } from '../../../core/services/finance.types';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, IonCard, IonCardContent, IonIcon, BaseChartDirective],
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnChanges {
  @Input({ required: true }) categories: CategorySummary[] = [];
  @Input() totalExpense = 0;

  chartData: ChartData<'pie'> = { labels: [], datasets: [] };

  readonly chartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1e1e2e',
        titleColor: '#cdd6f4',
        bodyColor: '#a6adc8',
        padding: 10,
        cornerRadius: 8,
        callbacks: {
          label: (ctx) => {
            const val = ctx.parsed as number;
            const total = (ctx.dataset.data as number[]).reduce((a, b) => a + b, 0);
            const pct = total > 0 ? Math.round((val / total) * 100) : 0;
            return ` R$ ${val.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} (${pct}%)`;
          },
        },
      },
    },
  };

  constructor() {
    addIcons({ pieChartOutline });
  }

  ngOnChanges(): void {
    this.buildChart();
  }

  private buildChart(): void {
    if (!this.categories.length) return;

    this.chartData = {
      labels: this.categories.map(c => c.category.name),
      datasets: [{
        data:            this.categories.map(c => c.total),
        backgroundColor: this.categories.map(c => c.category.color),
        borderWidth: 2,
        borderColor: '#f4f4fb',
        hoverBorderWidth: 0,
      }],
    };
  }
}