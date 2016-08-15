/**
 * Created by strukov on 7/19/16.
 */
import {Component, ViewChild, OnInit, Input} from "@angular/core";
import {MenuDirective} from "./directives/menu.directive";
import {ItemType} from "./enums/ItemType";
import {ClickedElementListener} from "./utils/ClickedElementListener";
declare var svgPanZoom:any;

@Component({
    selector: 'map-lines',
    templateUrl:'app/blocks/map_lines.html',
    styleUrls: ['app/blocks/map_lines_style.css'],
    directives: [MenuDirective]
})

export class MapComponent  implements OnInit{

    @ViewChild('left_menu') menu :MenuDirective;
    public itemType = ItemType;

    @Input() elementCx;
    @Input() elementCy;
    isClicked:boolean = false;
    ids:Array<string>;

    constructor(){
    }

    ngOnInit() {
        this.implementZoomPan();
        this.getIdsFromMap();
    }

    setModalPosition(event:MouseEvent) {
        this.elementCx = event.clientX- this.menu.getMenuWidth();
        this.elementCy = event.clientY;
        this.isClicked = true;
        console.log(event);
    }

    openMenu(event: MouseEvent, item:ItemType){
        switch (item){
            case ItemType.LIFT:
                this.menu.setLiftById(ClickedElementListener.getClickedElementId(event));
                break;
            case ItemType.SLOPE:
                this.menu.setSlopeById(ClickedElementListener.getClickedElementId(event));
                break;
        }
    }

    private implementZoomPan(){

        var limitPan = function(oldPan, newPan){
            var gutterWidth = 1024
                , gutterHeight = 790
                , sizes = this.getSizes()
                , leftLimit = -((sizes.viewBox.x + sizes.viewBox.width) * sizes.realZoom) + gutterWidth
                , rightLimit = sizes.width - gutterWidth - (sizes.viewBox.x * sizes.realZoom)
                , topLimit = -((sizes.viewBox.y + sizes.viewBox.height) * sizes.realZoom) + gutterHeight
                , bottomLimit = sizes.height - gutterHeight - (sizes.viewBox.y * sizes.realZoom);
            var customPan = {x:0,y:0};
            customPan.x = Math.max(leftLimit, Math.min(rightLimit, newPan.x));
            customPan.y = Math.max(topLimit, Math.min(bottomLimit, newPan.y));
            return customPan
        };

        svgPanZoom('#mapSvg',  {
            viewportSelector: '.svg-pan-zoom_viewport'
            , controlIconsEnabled: true
            , dblClickZoomEnabled: false
            , zoomScaleSensitivity: 0.2
            , minZoom: 1
            , maxZoom: 5
            , eventsListenerElement: document.querySelector('#mapSvg .svg-pan-zoom_viewport')
            , fit: true
            , center: true
            ,onZoom: function(){
            }
            , beforePan:limitPan
        });
    }

    getIdsFromMap(){
        var paths = document.getElementsByTagName("path");
        var tempIds = [];
        for(var _i = 0; _i < paths.length; _i++){
            tempIds.push(paths[_i].id);
        }
        this.ids = tempIds;
        return this.ids;
    }
}