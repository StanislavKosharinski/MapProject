/**
 * Created by strukov on 8/23/16.
 */
import { Component, Input } from '@angular/core';

@Component({
    selector: 'tab',
    templateUrl: 'app/blocks/tab.html',
    styleUrls:['app/blocks/tabs_style.css']
})
export class TabDirective {
    @Input('tabTitle') title: string;
    @Input() active:boolean = false;
}