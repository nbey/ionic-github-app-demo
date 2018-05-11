import {GithubUser} from './githubuser.js';
import { Action } from '@ngrx/store';

export const GithubUserActionTypes = {
    LOAD_USER: 'LOAD_USER',
    LOAD_USER_SUCCESS: 'LOAD_USER_SUCCESS',
    LOAD_USER_FAILURE: 'LOAD_USER_FAILURE',

    LOAD_USERS: 'LOAD_USERS',
    LOAD_USERS_SUCCESS: 'LOAD_USERS_SUCCESS',
    LOAD_USERS_FAILURE: 'LOAD_USERS_FAILURE',
};

export interface GithubUsersState {
    loading: boolean,
    error: boolean,
    users: Array<GithubUser>,
    lastId: string
}

export interface GithubUserState {
    loading: boolean,
    error: boolean,
    user: GithubUser,
    login: string
}

const initialState: GithubUsersState = {
    loading: false,
    error: false,
    users: [],
    lastId: null
}

const initialUserState: GithubUserState = {
    loading: false,
    error: false,
    user: null,
    login: null
}

export class LoadUsersAction implements Action {
    type = GithubUserActionTypes.LOAD_USERS;
    users:Array<GithubUser>;
    error:boolean;
    lastId:string;

    constructor(lastId: string = null) {
        this.lastId = lastId;
    }
}
export class LoadUserAction implements Action {
    type = GithubUserActionTypes.LOAD_USER;
    user:GithubUser;
    error:boolean;
    login:string;

    constructor(login: string) {
        this.login = login;
    }
}

export function githubUsersReducer(state: any = initialState, action: LoadUsersAction) {
    switch (action.type) {
        case GithubUserActionTypes.LOAD_USERS:
            return {...state, loading: true};

        case GithubUserActionTypes.LOAD_USERS_SUCCESS:
            return {...state, loading: false, users: action.users};

        case GithubUserActionTypes.LOAD_USERS_FAILURE:
            return {...state, loading: false, error: true};

        default:
            return state;
    }
}
export function githubUserReducer(state: any = initialUserState, action: LoadUserAction) {
    switch (action.type) {
        case GithubUserActionTypes.LOAD_USER:
            return {...state, loading: true};

        case GithubUserActionTypes.LOAD_USER_SUCCESS:
            return {...state, loading: false, user: action.user};

        case GithubUserActionTypes.LOAD_USER_FAILURE:
            return {...state, loading: false, error: true, user: null};
        default:
            return state;
    }
}