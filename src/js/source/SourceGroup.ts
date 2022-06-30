import {StreamTechType, IVideoTrack} from '../type/Source';
import { VideoTrackPD } from './VideoTrackPD';
import { VideoTrackHLS } from './VideoTrackHLS';

import {AudioTrack} from './AudioTrack';
import {CaptionsTrack} from './CaptionsTrack';

import {AudioFormat} from './AudioFormat';
import {CaptionsFormat} from './CaptionsFormat';

export class SourceGroup{
    private name: string;
    private videoTrackPDList: Array<VideoTrackPD> | undefined;
    private videoTrackHLSList: Array<VideoTrackHLS> | undefined;
    private audioTrackList: Array<AudioTrack> | undefined;
    private captionsTrackList: Array<CaptionsTrack> | undefined;
    constructor(groupName: string){
        this.name = groupName;
    }

    addVideoTrackPD (name: string) : VideoTrackPD {
        if (typeof(this.videoTrackPDList) === "undefined") this.videoTrackPDList = new Array<VideoTrackPD>;
        let track = new VideoTrackPD(name);
        this.videoTrackPDList.push(track);
        return track;
    }

    addVideoTrackHLS (name: string) : VideoTrackHLS {
        if (typeof(this.videoTrackHLSList) === "undefined") this.videoTrackHLSList = new Array<VideoTrackHLS>;
        let track = new VideoTrackHLS(name);
        this.videoTrackHLSList.push(track);
        return track;
    }

    addAudioTrack (name: string, type: string, src: string){
        let videoFormat = new AudioFormat();
    }

    addCaptionsTrack (name: string, type: string, src: string){
        let videoFormat = new CaptionsFormat();
    }



    get Name(){
        return this.name;
    }

    get VideoTrackPDList (): Array<VideoTrackPD> | undefined{
        return this.videoTrackPDList;
    }

    get VideoTrackHLSList (): Array<VideoTrackHLS> | undefined{
        return this.videoTrackHLSList;
    }
}