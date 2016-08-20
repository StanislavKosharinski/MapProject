import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
/**
 * Created by strukov on 8/20/16.
 */
@Component({
    selector: 'app',
    directives: [ROUTER_DIRECTIVES],
    template: `<router-outlet></router-outlet>`
})

export class MapComponent{
constructor(){}
}