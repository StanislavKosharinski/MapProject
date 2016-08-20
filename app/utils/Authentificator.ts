/**
 * Created by strukov on 8/20/16.
 */
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable()
export class Authenticator{
    token: string;

    constructor(){
        this.token = localStorage.getItem('token');
    }

    login(username: String, password: String):any{
        if(username === 'koplac' && password === 'test'){
            this.token = 'token';
            localStorage.setItem('token', this.token);
            return Observable.of('token');
        }
        return Observable.throw('Authentication failure');
    }

    logout(){
        this.token = undefined;
        localStorage.removeItem('token');

        return Observable.of(true);
    }
}