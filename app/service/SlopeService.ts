import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import {ApiCall} from "./ApiCall";
import 'rxjs/Rx';

@Injectable()
export class SlopeService{

  constructor(private http:Http){}

  getSlopeById(id:string){
    return this.http.get(ApiCall.REST_API + "/api/slopes/" + id).map(response => response.json());
  }
}
