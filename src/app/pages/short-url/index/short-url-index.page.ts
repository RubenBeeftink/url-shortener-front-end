import {Component, DestroyRef, inject, OnInit} from "@angular/core";
import {ShortUrlService} from "../../../services/short-url.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {DataResponse} from "../../../interfaces/data-response.interface";
import {ShortUrl} from "../../../interfaces/short-url.interface";
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-short-url-index',
  templateUrl: './short-url-index.page.html',
  standalone: true,
  imports: [
    DatePipe
  ]
})
export class ShortUrlIndexPage implements OnInit {
  protected shortUrls: ShortUrl[] = [];

  private shortUrlService: ShortUrlService = inject(ShortUrlService);
  private destroyRef: DestroyRef = inject(DestroyRef);
  private router: Router = inject(Router);

  public ngOnInit(): void {
    if (!localStorage.getItem('api_token')) {
      this.router.navigate(['login']);

      return;
    }

    this.getShortUrls();
  }

  protected delete(shortUrl: ShortUrl): void {
    this.shortUrlService.delete(shortUrl)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.getShortUrls();
        },
        error: (response) => {
          window.alert('something went wrong fetching data. Error: ' + response.error.message);
          localStorage.clear();
          this.router.navigate(['login'])
        }
      });
  }

  private getShortUrls(): void {
    this.shortUrlService
      .index()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response: DataResponse<ShortUrl[]>) => {
          this.shortUrls = response.data;
        },
        error: (response) => {
          window.alert('something went wrong fetching data. Error: ' + response.error.message);

          if (response.error.message === 'Unauthenticated.') {
            localStorage.clear();
            this.router.navigate(['login'])
          }
        },
      });
  }
}
