/**
 * Created by strukov on 7/25/16.
 */
export class ClickedElementListener{

    //Method is using to grub clicked element's ID.
    public static getClickedElementId(event: any){
        let target = event.target || event.srcElement || event.currentTarget;
        let idAttr = target.attributes.id;
        return idAttr.nodeValue;
    }
}