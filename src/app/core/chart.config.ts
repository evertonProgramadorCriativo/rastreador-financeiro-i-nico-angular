import { ChartOptions } from 'chart.js';

export const defaultChartOptions: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 400 },
  plugins: {
    legend: {
      labels: {
        font: {
          family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          size: 12,
        },
        color: '#888780',
        padding: 16,
        usePointStyle: true,
        pointStyleWidth: 8,
      },
    },
    tooltip: {
      backgroundColor: '#1e1e2e',
      titleColor: '#cdd6f4',
      bodyColor: '#a6adc8',
      padding: 10,
      cornerRadius: 8,
    },
  },
  scales: {
    x: {
      ticks: { color: '#888780', font: { size: 11 } },
      grid: { color: 'rgba(136,135,128,0.15)' },
    },
    y: {
      ticks: { color: '#888780', font: { size: 11 } },
      grid: { color: 'rgba(136,135,128,0.15)' },
    },
  },
};

export const CHART_COLORS = {
  receitas: { border: '#1D9E75', background: 'rgba(29,158,117,0.15)' },
  despesas: { border: '#E24B4A', background: 'rgba(226,75,74,0.15)' },
  faturas:  { border: '#BA7517', background: 'rgba(186,117,23,0.15)' },
  primaria: { border: '#534AB7', background: 'rgba(83,74,183,0.15)' },
  categorias: [
    '#534AB7', '#1D9E75', '#E24B4A',
    '#BA7517', '#378ADD', '#D85A30', '#D4537E',
  ],
};