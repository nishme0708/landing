import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, pluck, switchMap, tap } from 'rxjs/operators';

export interface Article {
    title: string;
    url: string;
}
export interface NewsApiResponse {
    totalResults: number;
    articles: Article[];
}
@Injectable({
    providedIn: 'root'
})
export class NewsApiService {
    private url = 'https://newsapi.org/v2/top-headlines';
    private country = 'in';
    private apiKey = '64c9cdc91110491294fc43c9a4b33e94';
    private pageSize = 10;

    private pages: Subject<number>;
    public pages$: Observable<Article[]>;
    private numberOfPages: Subject<any>;
    constructor(private http: HttpClient) {
        this.numberOfPages = new Subject<any>();
        this.pages = new Subject<number>();
        this.pages$ = this.pages.asObservable().pipe(
            map((page) => {
                return new HttpParams()
                    .set('country', this.country)
                    .set('apiKey', this.apiKey)
                    .set('pageSize', this.pageSize + '')
                    .set('page', page + '');
            }),
            switchMap((params) => {
                return this.http.get<NewsApiResponse>(this.url, {
                    params
                });
            }),
            tap((data: NewsApiResponse) => {
                console.log(data);
                const total = Math.ceil(data.totalResults / this.pageSize);
                this.numberOfPages.next(total);
            }),
            pluck('articles')
        );
    }

    getPages(pageNumber: number) {
        return this.pages.next(pageNumber);
    }
}
