import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { scan } from 'rxjs/operators';

export interface Command {
    message?: string;
    type: 'success' | 'error' | 'clear';
    id: number;
}
@Injectable({
    providedIn: 'root'
})
export class NotificationsService {
    private messages: Subject<Command>;
    public messages$: Observable<Command>;
    private counter = 0;
    constructor() {
        this.messages = new Subject<Command>();
        this.messages$ = this.messages.asObservable();
    }

    addSuccess(message: string) {
        const id = this.counter++;
        this.messages.next({
            message,
            type: 'success',
            id
        });
        this.autoClear(id)
    }
    addError(message: string) {
        const id = this.counter++;
        this.messages.next({
            message,
            id,
            type: 'error'
        });
        this.autoClear(id);
    }
    clearMessages(id: number) {
        this.messages.next({
            type: 'clear',
            id
        });
    }

    getMessages() {
        return this.messages$.pipe(
            scan((acc: Command[], value: Command) => {
                if (value.type == 'error' || value.type == 'success') {
                    return acc.concat(value);
                } else if (value.type == 'clear') {
                    return acc.filter((item) => item.id != value.id);
                }
            }, [])
        );
    }

    autoClear(id: number) {
        setTimeout(() => {
            this.clearMessages(id);
        }, 5000);
    }
}
