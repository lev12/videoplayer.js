import { IVideo } from "../type/Source";

export class Video implements IVideo{
    private codec:string;
    private container:string;
    private src:URL;

    constructor (codec:string, container:string, src:string)
    {
        this.codec = codec;
        this.container = container;
        this.src = new URL(src);
    }

    get Codec () {
        return this.codec;
    }

    get Container () {
        return this.container;
    }

    get Src () {
        return this.src;
    }
}