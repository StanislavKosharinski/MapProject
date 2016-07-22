/**
 * Created by strukov on 7/21/16.
 */
import {Component, OnInit} from "@angular/core"
import {Slope} from "./domain/Slope";
import {HTTP_PROVIDERS} from "@angular/http";
import {SlopeService} from "./service/SlopeService";
import {LiftService} from "./service/LiftService";
import {Lift} from "./domain/Lift";
import {TabDirective} from "./TabDirective";
import {TabsDirective} from "./TabsDirective";

@Component({
    selector: 'left-menu',
    templateUrl: 'app/blocks/menu_left.html',
    styleUrls: ['app/blocks/menu_left_style.css'],
    providers: [SlopeService, LiftService, HTTP_PROVIDERS],
    directives:[TabDirective, TabsDirective]

})

export class MenuDirective extends OnInit{

    myLifts: Array<Lift>;
    mySlopes: Array<Slope>;
    myIds: Array<string>;


    constructor(private slopeService:SlopeService, private liftService:LiftService){
        super();
    }

    ngOnInit() {
        this.getSpecificLifts();
        this.getSpecificSlopes();
    }

    getSpecificIds(ids:Array<string>){
        this.myIds = ids;
    }

    getSpecificLifts(){
        this.liftService.getSpecificLifts(this.myIds).subscribe(data => this.myLifts= data);
    }
    getSpecificSlopes(){
        this.slopeService.getSpecificSlopes(this.myIds).subscribe(data => this.mySlopes = data);
    }
}