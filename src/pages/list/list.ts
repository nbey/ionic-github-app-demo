import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { AppStore } from '../../app/app.store';
import {Store} from '@ngrx/store';
import { LoadUsersAction } from '../../githubuser/githubuser.reducer';
import { Subscription } from 'rxjs';
import { SearchPage } from '../search/search';

@Component({
    selector: 'page-list',
    templateUrl: 'list.html'
})
export class ListPage {
    items = <any>[];
    private usersStateSubscription:Subscription;

    constructor(
        private store:Store<AppStore>,
        public navCtrl: NavController,
        public events: Events
    ) {

    }

    ionViewDidEnter() {
        this.usersStateSubscription = this.store
            .select(state => state.githubUsersState.users)
            .subscribe(users => {
                this.items.push(...users);
            });
        if (!this.items.length) {
            this.store.dispatch(new LoadUsersAction());
        }
    }

    ionViewDidLeave() {
        this.usersStateSubscription.unsubscribe();
    }

    doInfinite(infiniteScroll) {
        const lastItem = this.items[this.items.length - 1];

        this.store
            .select(state => state.githubUsersState.loading)
            .subscribe(isLoading => {
                if (infiniteScroll && !isLoading) {
                    infiniteScroll.complete();
                }
            });
        this.store.dispatch(new LoadUsersAction(lastItem && lastItem.id));
    }

    itemSelected(user) {
        this.events.publish('change-tab', user);
    }
}
