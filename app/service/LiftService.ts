/**
 * Created by strukov on 7/21/16.
 */
import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import {ApiCall} from "./ApiCall";
import 'rxjs/Rx';

//Injectable service for Lifts
@Injectable()
export class LiftService{

    constructor(private http:Http){}

    //Sending request to API to get lift by id
    getLiftById(id:string){
        return this.http.get(ApiCall.REST_API + "/api/lifts/" + id).map(response => response.json());
    }
    //Sending request to API to get specific lifts by ids
    getSpecificLifts(ids:Array<string>){
        return this.http.get(ApiCall.REST_API + "/api/lifts/specific/" + ids).map(response => response.json());
    }
}
