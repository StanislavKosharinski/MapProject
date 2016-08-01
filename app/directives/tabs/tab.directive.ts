/**
 * Created by strukov on 7/22/16.
 */
import { Component, Input } from '@angular/core';

@Component({
    selector: 'tab',
    templateUrl: '../../blocks/tab.html',
    styleUrls:['../../blocks/tabs_style.css']
})
export class TabDirective {
    @Input('tabTitle') title: string;
    @Input() active:boolean = false;
}