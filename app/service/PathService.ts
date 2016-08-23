/**
 * Created by strukov on 8/23/16.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {ApiCall} from "./ApiCall";

@Injectable()
export class PathService{
    constructor(private http:Http){

    }

    getAllPaths(){
        return this.http.get(ApiCall.REST_API + "/api/paths/all").map(response => response.json());
    }
}