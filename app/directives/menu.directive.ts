/**
 * Created by strukov on 7/21/16.
 */
import {Component, OnInit,  forwardRef, Inject} from "@angular/core"
import {Slope} from "../domain/Slope";
import {HTTP_PROVIDERS} from "@angular/http";
import {SlopeService} from "../service/SlopeService";
import {LiftService} from "../service/LiftService";
import {Lift} from "../domain/Lift";
import {ModalDirective} from "./modal.directive";
import {MapComponent} from "../map.component";
import {ClickedElementListener} from "../utils/ClickedElementListener";
import {ItemType} from "../enums/ItemType";
import {TABS_DIRECTIVES} from "./tabs/index";

@Component({
    selector: 'left-menu',
    templateUrl: 'app/blocks/menu_left.html',
    styleUrls: ['app/blocks/menu_left_style.css'],
    providers: [SlopeService, LiftService, HTTP_PROVIDERS],
    directives:[TABS_DIRECTIVES, ModalDirective]
})

export class MenuDirective extends ClickedElementListener implements OnInit{

    myLifts: Array<Lift>;
    mySlopes: Array<Slope>;
    ids:Array<string>;

    public itemType = ItemType;

    constructor(private slopeService:SlopeService, private liftService:LiftService,
                @Inject(forwardRef(() => MapComponent)) private map:MapComponent){
        super();
    }

    ngOnInit() {
        this.getMenuWidth();
        this.getSpecificIds();
        this.getSpecificItems();
    }

    getSpecificIds(){
        this.ids = this.map.getIdsFromMap();
    }

    getSpecificItems(){
        this.slopeService.getSpecificSlopes(this.ids).subscribe(data => this.mySlopes = data);
        this.liftService.getSpecificLifts(this.ids).subscribe(data => this.myLifts= data);
    }


   getSpecificSlopes(){
       this.slopeService.getSpecificSlopes(this.ids).subscribe(data => this.mySlopes = data);
    }
    getSpecificLifts(){
        this.liftService.getSpecificLifts(this.ids).subscribe(data => this.myLifts= data);
    }

    getItemModal(event: MouseEvent, item:ItemType){
        this.map.modal.closeModalIfOpened();
        this.map.modal.openModal();
        this.map.modal.getItemById(this.getModal(event).id, item);
    }

    getMenuWidth(){
        return document.getElementById('menu').offsetWidth;
    }


    private getModal(event: MouseEvent){
        var menuItem = document.getElementById(this.getClickedElementId(event));
        for(var i = 0; i < this.map.getIdsFromMap().length; i++){
            if(this.map.getIdsFromMap()[i] == menuItem.id) {
                var mapItem = this.map.getMapDocument().item(i);
                this.map.modal.elementX = this.getMapItemPosition(mapItem, ItemPosition.LEFT);
                this.map.modal.elementY = this.getMapItemPosition(mapItem, ItemPosition.TOP) ;
            }
        }
        return menuItem;
    }

    private getMapItemPosition(mapItem:any, position:ItemPosition){
        let coordinates = mapItem.getAttribute('d');
        switch (position){
            case ItemPosition.TOP:
                let mapItemTopPattern = /(?=.*),.*/;
                let mapItemTopPattern2 = /[^,]+/;
                let mapItemTopFirstRegExp = coordinates.match(mapItemTopPattern).toString();
                return mapItemTopFirstRegExp.match(mapItemTopPattern2);
            case ItemPosition.LEFT:
                let mapItemLeftPattern = /\S+(?=,)/;
                return coordinates.match(mapItemLeftPattern);
        }
    }
}

enum ItemPosition{
    TOP,
    LEFT
}