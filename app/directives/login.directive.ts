/**
 * Created by strukov on 8/20/16.
 */
import {Component} from "@angular/core";
import {Authenticator} from "../utils/Authentificator";
@Component({
    selector: 'login',
    templateUrl:'app/blocks/login.html',
    styleUrls: ['app/blocks/login_style.css']
})

export class LoginDirective{
    constructor(public auth:Authenticator){

    }


}