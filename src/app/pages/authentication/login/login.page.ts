import {Component, DestroyRef, inject, OnInit} from "@angular/core";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {LoginService} from "../../../services/login.service";
import {User} from "../../../interfaces/user.interface";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {Router} from "@angular/router";
import {LoadingSpinnerComponent} from "../../../components/loading-spinner/loading-spinner.component";

interface LoginForm {
  email?: FormControl<string | null>,
  password?: FormControl<string | null>,
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  standalone: true,
  imports: [
    LoadingSpinnerComponent,
    ReactiveFormsModule,
  ]
})
export class LoginPage implements OnInit {
  protected form?: FormGroup<LoginForm>;

  private loginService: LoginService = inject(LoginService);
  private destroyRef: DestroyRef = inject(DestroyRef);
  private router: Router = inject(Router);

  public ngOnInit(): void {
    if(localStorage.getItem('api_token')) {
      this.router.navigate(['']).then();

      return;
    }

    this.setForm();
  }

  protected login(): void {
    const user = this.form!.getRawValue() as Partial<User>;

    this.loginService
      .login(user)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          if (!response.data.api_token) {
            window.alert('Invalid email or password.');

            return;
          }

          localStorage.setItem('api_token', response.data.api_token);
          this.router.navigate(['']).then();
        },
        error: (response) => {
          window.alert('something went wrong fetching data. Error: ' + response.error.message);
        },
      });
  }

  private setForm(): void {
    this.form = new FormGroup<LoginForm>({
      email: new FormControl(null, {
        validators: [Validators.required],
      }),
      password: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }
}
