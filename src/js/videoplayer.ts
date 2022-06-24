import '../css/videoplayer-js.scss';
import './source/Source';
import { SourceController } from './source/SourceController';

class VideoPlayer
{
    srcController: SourceController | undefined;
    constructor (){
        
    }

    attachVideo(element: HTMLVideoElement){
 
    }

    addSourceData(data: string){
        this.srcController = new SourceController(data);
    }
}

export default VideoPlayer;