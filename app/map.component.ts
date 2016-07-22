/**
 * Created by strukov on 7/19/16.
 */
import {Component, ViewChild, OnInit} from "@angular/core";
import {ModalDirective} from "./modal.directive";
import {MenuDirective} from "./menu.directive";

@Component({
  selector: 'map-lines',
  templateUrl:'app/blocks/map_lines.html',
  styleUrls: ['app/blocks/map_lines_style.css'],
  directives: [ModalDirective, MenuDirective]
})

export class MapComponent implements OnInit{


    @ViewChild('modal') modal :ModalDirective;
    @ViewChild('left_menu') menu :MenuDirective;

    constructor(){

    }

    ngOnInit() {
        this.getIdsFromMap();
        this.menu.getSpecificIds(this.getIdsFromMap());
    }

    getSlope(event: MouseEvent){
      this.modal.setModalPosition(event);
      this.modal.getSlopeById(this.getClickedElementId(event));
    }

    getLift(event: MouseEvent){
      this.modal.setModalPosition(event);
      this.modal.getLiftById(this.getClickedElementId(event));
    }

    getClickedElementId(event: MouseEvent){
        var target = event.target || event.srcElement || event.currentTarget;
        var idAttr = target.attributes.id;
        return idAttr.nodeValue;
    }

    getIdsFromMap(){
        var paths = document.getElementsByTagName("path");
        var tempIds = [];
        for(var _i = 0; _i < paths.length; _i++){
            tempIds.push(paths[_i].id);
        }
        return tempIds;
    }
}

