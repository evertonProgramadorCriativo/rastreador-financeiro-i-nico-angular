import { Component } from '@angular/core';
import {
  IonContent, IonHeader, IonTitle, IonToolbar
} from '@ionic/angular/standalone';

 
@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar],
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Relatórios</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <p>Relatórios .</p>
    </ion-content>
  `,
})
export class ReportsPage {}