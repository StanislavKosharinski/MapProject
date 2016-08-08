/**
 * Created by strukov on 7/19/16.
 */
import {Component, ViewChild, OnInit} from "@angular/core";
import {ModalDirective} from "./directives/modal.directive";
import {MenuDirective} from "./directives/menu.directive";
import {ClickedElementListener} from "./utils/ClickedElementListener";
import {ItemType} from "./enums/ItemType";
declare var svgPanZoom:any;

@Component({
  selector: 'map-lines',
  templateUrl:'app/blocks/map_lines.html',
  styleUrls: ['app/blocks/map_lines_style.css'],
  directives: [ModalDirective, MenuDirective]
})

export class MapComponent  implements OnInit{


    @ViewChild('modal') modal :ModalDirective;
    @ViewChild('left_menu') menu :MenuDirective;
    public itemType = ItemType;

    constructor(){
    }

    ngOnInit() {
        this.getMapDocument();
        this.zoomMap();
    }

    getItem(event: MouseEvent, item:ItemType){
        this.modal.closeModalIfOpened();
        this.modal.openModal();
        this.modal.setModalPosition(event);
        this.modal.getItemById(ClickedElementListener.getClickedElementId(event), item);
    }

    private zoomMap(){
        svgPanZoom('#mapSvg',  {
            viewportSelector: '.svg-pan-zoom_viewport'
            , panEnabled: true
            , controlIconsEnabled: true
            , zoomEnabled: true
            , dblClickZoomEnabled: false
            , mouseWheelZoomEnabled: true
            , preventMouseEventsDefault: true
            , zoomScaleSensitivity: 0.2
            , minZoom: 1
            , maxZoom: 10
            , fit: true
            , contain: false
            , center: true
            , refreshRate: 'auto'
        });
        console.log(document.getElementById('mapSvg').getBoundingClientRect());
    }


    getIdsFromMap(){
        var paths = this.getMapDocument();
        var tempIds = [];
        for(var _i = 0; _i < paths.length; _i++){
            tempIds.push(paths[_i].id);
        }
        return tempIds;
    }

    public getMapDocument(){
        return document.getElementsByTagName("path");
    }
}