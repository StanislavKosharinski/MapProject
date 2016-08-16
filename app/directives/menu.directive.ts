/**
 * Created by strukov on 7/21/16.
 */
import {Component, OnInit, forwardRef, Inject} from "@angular/core"
import {Slope} from "../domain/Slope";
import {Lift} from "../domain/Lift";
import {ItemType} from "../enums/ItemType";
import {MapComponent} from "../map.component";
import {HTTP_PROVIDERS} from "@angular/http";
import {LiftService} from "../service/LiftService";
import {SlopeService} from "../service/SlopeService";

//Menu directive.
@Component({
    selector: 'left-menu',
    templateUrl: 'app/blocks/menu_left.html',
    styleUrls: ['app/blocks/menu_left_style.css'],
    providers: [SlopeService, LiftService, HTTP_PROVIDERS]
})

export class MenuDirective implements OnInit {


    myLift: Lift;
    mySlope: Slope;

    myLifts:Array<Lift>;
    mySlopes:Array<Slope>;

    isOpen:boolean = false;
    isError: boolean = false;

    public itemType = ItemType;

    constructor(private slopeService: SlopeService, private liftService: LiftService,
                @Inject(forwardRef(() => MapComponent)) private map: MapComponent) {
    }

    ngOnInit() {
        this.getSpecificLiftsAndSlopes();
    }


    //Sending requests to services to fill array with objects
    getSpecificLiftsAndSlopes(){
        this.slopeService.getSpecificSlopes(this.map.ids).subscribe(slopes => this.mySlopes = slopes);
        this.liftService.getSpecificLifts(this.map.ids).subscribe(lifts => this.myLifts = lifts);
    }

    //Filling objects from array
    setItemById(id:string, item:ItemType){
        this.isOpen = true;
        switch (item){
            case ItemType.LIFT:
                this.mySlope = null;
                this.myLift = this.getItem(this.myLifts, id);
                break;
            case ItemType.SLOPE:
                this.myLift = null;
                this.mySlope = this.getItem(this.mySlopes, id);
                break;
        }
    }

    //Universal method to getting item from array by ID
    getItem(items:Array<any>, id:string){
        let item = items.filter(x => x.id === id)[0];
        if(!item)
            this.isError = true;
        else
            return item;
    }

    //Method for closing menu.
    closeMenu(){
        this.isOpen = false;
        this.map.markerAdded = false;
        if(this.isError)
            this.isError = false;
        if(this.myLift)
            this.myLift = null;
        if(this.mySlope)
            this.mySlope = null;
    }
}