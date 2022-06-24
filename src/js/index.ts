import VideoPlayer from "./videoplayer";
declare global {
    interface Window { VideoPlayer: any; }
}

window["VideoPlayer"] = VideoPlayer;
