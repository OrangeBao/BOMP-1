import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import {Notification} from '../../models/models';

@Component({
    selector: 'app-angular4-notify-notification',
    templateUrl: './notification.component.html',
    styleUrls: [
        './notifications.styles.css'
    ]
})
export class NotificationComponent implements OnInit{
    @Input() notification: Notification;
    @Output() dismissNotify = new EventEmitter();

    dismiss() {
        return this.dismissNotify.emit(this.notification);
    }

    ngOnInit() {
        setTimeout(() => this.dismiss(), 3000);
    }
}
