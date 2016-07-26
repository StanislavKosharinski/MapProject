import {Component, Input, ViewChild, OnInit} from "@angular/core";
import {Slope} from "../domain/Slope";
import {HTTP_PROVIDERS} from "@angular/http";
import {SlopeService} from "../service/SlopeService";
import {LiftService} from "../service/LiftService";
import {Lift} from "../domain/Lift";
import {ItemType} from "../enums/ItemType";
/**
 * Created by strukov on 7/19/16.
 */
@Component({
    selector: 'modal',
    templateUrl: 'app/blocks/modal.html',
    styleUrls: ['app/blocks/modal_style.css'],
    providers: [SlopeService, LiftService, HTTP_PROVIDERS]
})
export class ModalDirective{


    @Input() elementX;
    @Input() elementY;

    mySlope:Slope;
    myLift:Lift;
    modalOpen:boolean = false;

    constructor(private slopeService:SlopeService, private liftService:LiftService) {
    }


    getItemById(id:string, item:ItemType){
        this.modalOpen = true;
        switch (item){
            case ItemType.LIFT:
                this.mySlope = null;
                this.liftService.getLiftById(id).subscribe(data => this.myLift = data);
                break;
            case ItemType.SLOPE:
                this.myLift = null;
                this.slopeService.getSlopeById(id).subscribe(data => this.mySlope = data);
                break;
        }
    }

    setModalPosition(event:MouseEvent) {
        this.elementX = event.pageX - 352;
        this.elementY = event.pageY;
    }

    onExit() {
        this.modalOpen = false;
        console.log("Closed!");
    }
}
