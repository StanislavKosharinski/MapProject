/**
 * Created by strukov on 7/21/16.
 */
import {Component, OnInit, forwardRef, Inject, ViewChild} from "@angular/core"
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
import {TabDirective} from "./tabs/tab.directive";
import {TabsDirective} from "./tabs/tabs.directive";

@Component({
    selector: 'left-menu',
    templateUrl: 'app/blocks/menu_left.html',
    styleUrls: ['app/blocks/menu_left_style.css'],
    providers: [SlopeService, LiftService, HTTP_PROVIDERS],
    directives:[TabDirective, TabsDirective, ModalDirective]
})

export class MenuDirective implements OnInit{

    @ViewChild('tabs') tabs :TabsDirective;

    myLifts: Array<Lift>;
    mySlopes: Array<Slope>;

    myLift: Lift;
    mySlope: Slope;

    ids:Array<string>;
    selectedItem:any;

    public itemType = ItemType;

    constructor(private slopeService:SlopeService, private liftService:LiftService,
                @Inject(forwardRef(() => MapComponent)) private map:MapComponent){
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


    isSelectedItem(item:any){
        return this.selectedItem===item;
    }

    getExpanded(item:any){
        this.selectedItem = item;
    }

    selectTabByTitle(title:string){
        this.tabs.getAllTabs().filter(tab=>tab.title === title)[0].active = true;
    }

    /**
     * @deprecated Modal not supported any more, use left menu instead
     */
    getMenuWidth(){
        return document.getElementById('menu').offsetWidth;
    }

    /**
     * @deprecated Modal not supported any more, use left menu instead
     */
    private getModal(event: MouseEvent){
        var menuItem = document.getElementById(ClickedElementListener.getClickedElementId(event));
        for(var i = 0; i < this.map.getIdsFromMap().length; i++){
            if(this.map.getIdsFromMap()[i] == menuItem.id) {
                var mapItem = this.map.getMapDocument().item(i);
                this.map.modal.elementX = this.getMapItemPosition(mapItem, ItemPosition.LEFT);
                this.map.modal.elementY = this.getMapItemPosition(mapItem, ItemPosition.TOP) ;
            }
        }
        return menuItem;
    }

    /**
     * @deprecated Modal not supported any more, use left menu instead
     */
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

/**
 * @deprecated Modal not supported any more, use left menu instead
 */
enum ItemPosition{
    TOP,
    LEFT
}