import {StreamTechType, IVideoTrack} from '../type/Source';
import {VideoFormat} from './VideoFormat';
import { Video } from './Video';
import { VideoQuality } from './VideoQuality';

export class VideoTrackHLS implements IVideoTrack {
    private name: string;
    private format: VideoFormat;
    private src: URL;

    constructor (src: string){
        this.name = "";
        this.format = new VideoFormat();
        this.src = new URL(src);
    }
    get QualityNameList(): string[] {
        throw new Error('Method not implemented.');
    }
    get QualityVideoList(): VideoQuality[] {
        throw new Error('Method not implemented.');
    }

    get Name(): string {
        return this.name;
    }

    get StreamTech(): StreamTechType {
        return StreamTechType.HLS;
    }
}