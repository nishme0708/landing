import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-paginator',
    templateUrl: './paginator.component.html',
    styleUrls: [ './paginator.component.css' ]
})
export class PaginatorComponent implements OnInit {
    @Input()
    numberOfPages;
    
    currentPage = 1;
    pageOptions: number[];
    constructor() {}

    ngOnInit(): void {
        this.pageOptions = this.getPageOptions();
        console.log(this.pageOptions);
    }

    getPageOptions() {
        let current = this.currentPage;
        let num = this.numberOfPages;
        let div = Math.floor(current / num);
        let options = [];
        div = div * num;
        div++;
        while (num > 0) {
            options.push(div++);
            num--;
        }
        return options;
    }
}
