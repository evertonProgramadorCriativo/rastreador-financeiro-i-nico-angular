import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonNote,
  IonSpinner,
  IonIcon,
  IonText,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  mailOutline,
  lockClosedOutline,
  eyeOutline,
  eyeOffOutline,
  logInOutline,
  personAddOutline,
  alertCircleOutline,
} from 'ionicons/icons';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonInput,
    IonItem,
    IonLabel,
    IonNote,
    IonSpinner,
    IonIcon,
    IonText,
  ],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form!: FormGroup;
  showPassword = false;
  isLoading = false;
  loginError = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    addIcons({
      mailOutline,
      lockClosedOutline,
      eyeOutline,
      eyeOffOutline,
      logInOutline,
      personAddOutline,
      alertCircleOutline,
    });
  }

  ngOnInit(): void {
    // Se já estiver logado, redireciona direto pro dashboard
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
      return;
    }

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    // Limpa o erro de login quando o usuário digita de novo
    this.form.valueChanges.subscribe(() => {
      if (this.loginError) this.loginError = false;
    });
  }

  // Atalhos para acessar os campos no template
  get emailCtrl() { return this.form.get('email')!; }
  get passwordCtrl() { return this.form.get('password')!; }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  async onSubmit(): Promise<void> {
    // Marca todos os campos como tocados para exibir erros
    this.form.markAllAsTouched();

    if (this.form.invalid) return;

    this.isLoading = true;
    this.loginError = false;

    // Pequeno delay para simular chamada assíncrona
    await new Promise((r) => setTimeout(r, 600));

    const { email, password } = this.form.value;
    const success = this.authService.login(email, password);

    this.isLoading = false;

    if (success) {
      await this.router.navigate(['/dashboard']);
    } else {
      this.loginError = true;
      this.passwordCtrl.reset();
    }
  }
}