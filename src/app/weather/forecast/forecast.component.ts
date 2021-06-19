import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherService } from '../weather.service';

@Component({
    selector: 'app-forecast',
    templateUrl: './forecast.component.html',
    styleUrls: [ './forecast.component.css' ]
})
export class ForecastComponent implements OnInit {
    constructor(private weatherService: WeatherService) {}
    forecast$: Observable<{ date: string; temp: number }[]>;
    forcastData = [];
    ngOnInit(): void {
        this.forecast$ = this.weatherService.getForecast();
    }
}
