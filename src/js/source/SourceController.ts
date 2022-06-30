import { Source } from './Source';
import { SourceGroup } from  './SourceGroup'
import { VideoQuality } from './VideoQuality';
import {StreamTechType, IVideoTrack} from '../type/Source';
import { VideoTrackHLS } from './VideoTrackHLS';
import { VideoTrackPD } from './VideoTrackPD';
import { Video } from './Video';

interface IMainJSON {
    video_src_data: Array<IVideoGroupJSON>;
}

interface IVideoGroupJSON {
    group_name: string;
    video_tracks: Array<IVideoJSON>;
    audio_tracks: Array<IAudioJSON>;
    captions_tracks: Array<ICaptionsJSON>;
}

interface IVideoJSON {
    video_track_name: string;
    progressive_download: IVideoQualityPDJSON;
    hls: IVideoTrackHLSJSON;
}

interface IVideoQualityPDJSON {
    quality: Array<IVideoTrackPDJSON>;
}

interface IVideoTrackPDJSON {
    video_quality_name: string;
    formats: Array<IVideoCodecPDJSON>;
}

interface IVideoCodecPDJSON {
    codec: string;
    container: string;
    src: string;
}

interface IVideoTrackHLSJSON {
    src: string;
}

interface IAudioJSON {
    name: string;
    type: string;
    src: string;
}

interface ICaptionsJSON {
    name: string;
    type: string;
    src: string;
}

export class SourceController{
    src: Array<SourceGroup>;
    pdTech: boolean;
    hlsTech: boolean;

    constructor(srcData:string){
        let data:IMainJSON = JSON.parse(srcData);
        let srcGroup:Array<IVideoGroupJSON> = data.video_src_data;
        this.src = new Array<SourceGroup>;
        srcGroup.forEach( (item, i, a) =>{
            let srcGroup = new SourceGroup(item.group_name);
            if (item.hasOwnProperty('video_tracks')){
                item.video_tracks.forEach( (item, i, a) => {
                    let videoTrack:VideoTrackPD = srcGroup.addVideoTrackPD(item.video_track_name);
                    item.progressive_download.quality.forEach( (item, i, a) =>{
                        let videoQuality:VideoQuality = videoTrack.addQuality(item.video_quality_name);
                        item.formats.forEach((item, i, a) => {
                            videoQuality.addVideoFormat(item.codec,item.container,item.src);
                        })
                    })
                    if (item.hasOwnProperty('hls')){
                        srcGroup.addVideoTrackHLS(item.hls.src);
                    }
                    
                })
            }

            if (item.hasOwnProperty('audio_tracks')){
                item.audio_tracks.forEach( (item, i, a) => {
                    srcGroup.addAudioTrack(item.name, item.type, item.src);
                })
            }

            if (item.hasOwnProperty('captions_tracks')){
                item.captions_tracks.forEach( (item, i, a) => {
                    srcGroup.addCaptionsTrack(item.name, item.type, item.src);
                })
            }
            this.src.push(srcGroup);
        });

        this.pdTech = true;
        this.hlsTech = false;
        console.log(srcGroup);
    }

    supportTech (ProgressiveDownload: boolean, HLS: boolean): void  {
        this.pdTech = ProgressiveDownload;
        this.hlsTech = HLS;
    }

    getSourceGroupNameList (): Array<string>{
        let srcGroupNames: Array<string> = new Array<string>;
        this.src.forEach ( (item, i, a) => {
            srcGroupNames.push(item.Name);
        })
        return srcGroupNames;
    }

    getVideoTrackNameList (sourceGroupName: string) : Array<string>{
        let videoTracks = new Array<string>;
        this.src.forEach( (item, i, a) => {
            if (item.Name === sourceGroupName)
            {
                if (this.pdTech)
                {
                    if (item.VideoTrackPDList !== undefined)
                    {
                        item.VideoTrackPDList.forEach((item, i, a) => {
                            videoTracks.push(item.Name);
                        })
                    }
                }
                if (this.hlsTech)
                {
                    if (item.VideoTrackHLSList !== undefined)
                    {
                        item.VideoTrackHLSList.forEach((item, i, a) => {
                            videoTracks.push(item.Name);
                        })
                    }
                }
            }
        })
        return videoTracks;
    }

    getVideoQualityNameList (sourceGroupName: string, trackName:string): Array<string>{
        let videoQuality = new Array<string>;
        for (let itemSrcGroup of this.src){
            if (itemSrcGroup.Name === sourceGroupName)
            {
                for (let itemTrack of this.VideoTrackSupportTechList(itemSrcGroup.VideoTrackPDList, itemSrcGroup.VideoTrackHLSList))
                {
                    if (itemTrack.Name === trackName){
                        videoQuality = itemTrack.QualityNameList;
                    }
                }
            }
        }
        return videoQuality;
    }

    getVideoCodecNameList (sourceGroupName: string, trackName:string, qualityName: string): Array<string>{
        let videoCodecs = new Array<string>;
        for (let itemSrcGroup of this.src){
            if (itemSrcGroup.Name === sourceGroupName)
            {
                for (let itemTrack of this.VideoTrackSupportTechList(itemSrcGroup.VideoTrackPDList, itemSrcGroup.VideoTrackHLSList))
                {
                    if (itemTrack.Name === trackName){
                        for (let item of itemTrack.QualityVideoList){
                            if (item.Name === qualityName)
                            {
                                videoCodecs = item.VideoCodecNameList;
                            }
                            
                        }
                    }
                }
            }
        }
        return videoCodecs;
    }

    getSource (sourceGroupName: string, trackName:string, qualityName: string, codecName: string): Source {
        let groupName: string = "";
        let videoTrackName: string = "";
        let audioTrackName: string = "";
        let captionsTrackName: string = "";
        let videoQualityName: string = "";
        let videoCodecName: string = "";

        let srcTrack: Source | undefined;
        for (let itemSrcGroup of this.src){
            if (itemSrcGroup.Name === sourceGroupName){
                groupName = itemSrcGroup.Name;
                if (this.pdTech)
                {
                    if (typeof itemSrcGroup.VideoTrackPDList === "undefined") throw new Error("no video tracks");
                    for (let itemVideoTrack of itemSrcGroup.VideoTrackPDList){
                        if (itemVideoTrack.Name === trackName){
                            videoTrackName = itemVideoTrack.Name;
                            for (let itemQuality of itemVideoTrack.QualityList){
                                if (itemQuality.Name === qualityName) {
                                    videoQualityName = itemQuality.Name;
                                    for(let itemVideo of itemQuality.VideoList){
                                        if (itemVideo.Codec === codecName){
                                            videoCodecName = itemVideo.Codec;
                                            srcTrack = new Source(itemVideo);
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        if (typeof (srcTrack) === "undefined") throw new Error("no video tracks");
        srcTrack.GroupName = groupName;
        srcTrack.VideoTrackName = videoTrackName;
        srcTrack.AudioTrackName = audioTrackName;
        srcTrack.CaptionsTrackName = captionsTrackName;
        srcTrack.VideoQualityName = videoQualityName;
        srcTrack.VideoCodecName = videoCodecName;
        return srcTrack;
    }

    private VideoTrackSupportTechList (pdList: Array<string> | Array<VideoTrackPD> | undefined, hlsList: Array<string> | Array<VideoTrackHLS> | undefined): Array<IVideoTrack>
    {
        let videoTrackName = new Array<IVideoTrack>;

        if ((typeof pdList !== "undefined") && (typeof hlsList === "undefined")) {
            for (let itemPD of pdList as Array<VideoTrackPD>){
                videoTrackName.push (itemPD); 
            }
        }

        if ((typeof hlsList !== "undefined")  && (typeof pdList === "undefined")) {
            for (let itemHLS of hlsList as Array<VideoTrackHLS>){
                videoTrackName.push (itemHLS); 
            }
        }

        if ((typeof pdList !== "undefined") && (typeof hlsList !== "undefined")) {
            let pdNameList: Array<IVideoTrack> = new Array<IVideoTrack>;
            let hlsNameList: Array<IVideoTrack> = new Array<IVideoTrack>;

            if (pdList instanceof Array<IVideoTrack>) {
                pdNameList = pdList as Array<IVideoTrack>;
            }
            else {
                for (let item of pdList as Array<VideoTrackPD>)
                {
                    pdNameList.push (item);
                }
            }

            if (hlsList instanceof Array<IVideoTrack>){
                hlsNameList = hlsList as Array<IVideoTrack>;
            }
            else {
                for (let item of hlsList as Array<VideoTrackPD>)
                {
                    hlsNameList.push (item);
                }
            }

            
            if (this.pdTech){
                pdNameList.forEach ( (item, i, a) => {
                    videoTrackName.push (item);
                });
            }
            if (this.hlsTech) {
                for (let item of hlsNameList) {
                    let isFind: boolean = false;  
                    for (let itemMain of videoTrackName) {
                        if (itemMain !== item)
                        {
                            isFind = true;
                            break;
                        }  
                    }
                    if (isFind) videoTrackName.push(item);
                }
            }
        }
        
        return videoTrackName; 
    }
}