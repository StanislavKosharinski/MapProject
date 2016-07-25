/**
 * Created by strukov on 7/25/16.
 */
export abstract class ClickedElementListener{

    public getClickedElementId(event: any){
        var target = event.target || event.srcElement || event.currentTarget;
        var idAttr = target.attributes.id;
        return idAttr.nodeValue;
    }
}