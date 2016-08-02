/**
 * Created by strukov on 7/25/16.
 */
export abstract class ClickedElementListener{
    protected target:any;
    protected idAttr:any;
    
    public getClickedElementId(event: any){
        this.target = event.target || event.srcElement || event.currentTarget;
        this.idAttr = this.target.attributes.id;
        return this.idAttr.nodeValue;
    }
}