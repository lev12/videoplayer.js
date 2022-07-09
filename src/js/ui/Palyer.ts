import { ButtonEvent } from "./Button";
import { ControlBar } from "./ControlBar";
import { Timeline, TimelineEvent } from "./Timeline";

export class Player {
    private video: HTMLVideoElement;
    private controls: ControlBar;

    constructor (attachVideo: HTMLVideoElement){
        let container: HTMLDivElement = this.createContainer();

        this.video = this.createVideo();
        this.video.addEventListener ("loadedmetadata", this.initVideoMetadata.bind(this));
        container.append(this.video);

        this.controls = this.createControls();
        this.controls.Timeline.on("change", (e: TimelineEvent) => {
            this.VideoElement.currentTime = e.TimeSeconds;
            this.updateTime(e);
        });
        this.controls.PauseButton.IsPlay = this.video.paused;
        this.controls.PauseButton.on("click", (e: ButtonEvent) => {
            if (this.controls.PauseButton.IsPlay){
                this.video.pause();
            } else {
                this.video.play();
            }
        });

        container.append(this.controls.element());
        attachVideo.replaceWith(container);
    }

    get VideoElement (){
        return this.video;
    }

    set Src (value: string) {
        this.video.src = value;
    }

    set Poster (poster: string){
        this.video.poster = poster;
    }

    private createContainer(): HTMLDivElement {
        let container: HTMLDivElement = document.createElement('div');
        container.classList.add("videoplayer-container");
        return container;
    }

    private createVideo(): HTMLVideoElement {
        let video: HTMLVideoElement = document.createElement('video');
        video.classList.add("videoplayer");
        video.autoplay = true;
        return video;
    }

    private createControls(): ControlBar {
        let controls: ControlBar = new ControlBar();
        return controls;
    }

    private initVideoMetadata (){
        this.controls.Timeline.Duration = this.video.duration;

        this.video.addEventListener ("timeupdate", this.updateTime.bind(this));
        this.video.addEventListener ("timeupdate", this.updateBuffered.bind(this));
        this.video.addEventListener ("progress", this.updateBuffered.bind(this));
    }

    private updateTime (event: Event): void{
        this.controls.Timeline.CurrentSecond = this.video.currentTime;
    }

    private updateBuffered (): void{
        this.controls.Timeline.CurrentBuffered = this.video.buffered;
    }
}