import { Component, Input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { IonCard, IonCardContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  walletOutline, trendingUpOutline, trendingDownOutline,
} from 'ionicons/icons';
import { FinanceSummary } from '../../../core/services/finance.types';

@Component({
  selector: 'app-summary-cards',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, IonCard, IonCardContent, IonIcon],
  templateUrl: './summary-cards.component.html',
  styleUrls: ['./summary-cards.component.scss'],
})
export class SummaryCardsComponent {
  /** Recebe o resumo financeiro calculado pelo FinanceService */
  @Input({ required: true }) summary!: FinanceSummary;

  /** Rótulo do período selecionado (exibido no card de saldo) */
  @Input() periodLabel = 'Últimos 6 meses';

  constructor() {
    addIcons({ walletOutline, trendingUpOutline, trendingDownOutline });
  }
}