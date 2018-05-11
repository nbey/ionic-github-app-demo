import { Component, ViewChild } from '@angular/core';

import { ListPage } from '../list/list';
import { SearchPage } from '../search/search';
import { NavParams, Events, NavController, Tabs} from 'ionic-angular';

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {
    // reference component in page template
    @ViewChild(Tabs) tabs: Tabs;

    tab1Root = ListPage;
    tab2Root = SearchPage;
    searchParams = {
        user: null
    };

    constructor(
        private navParams: NavParams,
        private events: Events,
        private navCtrl: NavController
    ) {
        events.subscribe('change-tab', (user) => {
            this.searchParams.user = user;
            this.tabs.select(1);
        });
        events.subscribe('reset-tab', () => {
            this.searchParams.user = null;
        });
    }

    onTabSelect() {
        this.searchParams.user = null;
    }
}
