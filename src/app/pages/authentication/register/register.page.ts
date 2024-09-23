import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit} from "@angular/core";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {TokenInterceptor} from "../../../interceptors/token.interceptor";
import {User} from "../../../interfaces/user.interface";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {LoginService} from "../../../services/login.service";
import {Router} from "@angular/router";
import {passwordMatchValidator} from "../../../validators/password-match.validator";
import {LoadingSpinnerComponent} from "../../../components/loading-spinner/loading-spinner.component";

interface RegisterForm {
  email?: FormControl<string | null>,
  password?: FormControl<string | null>,
  password_confirmation?: FormControl<string | null>,
}

@Component({
  selector: 'app-login',
  templateUrl: './register.page.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    LoadingSpinnerComponent,
    ReactiveFormsModule
  ]
})
export class RegisterPage implements OnInit {
  protected form?: FormGroup<RegisterForm>;
  protected isSubmitting: boolean = false;

  private loginService: LoginService = inject(LoginService);
  private destroyRef: DestroyRef = inject(DestroyRef);
  private router: Router = inject(Router);

  public ngOnInit(): void {
    if (localStorage.getItem('api_token')) {
      this.router.navigate(['']).then();

      return;
    }

    this.setForm();
  }

  protected register(): void {
    this.isSubmitting = true;
    this.form!.markAllAsTouched();

    if (!this.form!.valid) {
      this.isSubmitting = false;

      return;
    }

    const data = {
      name: this.form!.controls.email!.getRawValue()!,
      email: this.form!.controls.email!.getRawValue()!,
      password: this.form!.controls.password!.getRawValue()!,
      password_confirmation: this.form!.controls.password_confirmation!.getRawValue()!,
    }

    this.loginService
      .register(data)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.isSubmitting = false;

          localStorage.setItem('api_token', response.data.api_token);
          this.router.navigate(['']).then();
        },
        error: (response) => {
          this.isSubmitting = false;

          window.alert('something went wrong fetching data. Error: ' + response.error.message);
        },
      });
  }

  private setForm(): void {
    this.form = new FormGroup<RegisterForm>({
      email: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.email,
        ],
      }),
      password: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.min(8),
        ],
      }),
      password_confirmation: new FormControl(null, {
        validators: [
          Validators.required,
        ]
      })
    });

    this.form
      .controls
      .password_confirmation!
      .addValidators(passwordMatchValidator(this.form!.controls!.password!))
  }
}
