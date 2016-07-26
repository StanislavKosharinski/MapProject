/**
 * Created by strukov on 7/19/16.
 */
import {Component, ViewChild, OnInit} from "@angular/core";
import {ModalDirective} from "./directives/modal.directive";
import {MenuDirective} from "./directives/menu.directive";
import {ClickedElementListener} from "./utils/ClickedElementListener";

@Component({
  selector: 'map-lines',
  templateUrl:'app/blocks/map_lines.html',
  styleUrls: ['app/blocks/map_lines_style.css'],
  directives: [ModalDirective, MenuDirective]
})

export class MapComponent extends ClickedElementListener implements OnInit{


    @ViewChild('modal') modal :ModalDirective;
    @ViewChild('left_menu') menu :MenuDirective;

    constructor(){
        super();
    }

    ngOnInit() {
        this.getIdsFromMap();
        this.getMapDocument();
        this.menu.getSpecificIds(this.getIdsFromMap());
    }

    getItem(event: MouseEvent, item:string){
        this.modal.setModalPosition(event);
        this.modal.getItemById(this.getClickedElementId(event), item);
    }


    getIdsFromMap(){
        var paths = document.getElementsByTagName("path");
        var tempIds = [];
        for(var _i = 0; _i < paths.length; _i++){
            tempIds.push(paths[_i].id);
        }
        return tempIds;
    }

    getMapDocument(){
        return document.getElementsByTagName("path");
    }
}