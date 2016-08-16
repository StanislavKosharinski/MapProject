import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import {ApiCall} from "./ApiCall";
import 'rxjs/Rx';

//Injectable service for Slopes
@Injectable()
export class SlopeService{

  constructor(private http:Http){}

  //Sending request to API to get slope by id
  getSlopeById(id:string){
    return this.http.get(ApiCall.REST_API + "/api/slopes/" + id).map(response => response.json());
  }
  //Sending request to API to get specific slopes by ids
  getSpecificSlopes(ids:Array<string>){
    return this.http.get(ApiCall.REST_API + "/api/slopes/specific/" + ids).map(response => response.json());
  }
}
