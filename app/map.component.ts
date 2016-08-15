/**
 * Created by strukov on 7/19/16.
 */
import {Component, ViewChild, OnInit, Input} from "@angular/core";
import {MenuDirective} from "./directives/menu.directive";
import {ItemType} from "./enums/ItemType";
import {ClickedElementListener} from "./utils/ClickedElementListener";
declare var svgPanZoom:any;
declare var $:any;

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

    markerAdded:boolean = false;
    ids:Array<string>;

    constructor(){
    }

    ngOnInit() {
        this.implementZoomPan();
        this.getIdsFromMap();
    }

    openMenu(event: MouseEvent, item:ItemType){
        this.setMarkerPosition(event.layerX, event.layerY);
        switch (item){
            case ItemType.LIFT:
                this.menu.setItemById(ClickedElementListener.getClickedElementId(event), ItemType.LIFT);
                break;
            case ItemType.SLOPE:
                this.menu.setItemById(ClickedElementListener.getClickedElementId(event), ItemType.SLOPE);
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
            , maxZoom: 1.5
            , eventsListenerElement: document.querySelector('#mapSvg .svg-pan-zoom_viewport')
            , fit: true
            , center: true
            , onZoom:function () {

            }
            , beforePan:limitPan
        });
    }

    private setMarkerPosition(x:any, y:any){
        var svgMarker = $("svg")[0].createSVGPoint();

        svgMarker.x = x;
        svgMarker.y = y;

        svgMarker = svgMarker.matrixTransform($(".svg-pan-zoom_viewport")[0].getCTM().inverse());

        this.elementCx = svgMarker.x;
        this.elementCy = svgMarker.y;

        this.markerAdded = true;
    }

    onMapClick(){
        var element = document.getElementById('mapImage');
        var flag = 0;
        var menu = this.menu;
        element.addEventListener("mousedown", function() {
            flag = 0;
        }, false);

        element.addEventListener("mousemove", function() {
            flag = 1;
        }, false);

        element.addEventListener("mouseup", function() {
            if (flag === 0) {
                menu.closeMenu();
            } else if (flag === 1) {
                return;
            }
        }, false);
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