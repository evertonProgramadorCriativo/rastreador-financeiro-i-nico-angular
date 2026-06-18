import { Component , OnInit} from '@angular/core';
import {
  IonContent, IonHeader, IonTitle, IonToolbar
} from '@ionic/angular/standalone';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { CHART_COLORS, defaultChartOptions } from '../../core/chart.config';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    IonContent,
     IonHeader, 
     IonTitle,
      IonToolbar,
       BaseChartDirective
   ],
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Dashboard</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <p>Dashboard .</p>  <h3 style="margin-bottom: 12px; font-size: 14px; color: var(--ion-color-medium)">
        Gráfico de Linha
      </h3>

      <div class="chart-container">
        <canvas
          baseChart
          [data]="lineData"
          [options]="lineOptions"
          type="line">
        </canvas>
      </div>

      <h3 style="margin: 20px 0 12px; font-size: 14px; color: var(--ion-color-medium)">
      Gráfico de Pizza
      </h3>

      <div class="chart-container">
        <canvas
          baseChart
          [data]="pieData"
          [options]="pieOptions"
          type="pie">
        </canvas>
      </div>
    </ion-content>
  `,
})
export class DashboardPage implements OnInit {

  // ── Gráfico de linha 

  lineData: ChartData<'line'> = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Receitas',
        data: [3200, 2800, 3600, 3100, 4200, 3800],
        borderColor: CHART_COLORS.receitas.border,
        backgroundColor: CHART_COLORS.receitas.background,
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Despesas',
        data: [2400, 2200, 2900, 2700, 3100, 2600],
        borderColor: CHART_COLORS.despesas.border,
        backgroundColor: CHART_COLORS.despesas.background,
        fill: true,
        tension: 0.4,
      },
    ],
  };

   lineOptions: ChartOptions<'line'> = {
     ...(defaultChartOptions as ChartOptions<'line'>),
     plugins: {
       ...((defaultChartOptions as ChartOptions<'line'>).plugins),
       legend: {
         ...((defaultChartOptions as ChartOptions<'line'>).plugins?.legend),
         position: 'bottom',
       },
     },
   };

  // ── Gráfico de pizza  
  pieData: ChartData<'pie'> = {
    labels: ['Moradia', 'Alimentação', 'Transporte', 'Saúde', 'Lazer'],
    datasets: [
      {
        data: [1200, 800, 350, 250, 300],
        backgroundColor: CHART_COLORS.categorias,
        borderWidth: 2,
        borderColor: '#1e1e2e',
      },
    ],
  };

  pieOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#888780',
          font: { size: 12 },
          usePointStyle: true,
          padding: 12,
        },
      },
    },
  };

  ngOnInit(): void {
    // Confirma no console que os gráficos carregaram
    console.log(' ng2-charts configurado com sucesso!');
  }
  }