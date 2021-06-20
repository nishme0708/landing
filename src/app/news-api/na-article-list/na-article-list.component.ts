import { Component, OnInit } from '@angular/core';
import { Article, NewsApiService } from '../news-api.service';

@Component({
    selector: 'app-na-article-list',
    templateUrl: './na-article-list.component.html',
    styleUrls: [ './na-article-list.component.css' ]
})
export class NaArticleListComponent implements OnInit {
    articles: Article[]=[];
    constructor(private newsService: NewsApiService) {
        this.newsService.pages$.subscribe((articles) => {
            this.articles = articles;
        });
        this.newsService.getPages(1);
    }

    ngOnInit(): void {}
}
