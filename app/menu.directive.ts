/**
 * Created by strukov on 7/21/16.
 */
import {Component} from "@angular/core"
import {Slope} from "./domain/Slope";
import {HTTP_PROVIDERS} from "@angular/http";
import {SlopeService} from "./service/SlopeService";
import {LiftService} from "./service/LiftService";
import {Lift} from "./domain/Lift";

@Component({
    selector: 'left-menu',
    templateUrl: 'app/blocks/menu_left.html',
    styleUrls: ['app/blocks/menu_left_style.css'],
    providers: [SlopeService, LiftService, HTTP_PROVIDERS]

})

export class MenuDirective{

    myLifts: Array<Lift>;
    mySlopes: Array<Slope>;

    constructor(private slopeService:SlopeService, private liftService:LiftService){}
}