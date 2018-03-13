import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import {Notification} from '../../models/models';
import {NotificationsService} from '../../services/notifications.service';
import {Router, NavigationStart} from '@angular/router';

import 'rxjs/add/operator/filter';


@Component({
    selector: 'app-angular4-notify-notifications-container',
    templateUrl: './container.component.html',
    styleUrls: [
        './container.component.scss'
    ]
})
export class ContainerComponent implements OnInit, OnDestroy {
    public sub: Subscription;
    public routerSub: Subscription;

    public notifications: Notification[] = [];

    public render(notification) {
        this.notifications.push(notification);
    }

    public findSimilar(notification: Notification) {
        return this.notifications.find(existingNotification => {
            return existingNotification.message == notification.message
                && existingNotification.type == notification.type
        });
    }

    constructor(public notificationsService: NotificationsService,
                public router: Router) {
    }

    ngOnInit() {
        this.sub = this.notificationsService.notifications
            .subscribe((n: Notification) => {
                if (this.findSimilar(n)) {
                    return;
                }

                this.render(n);
            });

        this.routerSub = this.router.events
            .filter(event => event instanceof NavigationStart)
            .subscribe((e) => {
                this.notifications = [];
            });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
        this.routerSub.unsubscribe();
    }

    onDismissNotify(n: Notification) {
        return this.notifications.splice(
            this.notifications.indexOf(n),
            1
        );
    }
}
