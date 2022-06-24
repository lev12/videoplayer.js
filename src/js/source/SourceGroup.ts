import {VideoTrack} from './VideoTrack';
import {AudioTrack} from './AudioTrack';
import {CaptionsTrack} from './CaptionsTrack';

import {AudioFormat} from './AudioFormat';
import {CaptionsFormat} from './CaptionsFormat';

export class SourceGroup{
    private name: string;
    private videoTrackList: Array<VideoTrack> | undefined;
    private audioTrackList: Array<AudioTrack> | undefined;
    private captionsTrackList: Array<CaptionsTrack> | undefined;
    constructor(groupName: string){
        this.name = groupName;
    }

    addVideoTrack (name: string, type: string, src: string){
        if (typeof(this.videoTrackList) === "undefined") this.videoTrackList = new Array<VideoTrack>;
        let track = new VideoTrack(name, type, src);
        this.videoTrackList.push(track);
    }

    addAudioTrack (name: string, type: string, src: string){
        let videoFormat = new AudioFormat();
    }

    addCaptionsTrack (name: string, type: string, src: string){
        let videoFormat = new CaptionsFormat();
    }
}