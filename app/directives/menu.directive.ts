/**
 * Created by strukov on 7/21/16.
 */
import {Component, OnInit, forwardRef, Inject} from "@angular/core"
import {Slope} from "../domain/Slope";
import {Lift} from "../domain/Lift";
import {ItemType} from "../enums/ItemType";
import {MapDirective} from "./map.directive";

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
    isExpanded:boolean = false;
    isError: boolean = false;

    public itemType = ItemType;

    constructor(@Inject(forwardRef(() => MapDirective)) private map: MapDirective) {
    }

    ngOnInit() {

    }

    //Filling objects from array
    setItemById(id:string, item:ItemType){
        this.isOpen = true;
        this.isExpanded = true;
        if(document.getElementById("menu"))
            this.expandMenu(document.getElementById("menu"), document.getElementById("left_arrow"));
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

    expandMenu(menu:HTMLElement, arrow:HTMLElement){
        this.isExpanded = true;
        menu.style.left = "0px";
        arrow.style.transform = "rotate(0deg)";
        if(window.innerWidth <= 768)
            document.getElementById("expand_open").setAttribute("style", "right:50px");
    }

    collapseMenu(menu:HTMLElement, arrow:HTMLElement){
        this.isExpanded = false;
        menu.style.left = "-362px";
        arrow.style.transform = "rotate(-180deg)";
        if(window.innerWidth <= 768){
            document.getElementById("expand_open").setAttribute("style", "right:-50px !important");
            menu.style.left = "-100%";
        }
    }

    setExpand(){
        var menu = document.getElementById("menu");
        var arrow = document.getElementById("left_arrow");
        switch (this.isExpanded){
            case true:
                this.collapseMenu(menu, arrow);
                break;
            case false:
                this.expandMenu(menu, arrow);
                break;
        }
    }

    //Method for closing menu.
    closeMenu(){
        this.isOpen = false;
        this.isExpanded = false;
        this.map.markerAdded = false;
        this.map.removeHighlight();
        if(this.isError)
            this.isError = false;
        if(this.myLift)
            this.myLift = null;
        if(this.mySlope)
            this.mySlope = null;
    }
}