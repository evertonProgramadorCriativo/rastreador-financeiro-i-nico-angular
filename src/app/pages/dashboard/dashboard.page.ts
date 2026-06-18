import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonButtons, IonButton, IonIcon,
  IonRefresher, IonRefresherContent,
  IonSegment, IonSegmentButton, IonLabel,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { notificationsOutline } from 'ionicons/icons';

import { FinanceService } from '../../core/services/finance.service';
import { FinanceSummary, MonthlySummary } from '../../core/services/finance.types';
import { SummaryCardsComponent } from '../../shared/components/summary-cards/summary-cards.component';
import { PieChartComponent } from '../../shared/components/pie-chart/pie-chart.component';
import { LineChartComponent } from '../../shared/components/line-chart/line-chart.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonButtons, IonButton, IonIcon,
    IonRefresher, IonRefresherContent,
    IonSegment, IonSegmentButton, IonLabel,
    SummaryCardsComponent,
    PieChartComponent,
    LineChartComponent,
  ],
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, OnDestroy {
  summary: FinanceSummary | null = null;
  monthlySummaries: MonthlySummary[] = [];
  selectedPeriod = '6m';
  isLoading = true;

  private destroy$ = new Subject<void>();

  constructor(private financeService: FinanceService) {
    addIcons({ notificationsOutline });
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadData(): void {
    this.isLoading = true;

    this.financeService.getSummary$()
      .pipe(takeUntil(this.destroy$))
      .subscribe(summary => {
        this.summary = summary;
        this.monthlySummaries = summary.monthlySummaries;
        this.isLoading = false;
      });
  }

  get periodLabel(): string {
    const map: Record<string, string> = {
      '3m': 'Últimos 3 meses',
      '6m': 'Últimos 6 meses',
      '1a': 'Último ano',
    };
    return map[this.selectedPeriod] ?? 'Período';
  }

  onPeriodChange(event: CustomEvent): void {
    this.selectedPeriod = event.detail.value;
  }

  handleRefresh(event: CustomEvent): void {
    setTimeout(() => {
      this.loadData();
      (event.target as HTMLIonRefresherElement).complete();
    }, 800);
  }
}