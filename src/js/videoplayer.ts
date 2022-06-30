import '../css/videoplayer-js.scss';
import { Source } from './source/Source';
import { SourceController } from './source/SourceController';
import { Player } from './ui/Palyer';


class VideoPlayer
{
    srcController: SourceController | undefined;
    srcPlayed: Source | undefined;
    player: Player | undefined;
    constructor (){
        
    }

    attachVideo(element: HTMLVideoElement){
        this.player = new Player(element);
    }

    addSourceData(data: string){
        this.srcController = new SourceController(data);

        console.log(this.srcController.getSourceGroupNameList());
        console.log(this.srcController.getVideoTrackNameList("1 version"));
        console.log(this.srcController.getVideoQualityNameList("1 version","1 camera"));
        console.log(this.srcController.getVideoCodecNameList("1 version","1 camera","1080p"));
        this.srcPlayed = this.srcController.getSource("1 version","1 camera","1080p","h264");
        console.log(this.srcPlayed);

        if (typeof this.player !== "undefined")
        {
            this.player.Src = this.srcPlayed.Src.href;
        }
        
    } 
}

export default VideoPlayer;