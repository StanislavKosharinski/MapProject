/**
 * Created by strukov on 7/22/16.
 */
import { Component, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import {TabDirective} from "./tab.directive";

@Component({
    selector: 'tabs',
    templateUrl: '../../blocks/tabs.html',
    styleUrls:['../../blocks/tabs_style.css']
})
export class TabsDirective implements AfterContentInit {

    @ContentChildren(TabDirective) tabs: QueryList<TabDirective>;

    // contentChildren are set
    ngAfterContentInit() {
        // get all active tabs
        let activeTabs = this.tabs.filter((tab)=>tab.active);

        // if there is no active tab set, activate the first
        if(activeTabs.length === 0) {
            this.selectTab(this.tabs.first);
        }
    }

    selectTab(tab: TabDirective){
        // deactivate all tabs
        this.tabs.toArray().forEach(tab => tab.active = false);

        // activate the tab the user has clicked on.
        tab.active = true;
    }

}