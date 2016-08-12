/**
 * Created by strukov on 7/21/16.
 */
import {Component, OnInit} from "@angular/core"
import {Slope} from "../domain/Slope";
import {HTTP_PROVIDERS} from "@angular/http";
import {SlopeService} from "../service/SlopeService";
import {LiftService} from "../service/LiftService";
import {Lift} from "../domain/Lift";
import {ItemType} from "../enums/ItemType";

@Component({
    selector: 'left-menu',
    templateUrl: 'app/blocks/menu_left.html',
    styleUrls: ['app/blocks/menu_left_style.css'],
    providers: [SlopeService, LiftService, HTTP_PROVIDERS]
})

export class MenuDirective implements OnInit {

    myLift: Lift;
    mySlope: Slope;

    isOpen:boolean = false;
    errorMessage: string;

    public itemType = ItemType;

    constructor(private slopeService: SlopeService, private liftService: LiftService) {
    }

    ngOnInit() {

    }

    setSlopeById(id:string){
        this.slopeService.getSlopeById(id).subscribe(slope => this.mySlope = slope,
            error =>  this.errorMessage = <any>error);

        this.isOpen = true;
        this.myLift = null;
    }

    setLiftById(id:string){
        this.liftService.getLiftById(id).subscribe(lift => this.myLift = lift,
            error =>  this.errorMessage = <any>error);

        this.isOpen = true;
        this.mySlope = null;
    }

    getMenuWidth(){
        return document.getElementById('menu').offsetWidth;
    }

    closeMenu(){
        this.isOpen = false;
        this.mySlope = null;
        this.myLift = null;
        if(this.errorMessage){
            this.errorMessage = null;
            this.isOpen = false;
        }
    }
}