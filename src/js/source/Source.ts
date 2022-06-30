import { IVideo } from "../type/Source";
import { Video } from "./Video";


export class Source implements IVideo
{
    //private type: SourceType 
    private groupName: string;
    private videoTrackName: string;
    private audioTrackName: string;
    private captionsTrackName: string;
    private videoQualityName: string;
    private videoCodecName: string;

    private video: Video;
    constructor (v: Video){
        this.video = v;
        this.groupName = "";
        this.videoTrackName = "";
        this.audioTrackName = "";
        this.captionsTrackName = "";
        this.videoQualityName = "";
        this.videoCodecName = "";
    }

    //base
    get GroupName (){
        return this.groupName;
    }

    set GroupName (value: string){
        this.groupName = value;
    }

    get VideoTrackName (){
        return this.videoTrackName;
    }

    set VideoTrackName (value: string){
        this.videoTrackName = value;
    }

    get AudioTrackName (){
        return this.audioTrackName;
    }

    set AudioTrackName (value: string){
        this.audioTrackName = value;
    }

    get CaptionsTrackName (){
        return this.captionsTrackName;
    }

    set CaptionsTrackName (value: string){
        this.captionsTrackName = value;
    }

    get VideoQualityName (){
        return this.videoQualityName;
    }

    set VideoQualityName (value: string){
        this.videoQualityName = value;
    }

    get VideoCodecName (){
        return this.videoCodecName;
    }

    set VideoCodecName (value: string){
        this.videoCodecName = value;
    }

    //Video
    get Src(): URL {
        return this.video.Src;
    }

    get Codec(): string {
        return this.video.Codec;
    }

    get Container(): string {
        return this.video.Container;
    }
}