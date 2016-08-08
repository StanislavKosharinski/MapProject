import {Component, Input, forwardRef, Inject} from "@angular/core";
import {Slope} from "../domain/Slope";
import {HTTP_PROVIDERS} from "@angular/http";
import {SlopeService} from "../service/SlopeService";
import {LiftService} from "../service/LiftService";
import {Lift} from "../domain/Lift";
import {ItemType} from "../enums/ItemType";
import {MapComponent} from "../map.component";
import {ClickOutside} from "../utils/ClickOutside";
/**
 * Created by strukov on 7/19/16.
 */
@Component({
    selector: 'modal',
    templateUrl: 'app/blocks/modal.html',
    styleUrls: ['app/blocks/modal_style.css'],
    providers: [SlopeService, LiftService, HTTP_PROVIDERS],
    directives:[ClickOutside]
})
export class ModalDirective{

    @Input() elementX;
    @Input() elementY;
    @Input() modalOpened:boolean = false;

    errorMessage: string;
    mySlope:Slope;
    myLift:Lift;

    constructor(private slopeService:SlopeService, private liftService:LiftService, @Inject(forwardRef(() => MapComponent)) private map:MapComponent) {
    }


    getItemById(id:string, item:ItemType){
        switch (item){
            case ItemType.LIFT:
                this.liftService.getLiftById(id).subscribe(data => this.myLift = data, error =>  this.errorMessage = <any>error);
                break;
            case ItemType.SLOPE:
                this.slopeService.getSlopeById(id).subscribe(data => this.mySlope = data, error =>  this.errorMessage = <any>error);
                break;
        }
    }

    setModalPosition(event:MouseEvent) {
        this.elementX = event.pageX - this.map.menu.getMenuWidth();
        this.elementY = event.pageY;
        console.log(event.toString());
    }

    openModal(){
        this.modalOpened = true;
    }

    closeModalIfOpened(){
        if(this.modalOpened){
            this.closeModal();
        }
    }

    closeModal(){
        if(!this.modalOpened)
            return;
        if(this.myLift||this.mySlope) {
            this.myLift = null;
            this.mySlope = null;
            this.modalOpened = false;
        }
        if(this.errorMessage){
            this.errorMessage = null;
            this.modalOpened = false;
        }
    }
}
