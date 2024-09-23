import {Component, DestroyRef, inject, OnInit} from "@angular/core";
import {ShortUrlService} from "../../../services/short-url.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {DataResponse} from "../../../interfaces/data-response.interface";
import {ShortUrl} from "../../../interfaces/short-url.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {take} from "rxjs";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {LoadingSpinnerComponent} from "../../../components/loading-spinner/loading-spinner.component";

interface Form {
  id?: FormControl<string | null>;
  name: FormControl<string | null>;
  url: FormControl<string | null>;
  expires_at?: FormControl<string | null | undefined>;
}

@Component({
  selector: 'app-short-url-detail',
  templateUrl: './short-url-detail.page.html',
  standalone: true,
  imports: [
    FormsModule,
    LoadingSpinnerComponent,
    ReactiveFormsModule
  ]
})
export class ShortUrlDetailPage implements OnInit {
  protected shortUrl?: ShortUrl;
  protected form?: FormGroup<Form>;

  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private shortUrlService: ShortUrlService = inject(ShortUrlService);
  private destroyRef: DestroyRef = inject(DestroyRef);
  private router: Router = inject(Router);

  public ngOnInit(): void {
    this.setForm();
    this.loadModel();
  }

  protected submit(): void {
    if(!this.form!.valid) {
      console.log('form invalid');
      console.log(this.form);

      return;
    }

    if(this.shortUrl) {
      this.updateShortUrl();

      return;
    }

    this.createShortUrl();
  }

  private updateShortUrl(): void
  {
    const data = {
      name: this.form!.controls.name.getRawValue()!,
      url: this.form!.controls.url.getRawValue()!,
      expires_at: this.form!.controls.expires_at?.getRawValue()
    };

    this.shortUrlService.update(this.shortUrl!, data)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.router.navigate(['']).then();
        },
        error: (response) => {
          window.alert('something went wrong fetching data. Error: ' + response.error.message);
        }
      });
  }

  private createShortUrl(): void
  {
    const data = {
      name: this.form!.controls.name.getRawValue()!,
      url: this.form!.controls.url.getRawValue()!,
      expires_at: this.form!.controls.expires_at?.getRawValue()
    };

    this.shortUrlService.create(data)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.router.navigate(['']).then();
        },
        error: (response) => {
          window.alert('something went wrong fetching data. Error: ' + response.error.message);
        }
      });
  }

  private loadModel(): void {
    this.activatedRoute
      .params
      .pipe(take(1))
      .subscribe((params) => {
        const id = params['id'];
        if (id) {
          this.getShortUrl(id);
        }
      });
  }

  private getShortUrl(id: string): void {
    this.shortUrlService
      .show(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response: DataResponse<ShortUrl>) => {
          this.shortUrl = response.data;
          this.fillForm();
        },
        error: (response) => {
          window.alert('something went wrong fetching data. Error: ' + response.error.message);
        },
      })
  }

  private setForm(): void {
    this.form = new FormGroup<Form>({
      id: new FormControl(null),
      name: new FormControl(null, {
        validators: [Validators.required],
        updateOn: 'change',
      }),
      url: new FormControl(null, {
        validators: [Validators.required],
        updateOn: 'change',
      }),
      expires_at: new FormControl(null, {
        validators: [Validators.nullValidator],
        updateOn: 'change',
      }),
    })
  }

  private fillForm(): void {
    this.form!.controls!.id!.setValue(this.shortUrl!.id)
    this.form!.controls!.name!.setValue(this.shortUrl!.name)
    this.form!.controls!.url!.setValue(this.shortUrl!.url)
    this.form!.controls!.expires_at!.setValue(this.shortUrl!.expires_at)
  }
}
