import '../css/videoplayer-js.scss';
import { Source } from './source/Source';
import { SourceController } from './source/SourceController';
import { Player, PlayerSourceEvent } from './ui/Palyer';


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

        /*console.log(this.srcController.getSourceGroupNameList());
        console.log(this.srcController.getVideoTrackNameList("1 version"));
        console.log(this.srcController.getVideoQualityNameList("1 version","1 camera"));
        console.log(this.srcController.getVideoCodecNameList("1 version","1 camera","1080p"));*/
        this.srcPlayed = this.srcController.getSource("1 version","1 c 1 v","1 c 1 v 1080p","h264");
        console.log(this.srcPlayed);

        if (typeof this.player !== "undefined")
        {
            this.player.addGroups(this.srcController.getSourceGroupNameList());
            for (let i = 0; i < this.srcController.getSourceGroupNameList().length; i++) {
                const element = this.srcController.getSourceGroupNameList()[i];
                this.player.addVideoTracks(element,this.srcController.getVideoTrackNameList(element));
            }
            for (let i = 0; i < this.srcController.getSourceGroupNameList().length; i++) {
                const groupItem = this.srcController.getSourceGroupNameList()[i];
                for (let i = 0; i < this.srcController.getVideoTrackNameList(groupItem).length; i++) {
                    const videoTrackItem = this.srcController.getVideoTrackNameList(groupItem)[i];
                    this.player.addQuality(groupItem,videoTrackItem,this.srcController.getVideoQualityNameList(groupItem, videoTrackItem));
                }
            }
            this.player.Src = this.srcPlayed.Src.href;
            this.player.on('changeSource', (e: PlayerSourceEvent)=>{
                if ((typeof this.srcController !== "undefined") && (typeof this.player !== "undefined")) {
                    console.log(e);
                    this.srcPlayed = this.srcController.getSource(e.group,e.videoTrack,e.quality,"h264");
                    this.player.Src = this.srcPlayed.Src.href;
                }
            });
        }
        
    } 
}

export default VideoPlayer;