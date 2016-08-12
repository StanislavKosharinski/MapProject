/**
 * Created by strukov on 7/21/16.
 */
import {Component, OnInit, forwardRef, Inject, ViewChild} from "@angular/core"
import {Slope} from "../domain/Slope";
import {HTTP_PROVIDERS} from "@angular/http";
import {SlopeService} from "../service/SlopeService";
import {LiftService} from "../service/LiftService";
import {Lift} from "../domain/Lift";
import {MapComponent} from "../map.component";
import {ItemType} from "../enums/ItemType";
import {TabDirective} from "./tabs/tab.directive";
import {TabsDirective} from "./tabs/tabs.directive";
import {TabType} from "../enums/TabType";

@Component({
    selector: 'left-menu',
    templateUrl: 'app/blocks/menu_left.html',
    styleUrls: ['app/blocks/menu_left_style.css'],
    providers: [SlopeService, LiftService, HTTP_PROVIDERS],
    directives:[TabDirective, TabsDirective]
})

export class MenuDirective implements OnInit {

    @ViewChild('tabs') tabs: TabsDirective;

    myLifts: Array<Lift>;
    mySlopes: Array<Slope>;

    ids: Array<string>;

    selectedItem: any;

    public itemType = ItemType;

    constructor(private slopeService: SlopeService, private liftService: LiftService,
                @Inject(forwardRef(() => MapComponent)) private map: MapComponent) {
    }

    ngOnInit() {
        this.getSpecificIds();
        this.getSpecificItems();
    }

    getSpecificIds() {
        this.ids = this.map.getIdsFromMap();
    }

    getSpecificItems() {
        this.slopeService.getSpecificSlopes(this.ids).subscribe(data => this.mySlopes = data);
        this.liftService.getSpecificLifts(this.ids).subscribe(data => this.myLifts = data);
    }

    isSelectedItem(item: any) {
        return this.selectedItem === item;
    }

    getExpanded(item: any) {
        this.selectedItem = item;
    }

    selectTabByTitle(tabType: TabType) {
        this.tabs.getAllTabs().filter(tab=>tab.title === tabType.title)[0].active = true;
    }

    getMenuWidth(){
        return document.getElementById('menu').offsetWidth;
    }
}