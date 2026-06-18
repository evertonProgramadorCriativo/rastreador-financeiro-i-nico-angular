import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonButton, IonInput, IonSpinner, IonIcon,
  IonButtons, IonBackButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  personOutline, mailOutline, lockClosedOutline,
  lockOpenOutline, eyeOutline, eyeOffOutline,
  personAddOutline, checkmarkOutline, alertCircleOutline,
  arrowBackOutline,
} from 'ionicons/icons';
import { AuthService } from '../../../core/services/auth.service';

/** Validator customizado: verifica se senha e confirmação são iguais */
function passwordMatchValidator(ctrl: AbstractControl): ValidationErrors | null {
  const password = ctrl.get('password');
  const confirm  = ctrl.get('confirmPassword');
  if (!password || !confirm) return null;
  return password.value === confirm.value ? null : { passwordMismatch: true };
}

/** Retorna 0–4 de acordo com a força da senha */
function calcStrength(password: string): number {
  if (!password || password.length < 6) return 0;
  let score = 0;
  if (password.length >= 8)            score++;
  if (/[A-Z]/.test(password))          score++;
  if (/[0-9]/.test(password))          score++;
  if (/[^A-Za-z0-9]/.test(password))   score++;
  return score;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, RouterLink,
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonButton, IonInput, IonSpinner, IonIcon,
    IonButtons, IonBackButton,
  ],
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  form!: FormGroup;
  showPassword        = false;
  showConfirm         = false;
  isLoading           = false;
  emailAlreadyExists  = false;

  readonly strengthLabels = ['', 'Fraca', 'Razoável', 'Forte', 'Muito forte'];
  readonly strengthColors = ['', '#E24B4A', '#BA7517', '#1D9E75', '#0F6E56'];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    addIcons({
      personOutline, mailOutline, lockClosedOutline, lockOpenOutline,
      eyeOutline, eyeOffOutline, personAddOutline, checkmarkOutline,
      alertCircleOutline, arrowBackOutline,
    });
  }

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: passwordMatchValidator },
    );

    // Limpa erro de e-mail duplicado ao reeditar o campo
    this.form.get('email')!.valueChanges.subscribe(() => {
      if (this.emailAlreadyExists) this.emailAlreadyExists = false;
    });
  }

  // ── Atalhos de campo  
  get nameCtrl()    { return this.form.get('name')!;            }
  get emailCtrl()   { return this.form.get('email')!;           }
  get passCtrl()    { return this.form.get('password')!;        }
  get confirmCtrl() { return this.form.get('confirmPassword')!; }

  /** Força da senha de 0 a 4 */
  get strength(): number {
    return calcStrength(this.passCtrl.value ?? '');
  }

  get strengthLabel(): string { return this.strengthLabels[this.strength]; }
  get strengthColor(): string { return this.strengthColors[this.strength]; }

  /** True se as senhas não coincidirem e o campo de confirmação foi tocado */
  get showMismatchError(): boolean {
    return (
      this.form.hasError('passwordMismatch') &&
      this.confirmCtrl.touched
    );
  }

  togglePassword(): void { this.showPassword = !this.showPassword; }
  toggleConfirm():  void { this.showConfirm  = !this.showConfirm;  }

  async onSubmit(): Promise<void> {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.isLoading = true;
    await new Promise((r) => setTimeout(r, 600));

    const { name, email, password } = this.form.value;
    const success = this.authService.register(name, email, password);

    this.isLoading = false;

    if (success) {
      // Auto-login já feito dentro do AuthService.register()
      await this.router.navigate(['/dashboard']);
    } else {
      // E-mail já cadastrado
      this.emailAlreadyExists = true;
      this.emailCtrl.setErrors({ emailExists: true });
    }
  }
}