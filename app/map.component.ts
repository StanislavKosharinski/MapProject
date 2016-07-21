/**
 * Created by strukov on 7/19/16.
 */
import {Component, ViewChild} from "@angular/core";
import {ModalDirective} from "./modal.directive";
import {MenuDirective} from "./menu.directive";

@Component({
  selector: 'map-lines',
  templateUrl:'app/blocks/map_lines.html',
  styleUrls: ['app/blocks/map_lines_style.css'],
  directives: [ModalDirective, MenuDirective]
})

export class MapComponent {

    @ViewChild('modal') modal :ModalDirective;

    constructor(){}

    getSlope(id:string, event: MouseEvent){
      this.modal.setModalPosition(event);
      this.modal.getSlopeById(id);
    }

    getLift(id:string, event: MouseEvent){
      this.modal.setModalPosition(event);
      this.modal.getLiftById(id);
    }

}

