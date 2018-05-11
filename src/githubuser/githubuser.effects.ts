import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Actions, Effect} from '@ngrx/effects';
import {GithubUserActionTypes, LoadUsersAction, LoadUserAction} from './githubuser.reducer';
import {GithubUserService} from './githubuser.service';

@Injectable()
export class GithubUserEffects {
    constructor(
        private actions: Actions,
        private githubUserService: GithubUserService
    ) {

    }

    @Effect()
    loadGithubUsers = this.actions.ofType(GithubUserActionTypes.LOAD_USERS)
        .map((action: LoadUsersAction) => action)
        .switchMap(action => this.githubUserService.loadGithubUsers(action.lastId)
            .map(response => ({type: GithubUserActionTypes.LOAD_USERS_SUCCESS, users: response}))
            .catch(() => Observable.of({type: GithubUserActionTypes.LOAD_USERS_FAILURE, error: 'Error!!'}))
        );

    @Effect()
    loadGithubUser = this.actions.ofType(GithubUserActionTypes.LOAD_USER)
        .map((action: LoadUserAction) => action)
        .switchMap(action => this.githubUserService.loadGithubUser(action.login)
            .map(response => ({type: GithubUserActionTypes.LOAD_USER_SUCCESS, user: response}))
            .catch(() => Observable.of({type: GithubUserActionTypes.LOAD_USER_FAILURE, error: 'Error!!'}))
        );
}