import {StreamTechType, IVideoTrack} from '../type/Source';
import {VideoFormat} from './VideoFormat';
import { Video } from './Video';
import { VideoQuality } from './VideoQuality';

export class VideoTrackPD implements IVideoTrack {
    name: string;
    format: VideoFormat;
    qualityList: Array<VideoQuality>;

    constructor (name: string){
        
        this.name = name;
        this.format = new VideoFormat();
        this.qualityList = new Array<VideoQuality>;
        
    }


    get Name(): string {
        return this.name;
    }
    get StreamTech(): StreamTechType {
        return StreamTechType.ProgressiveDownload;
    }

    get QualityNameList(): string[] {
        let qualityNameList: string[] = new Array<string>;
        for (let itemName of this.qualityList){
            qualityNameList.push(itemName.Name);
        }
        return qualityNameList;
    }

    get QualityVideoList(): VideoQuality[] {
        let qualityVideoList: VideoQuality[] = new Array<VideoQuality>;
        for (let itemVideo of this.qualityList){
            qualityVideoList.push(itemVideo);
        }
        return qualityVideoList;
    }

    addQuality (name:string) : VideoQuality
    {
        let qualityVideo:VideoQuality  = new VideoQuality(name)
        this.qualityList.push(qualityVideo);
        return qualityVideo;
    }

    get QualityList (): Array<VideoQuality> {
        return this.qualityList;
    }

    getVideoFormatList (qualityName: string): Array<string> {
        let videoFormats = new Array<string>;
        //TODO
        return videoFormats;
    }
}