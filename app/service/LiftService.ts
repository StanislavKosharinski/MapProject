/**
 * Created by strukov on 7/21/16.
 */
import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import {ApiCall} from "./ApiCall";
import 'rxjs/Rx';

@Injectable()
export class LiftService{

    constructor(private http:Http){}

    getLiftById(id:string){
        return this.http.get(ApiCall.REST_API + "/api/lifts/" + id).map(response => response.json());
    }
}
