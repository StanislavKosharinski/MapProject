/**
 * Created by strukov on 7/21/16.
 */
import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import {ApiCall} from "./ApiCall";
import 'rxjs/Rx';
import {Observable} from "rxjs";

//Injectable service for Lifts and Slopes
@Injectable()
export class SlopeLiftService{

    constructor(private http:Http){}

    //ForkJoin requst to api to get specific slopes and lifts
    getSpecificLiftsAndSlopes(ids:Array<string>){
        return Observable.forkJoin(
            this.http.get(ApiCall.REST_API + "/api/lifts/specific/" + ids).map(response => response.json()),
            this.http.get(ApiCall.REST_API + "/api/slopes/specific/" + ids).map(response => response.json())
        );
    }
}
