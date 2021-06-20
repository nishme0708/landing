import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Command, NotificationsService } from '../notifications.service';

@Component({
    selector: 'app-notifications-list',
    templateUrl: './notifications-list.component.html',
    styleUrls: [ './notifications-list.component.css' ]
})
export class NotificationsListComponent implements OnInit, AfterViewInit {
    messages$: Observable<Command[]>;
    constructor(private notificationService: NotificationsService) {}

    ngOnInit(): void {
        this.messages$ = this.notificationService.getMessages();
    }

    clearMessage(id) {
        this.notificationService.clearMessages(id);
    }
    ngAfterViewInit() {}
}
