/**
 * Created by strukov on 7/19/16.
 */
import {Component, ViewChild, OnInit, Input} from "@angular/core";
import {MenuDirective} from "./directives/menu.directive";
import {ItemType} from "./enums/ItemType";
import {ClickedElementListener} from "./utils/ClickedElementListener";
import {HTTP_PROVIDERS} from "@angular/http";
import {SlopeLiftService} from "./service/SlopeLiftService";
declare var svgPanZoom:any;
declare var $:any;

//Map component
@Component({
    selector: 'map-lines',
    templateUrl:'app/blocks/map_lines.html',
    styleUrls: ['app/blocks/map_lines_style.css'],
    directives: [MenuDirective],
    providers: [SlopeLiftService, HTTP_PROVIDERS]
})

export class MapComponent  implements OnInit{

    //Getting child(Menu directive)
    @ViewChild('left_menu') menu :MenuDirective;
    public itemType = ItemType;

    //Used for setting marker position
    @Input() elementCx;
    @Input() elementCy;

    markerAdded:boolean = false;
    ids:Array<string>;

    constructor(private slopeLiftService: SlopeLiftService){
    }

    ngOnInit() {
        this.implementZoomPan();
        this.getIdsFromMap();
        this.getSpecificLiftsAndSlopes();
    }

    //Method for opening menu. It is sending request to menu method setItemById.
    openMenu(event: MouseEvent, item:ItemType){
        //Passing layerX and layerY of mouse to setMarkerPosition method
        this.setMarkerPosition(event.layerX, event.layerY);
        switch (item){
            case ItemType.LIFT:
                //Getting id by method getClickedElementId
                this.menu.setItemById(ClickedElementListener.getClickedElementId(event), ItemType.LIFT);
                break;
            case ItemType.SLOPE:
                this.menu.setItemById(ClickedElementListener.getClickedElementId(event), ItemType.SLOPE);
                break;
        }
    }

    //Method using to implementing svg-pan-zoom library
    private implementZoomPan(){

        //We are limiting pan by width and height
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

        //Implementing svg-pan-zoom library
        var zoomPan = svgPanZoom('#mapSvg',  {
            viewportSelector: '.svg-pan-zoom_viewport'
            , controlIconsEnabled: false
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

        document.getElementById('zoom-in').addEventListener('click', function(ev){
            ev.preventDefault();
            zoomPan.zoomIn();
        });
        document.getElementById('zoom-out').addEventListener('click', function(ev){
            ev.preventDefault();
            zoomPan.zoomOut();
        });
        document.getElementById('reset').addEventListener('click', function(ev){
            ev.preventDefault();
            zoomPan.resetZoom();
        });
    }

    //Setting the position of marker. JQuery applying the matrix of our svg to created SVG point
    private setMarkerPosition(x:any, y:any){
        var svgMarker = $("svg")[0].createSVGPoint();

        svgMarker.x = x;
        svgMarker.y = y;
        svgMarker = svgMarker.matrixTransform($(".svg-pan-zoom_viewport")[0].getCTM().inverse());

        this.elementCx = svgMarker.x;
        this.elementCy = svgMarker.y;

        this.markerAdded = true;
    }

    //Method to track difference between clicking and panning to close menu
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

    //Getting ids of slopes and lifts from map. Used to sending request to API with these ids
    getIdsFromMap(){
        var paths = document.getElementsByTagName("path");
        var tempIds = [];
        for(var _i = 0; _i < paths.length; _i++){
            tempIds.push(paths[_i].id);
        }
        this.ids = tempIds;
        return this.ids;
    }

    //ForkJoin request to service and fill menu arrays
    getSpecificLiftsAndSlopes(){
        this.slopeLiftService.getSpecificLiftsAndSlopes(this.ids).subscribe(data => {
            this.menu.myLifts = data[0];
            this.menu.mySlopes = data[1]
        });
    }
}