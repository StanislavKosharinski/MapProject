import {Circle} from "./Circle";
/**
 * Created by strukov on 8/23/16.
 */
export class Path{
    pathID:string;
    coordinates:string;
    fill:string;
    stroke:string;
    stroke_width:string;
    type:string;
    circles:Array<Circle>;
}