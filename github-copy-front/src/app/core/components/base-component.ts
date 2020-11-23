import { Component } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
    template: ''
})
export class BaseComponent implements OnDestroy {

    private readonly subscriptions: Subscription [] = [];

    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    public unsubscribeOnDestroy(suscription: Subscription): void {
        this.subscriptions.push(suscription);
    }  
}