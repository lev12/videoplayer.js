import {VideoFormat} from './VideoFormat';

export class VideoTrack{
    private name: string;
    private format: VideoFormat;
    private src: URL;
    constructor (name: string, type: string, src: string){
        this.name = name;
        this.format = new VideoFormat();
        this.src = new URL(src);
    }
}