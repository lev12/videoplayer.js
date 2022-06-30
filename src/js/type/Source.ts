import { VideoQuality } from "../source/VideoQuality";

export enum StreamTechType {
    ProgressiveDownload,
    HLS,
    DASH,
}

export interface IVideoTrack{
    get Name(): string;
    get StreamTech(): StreamTechType;
    get QualityNameList(): Array<string>;
    get QualityVideoList(): Array<VideoQuality>;
}

export interface IVideo{
    get Src(): URL;
    get Codec (): string;
    get Container (): string;
}