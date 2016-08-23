/**
 * Created by strukov on 8/23/16.
 */
import {Component} from "@angular/core";
import {TabDirective} from "./tab.directive";
import {TabsDirective} from "./tabs.directive";
import {User} from "../utils/CheckLogin";
@Component({
    selector:'admin_menu',
    templateUrl: 'app/blocks/admin_menu.html',
    styleUrls: ['app/blocks/admin_menu_style.css'],
    directives: [TabDirective, TabsDirective]
})
export class AdminMenuDirective{
    public user = User;
}