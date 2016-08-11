/**
 * Created by strukov on 11.8.16.
 */
export class TabType{

    constructor(public title:string){
    }

    toString(){
        return this.title;
    }

    static Slopes = new TabType("Slopes");
    static Lifts = new TabType("Lifts");
}