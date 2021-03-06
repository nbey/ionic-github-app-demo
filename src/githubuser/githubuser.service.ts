import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs';
@Injectable()

export class GithubUserService {
    private usersUrl:string = 'https://api.github.com/users';

    private username:string = null;
    private token:string = null;
    private auth:string = null;

    private lastId;

    constructor(private http: Http) {
        if (this.token) {
            this.auth = `Basic ${btoa(this.username+':'+this.token)}`;
        }
    }

    public loadGithubUsers(lastId:string = null):Observable<any> {
        return this.http.get(this.usersUrl + (lastId ? `?since=${lastId}` : ''), {headers: new Headers({'Authorization': this.auth})})
            .map(response => response.json())
            .catch(err => {
                throw Observable.throw(err);
            });
    }

    public loadGithubUser(login:string):Observable<any> {
        return this.http.get(`${this.usersUrl}/${login}`, {headers: new Headers({'Authorization': this.auth})})
            .map(response => response.json())
            .catch(err => {
                throw Observable.throw(err);
            });
    }
}