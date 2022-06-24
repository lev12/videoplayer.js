import { SourceGroup } from  './SourceGroup'

interface IMainJSON {
    video_group: Array<IVideoGroupJSON>;
}

interface IVideoGroupJSON {
    name: string;
    videoTracks: Array<IVideoJSON>;
    audioTracks: Array<IAudioJSON>;
    captionsTracks: Array<ICaptionsJSON>;
}

interface IVideoJSON {
    pd: Array<IVideoTrackPDJSON>;
    hls: IVideoTrackHLSJSON;
}

interface IVideoTrackPDJSON {
    name: string;
    type: string;
    src: string;
}

interface IVideoTrackHLSJSON {
    name: string;
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
    constructor(srcData:string){
        let data:IMainJSON = JSON.parse(srcData);
        let srcGroup:Array<IVideoGroupJSON> = data['video_group'];
        this.src = new Array<SourceGroup>;
        srcGroup.forEach( (item, i, a) =>{
            let srcGroup = new SourceGroup(item.name);
            if (item.hasOwnProperty('videoTracks')){
                item.videoTracks.forEach( (item, i, a) => {
                    item.pd.forEach( (item, i, a) =>{
                        srcGroup.addVideoTrack(item.name, item.type, item.src);
                    })
                    if (item.hasOwnProperty('hls')){
                        srcGroup.addVideoTrack(item.hls.name, "HLS", item.hls.src);
                    }
                    
                })
            }

            if (item.hasOwnProperty('audioTracks')){
                item.audioTracks.forEach( (item, i, a) => {
                    srcGroup.addAudioTrack(item.name, item.type, item.src);
                })
            }

            if (item.hasOwnProperty('captionsTracks')){
                item.captionsTracks.forEach( (item, i, a) => {
                    srcGroup.addCaptionsTrack(item.name, item.type, item.src);
                })
            }
            this.src.push(srcGroup);
        }) 
        console.log(this.src);
        console.log(srcData);
    }
}