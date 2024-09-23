import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataResponse} from "../interfaces/data-response.interface";
import {ShortUrl} from "../interfaces/short-url.interface";

@Injectable({
  providedIn: 'root',
})
export class ShortUrlService {
  private baseUrl = 'http://localhost:8000/api/short-url';
  private httpClient = inject(HttpClient);

  public index(): Observable<DataResponse<ShortUrl[]>> {
    return this.httpClient.get<DataResponse<ShortUrl[]>>(this.baseUrl);
  }

  public show(id: string): Observable<DataResponse<ShortUrl>> {
    return this.httpClient.get<DataResponse<ShortUrl>>(`${this.baseUrl}/${id}`);
  }

  public create(data: Partial<ShortUrl>): Observable<DataResponse<ShortUrl>> {
    return this.httpClient.post<DataResponse<ShortUrl>>(this.baseUrl, data);
  }

  public update(shortUrl: ShortUrl, data: Partial<ShortUrl>): Observable<DataResponse<ShortUrl>> {
    return this.httpClient.patch<DataResponse<ShortUrl>>(`${this.baseUrl}/${shortUrl.id}`, data)
  }

  public delete(shortUrl: ShortUrl): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${shortUrl.id}`)
  }
}
