import { Video } from "./Video";

export class VideoQuality{
    private name:string;
    private videoFormatList: Array<Video>;
    

    constructor (name:string){
        this.name = name;
        this.videoFormatList = new Array<Video>;
    }

    addVideoFormat (codec:string, container:string, src:string): Video{
        let video = new Video(codec, container, src)
        this.videoFormatList.push(video);
        return video;
    }

    get Name (){
        return this.name;
    }

    get VideoList (){
        return this.videoFormatList;
    }

    get VideoCodecNameList () {
        let codecList: Array<string> = new Array<string>;
        for(let item of this.videoFormatList)
        {
            codecList.push(item.Codec);
        }
        return codecList;
    }
}