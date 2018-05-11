import { GithubUsersState, GithubUserState } from "../githubuser/githubuser.reducer";

export interface AppStore {
    githubUsersState:GithubUsersState,
    githubUserState:GithubUserState
}