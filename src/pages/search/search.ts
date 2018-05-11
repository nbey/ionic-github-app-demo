import { Component, ViewChild, Directive} from '@angular/core';
import { NavController, Searchbar, NavParams, Events } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { AppStore } from '../../app/app.store';
import { LoadUserAction } from '../../githubuser/githubuser.reducer';
import { GithubUser } from '../../githubuser/GithubUser';

@Component({
    selector: 'page-search',
    templateUrl: 'search.html'
})
export class SearchPage {
    @ViewChild('userSearch') userSearchbar: Searchbar;

    private githubUser:GithubUser;
    private loading:boolean;
    private lastSearch:string = null;

    constructor(
        private store:Store<AppStore>,
        public navCtrl: NavController,
        public navParams: NavParams,
        public events:Events
    ) {
        this.store.select(state => state.githubUserState.user)
        .subscribe(user => {
            this.githubUser = user;
        });
        this.store.select(state => state.githubUserState.loading)
        .subscribe(loading => {
            this.loading = loading;
        });
    }

    ionViewDidEnter() {
        this.githubUser = null;
        this.preloadData(this.navParams.get('user'));
    }

    preloadData(user:any = null) {
        if (!user) {
            this.userSearchbar.clearInput(null);
        } else {
            this.userSearchbar.setValue(user.login);
            this.loadUser(user.login);
        }
        setTimeout(
            () => this.userSearchbar.setFocus(),
            100
        );
    }

    searchUser(username:string) {
        if (username === this.lastSearch) {
            return;
        }
        this.lastSearch = username;
        this.loadUser(username);
    }

    loadUser(username: string) {
        this.store.dispatch(new LoadUserAction(username));
    }

    onSearchClear() {
        this.lastSearch = null;
    }

    onSearchChange(evt) {
        if (evt && evt.target && evt.target.value) {
            this.searchUser(evt.target.value);
        } else { // clear
            this.githubUser = null;
        }
    }
}
