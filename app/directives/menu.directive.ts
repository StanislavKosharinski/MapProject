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
    errorMessage: string;

    public itemType = ItemType;

    constructor(private slopeService: SlopeService, private liftService: LiftService,
                @Inject(forwardRef(() => MapComponent)) private map: MapComponent) {
    }

    ngOnInit() {
        this.getSpecificLiftsAndSlopes();
    }


    getSpecificLiftsAndSlopes(){
        this.slopeService.getSpecificSlopes(this.map.ids).subscribe(slopes => this.mySlopes = slopes);
        this.liftService.getSpecificLifts(this.map.ids).subscribe(lifts => this.myLifts = lifts);
    }

    setSlopeById(id:string){
        this.myLift = null;
        this.mySlope = this.mySlopes.filter(slope => slope.id === id)[0];
        this.isOpen = true;
    }

    setLiftById(id:string){
        this.mySlope = null;
        this.myLift = this.myLifts.filter(lift => lift.id === id)[0];
        this.isOpen = true;

    }

    getMenuWidth(){
        return document.getElementById('menu').offsetWidth;
    }

    closeMenu(){
        this.isOpen = false;
    }
}