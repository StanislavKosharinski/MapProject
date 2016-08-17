/**
 * Created by strukov on 7/21/16.
 */
import {Component, OnInit, forwardRef, Inject} from "@angular/core"
import {Slope} from "../domain/Slope";
import {Lift} from "../domain/Lift";
import {ItemType} from "../enums/ItemType";
import {MapComponent} from "../map.component";

//Menu directive.
@Component({
    selector: 'left-menu',
    templateUrl: 'app/blocks/menu_left.html',
    styleUrls: ['app/blocks/menu_left_style.css']
})

export class MenuDirective implements OnInit {


    myLift: Lift;
    mySlope: Slope;

    //Filled arrays with data from json response
    myLifts:Array<Lift>;
    mySlopes:Array<Slope>;

    isOpen:boolean = false;
    isError: boolean = false;

    public itemType = ItemType;

    constructor(@Inject(forwardRef(() => MapComponent)) private map: MapComponent) {
    }

    ngOnInit() {

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

    //Multipurpose method to getting item from array by ID
    getItem(items:Array<any>, id:string){
        let item = items.filter(x => x.id === id)[0];
        this.isError = !item;
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