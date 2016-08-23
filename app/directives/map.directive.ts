/**
 * Created by strukov on 7/19/16.
 */
import {Component, ViewChild, OnInit, Input} from "@angular/core";
import {MenuDirective} from "./menu.directive";
import {ItemType} from "../enums/ItemType";
import {ClickedElementListener} from "../utils/ClickedElementListener";
import {HTTP_PROVIDERS} from "@angular/http";
import {SlopeLiftService} from "../service/SlopeLiftService";
import {User} from "../utils/CheckLogin";
import {Router} from "@angular/router";
import {Authenticator} from "../utils/Authentificator";
import {PathService} from "../service/PathService";
import {Path} from "../domain/Path";
declare var svgPanZoom:any;
declare var $:any;
declare var hammer:any;
declare var Hammer:any;

//Map component
@Component({
    selector: 'map-lines',
    templateUrl:'app/blocks/map_lines.html',
    styleUrls: ['app/blocks/map_lines_style.css'],
    directives: [MenuDirective],
    providers: [SlopeLiftService, PathService, HTTP_PROVIDERS]
})

export class MapDirective  implements OnInit{

    //Getting child(Menu directive)
    @ViewChild('left_menu') menu :MenuDirective;
    public user = User;

    //Used for setting marker position
    @Input() elementCx;
    @Input() elementCy;

    markerAdded:boolean = false;
    ids:Array<string>;
    myPaths:any;

    constructor(private slopeLiftService: SlopeLiftService, private pathService: PathService,
                private auth: Authenticator, private router: Router){
    }

    ngOnInit() {
        this.implementHammerZoomPan();
        this.setMapObjects();
        this.getIdsFromMap();
    }



    //Method for opening menu. It is sending request to menu method setItemById.
    openMenu(event: any, type:string){
        //Passing layerX and layerY of mouse to setMarkerPosition method
        this.setMarkerPosition(event.layerX, event.layerY);
        var itemType : ItemType= <ItemType>ItemType[type];
        switch (itemType){
            case ItemType.LIFT:
                //Getting id by method getClickedElementId
                this.addHighlight(event);
                this.menu.setItemById(ClickedElementListener.getClickedElementId(event), ItemType.LIFT);
                break;
            case ItemType.SLOPE:
                this.addHighlight(event);
                this.menu.setItemById(ClickedElementListener.getClickedElementId(event), ItemType.SLOPE);
                break;
        }
    }
    
    addHighlight(event:any){
        this.removeHighlight();
        document.getElementById(ClickedElementListener.getClickedElementId(event)).classList.add("path-highlight");
    }


    removeHighlight(){
        let highLightedItem = document.getElementsByClassName("path-highlight").item(0);
        if(highLightedItem)
            highLightedItem.classList.remove("path-highlight");
    }

    //Method using to implementing svg-pan-zoom library and hammer library
    private implementHammerZoomPan(){

        var mobileEvents = {
            haltEventListeners: ['touchstart', 'touchend', 'touchmove', 'touchleave', 'touchcancel']
            , init: function (options) {
                var instance = options.instance
                    , initialScale = 1
                    , pannedX = 0
                    , pannedY = 0;
                // Init Hammer
                // Listen only for pointer and touch events
                this.hammer = Hammer(options.svgElement, {
                    inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput
                });
                // Enable pinch
                this.hammer.get('pinch').set({enable: true});
                // Handle double tap
                this.hammer.on('doubletap', function (ev) {
                    instance.zoomIn()
                });
                // Handle pan
                this.hammer.on('panstart panmove', function (ev) {
                    // On pan start reset panned variables
                    if (ev.type === 'panstart') {
                        pannedX = 0;
                        pannedY = 0;
                    }
                    // Pan only the difference
                    instance.panBy({x: ev.deltaX - pannedX, y: ev.deltaY - pannedY});
                    pannedX = ev.deltaX;
                    pannedY = ev.deltaY;
                });
                // Handle pinch
                this.hammer.on('pinchstart pinchmove', function (ev) {
                    // On pinch start remember initial zoom
                    if (ev.type === 'pinchstart') {
                        initialScale = instance.getZoom();
                        instance.zoom(initialScale * ev.scale)
                    }
                    instance.zoom(initialScale * ev.scale);
                });
                // Prevent moving the page on some devices when panning over SVG
                options.svgElement.addEventListener('touchmove', function (e) {
                    e.preventDefault();
                });
            }
            , destroy: function () {
                this.hammer.destroy()
            }
        };

        //Implementing svg-pan-zoom library
        var zoomPan = svgPanZoom('#mapSvg',  {
            viewportSelector: '.svg-pan-zoom_viewport'
            , controlIconsEnabled: false
            , dblClickZoomEnabled: false
            , zoomScaleSensitivity: 0.2
            , minZoom: 0.5
            , maxZoom: 1.5
            , eventsListenerElement: document.querySelector('#mapSvg .svg-pan-zoom_viewport')
            , fit: true
            , center: true
            , customEventsHandler: mobileEvents
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
            zoomPan.resetPan();
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

    //ForkJoin request to service and fill menu arrays
    setMapObjects(){
        this.pathService.getAllPaths().subscribe(data => this.myPaths = data);
        this.slopeLiftService.getSpecificLiftsAndSlopes(this.ids).subscribe(data => {
            this.menu.myLifts = data[0];
            this.menu.mySlopes = data[1]
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


    onLogout(){
        this.auth.logout()
            .subscribe(
                () => this.router.navigate(['/login'])
            );
    }
}