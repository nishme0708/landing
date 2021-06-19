import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, map, tap, pluck, mergeMap, filter, toArray, take, share } from 'rxjs/operators';

interface OpenWeatherResponse {
    list: {
        dt_txt: string;
        main: {
            temp: number;
        };
    }[];
}
@Injectable({
    providedIn: 'root'
})
export class WeatherService {
    constructor(private http: HttpClient) {}

    getCurrentLocation(): Observable<GeolocationCoordinates> {
        return new Observable<GeolocationCoordinates>((observer) => {
            window.navigator.geolocation.getCurrentPosition(
                (position) => {
                    observer.next(position.coords);
                    observer.complete();
                },
                (err) => observer.error(err)
            );
        });
    }

    getForecast() {
        return this.getCurrentLocation().pipe(
            map((coords) => {
                return new HttpParams()
                    .set('lat', coords.latitude + '')
                    .set('lon', coords.longitude + '')
                    .set('units', 'metric')
                    .set('appid', 'cee9f281714bc0595a5aab12258e0396');
            }),
            switchMap((params) => {
                return this.http.get<OpenWeatherResponse>('https://api.openweathermap.org/data/2.5/forecast', {
                    params
                });
            }),
            pluck('list'),
            mergeMap((responses) => {
                return of(...responses);
            }),
            filter((data, index) => index % 8 == 0),
            map((data) => {
                return {
                    date: data.dt_txt,
                    temp: data.main.temp
                };
            }),
            toArray(),
            share()
        );
    }
}
