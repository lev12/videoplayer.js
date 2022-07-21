import { ButtonEvent } from "./Button";
import { ControlBar } from "./ControlBar";
import { FullscreenButtonEvent } from "./FullscreenButton";
import { SettingsControlEvent } from "./settings/SettingsControl";
import { Timeline, TimelineEvent } from "./Timeline";
import { VolumeControllerEvent } from "./VolumeController";
import { EventEmitter } from 'events';

export class Player extends EventEmitter {
    private video: HTMLVideoElement;
    private controls: ControlBar;

    private groupList: Array<string>;
    private videoTrackList: Array<Array<string>>;
    private qualityList: Array<Array<Array<string>>>;

    constructor (attachVideo: HTMLVideoElement){
        super();
        this.groupList = new Array<string>;
        this.videoTrackList = new Array<Array<string>>;
        this.qualityList = new Array<Array<Array<string>>>;

        let container: HTMLDivElement = this.createContainer();

        this.video = this.createVideo();
        this.video.addEventListener ("loadedmetadata", this.initVideoMetadata.bind(this));
        container.append(this.video);

        this.controls = this.createControls();
        this.video.addEventListener("play", () => {
            let timer = setTimeout(() => {
                this.controls.hide();
                container.style.cursor = "none";
            }, 3000);
            this.video.addEventListener("pause", () => {
                clearInterval(timer);
            });
        })
        this.video.addEventListener("pause", () => {
            this.controls.view();
            container.style.cursor = "";
        })
        this.video.addEventListener("ended", () => {
            this.controls.view();
            container.style.cursor = "";
        })
        container.addEventListener("mouseenter", () => {
            this.controls.view();
            container.style.cursor = "";
        })
        container.addEventListener("mouseleave", () => {
            let timer: NodeJS.Timeout;
            if (this.video.paused === false)
            timer = setTimeout(() => {
                this.controls.hide();
                container.style.cursor = "none";
            }, 3000);
            this.video.addEventListener("pause", () => {
                clearInterval(timer);
            });
        })
        container.addEventListener("mousemove", () => {
            let timer: NodeJS.Timeout;
            if (this.video.paused === false) timer = setTimeout(() => {
                this.controls.hide();
                container.style.cursor = "none";
            }, 3000);
            this.video.addEventListener("pause", () => {
                clearInterval(timer);
            });
            if (this.controls.isView === false) {
                this.controls.view();
                container.style.cursor = "";
            }
        })


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
        container.addEventListener("click", (e: MouseEvent) => {
            let timer = setTimeout (() => {
                if (e.target === this.video) {
                    if (this.controls.isViewSettingsControl) this.controls.hideSettingsControl();
                    else if (this.video.paused === true){
                        this.video.play();
                        this.controls.PauseButton.IsPlay = true;
                    }  
                    else {
                        this.video.pause();
                        this.controls.PauseButton.IsPlay = false;
                    }
                }
            }, 200);
            container.addEventListener("dblclick", (e: MouseEvent) => {
                clearTimeout(timer);
            });
        });


        
        this.controls.VolumeController.on("change", (e: VolumeControllerEvent) => {
            this.video.volume = e.Volume/100;
            this.video.muted = e.Mute;
        });


        this.controls.PictureInPictureButton.on("click", () => {
            this.video.requestPictureInPicture();
        });

        this.controls.FullscreenButton.on("click", (e: FullscreenButtonEvent) => {
            if (e.IsFullscreen) {
                if (typeof container.requestFullscreen !== "undefined") container.requestFullscreen();
            }
            else document.exitFullscreen();
        });

        container.addEventListener("dblclick", (e: MouseEvent) => {
            if (e.detail === 2) this.controls.FullscreenButton.click();
        })


        this.controls.SettingsControl.on("change", (e: SettingsControlEvent) => {
            this.video.playbackRate = e.Speed;
        });

        this.controls.SettingsControl.on("changeSource", (e: SettingsControlEvent) => {
            this.emit("changeSource", new PlayerSourceEvent(e.Version, e.VideoTrack, e.Quality));
        });

        container.append(this.controls.element());
        attachVideo.replaceWith(container);
    }

    get VideoElement (){
        return this.video;
    }

    set Src (value: string) {
        let currentTimePresent = (this.video.currentTime / this.video.duration) * 100;
        if (currentTimePresent.toString() === "NaN") currentTimePresent = 0;
        this.video.src = value;
        this.video.addEventListener ("loadedmetadata", () => {
            this.video.currentTime = currentTimePresent / 100 * this.video.duration;
        });
    }

    set Poster (poster: string){
        this.video.poster = poster;
    }

    public addGroups (list: Array<string>) {
        for (let i = 0; i < list.length; i++) {
            const element = list[i];
            this.groupList.push(element);
        }
        this.controls.Groups = this.groupList;
    }

    public addVideoTracks (group: string, list: Array<string>) {
        for (let i = 0; i < list.length; i++) {
            this.videoTrackList.push([group, list[i]]);
        }
        this.controls.VideoTracks = this.videoTrackList;
    }

    public addQuality (group: string, videoTrack: string, list: Array<string>) {
        for (let i = 0; i < list.length; i++) {
            this.qualityList.push([[group,videoTrack,list[i]]]);
        }
        this.controls.Quality = this.qualityList;
    }

    private createContainer(): HTMLDivElement {
        let container: HTMLDivElement = document.createElement('div');
        container.classList.add("videoplayer-container");
        return container;
    }

    private createVideo(): HTMLVideoElement {
        let video: HTMLVideoElement = document.createElement('video');
        video.classList.add("videoplayer");
        //video.autoplay = true;
        return video;
    }

    private createControls(): ControlBar {
        let controls: ControlBar = new ControlBar();
        return controls;
    }

    private initVideoMetadata (){
        this.controls.Timeline.Duration = this.video.duration;
        this.controls.Timeline.CurrentSecond = this.video.currentTime;
        this.controls.PauseButton.IsPlay = !this.video.paused;
        this.controls.TimeLabel.DurationSeconds = this.video.duration;
        this.controls.VolumeController.Volume = this.video.volume * 100;

        this.video.addEventListener ("timeupdate", this.updateTime.bind(this));
        this.video.addEventListener ("timeupdate", this.updateBuffered.bind(this));
        this.video.addEventListener ("progress", this.updateBuffered.bind(this));
    }

    private updateTime (event: Event): void{
        this.controls.Timeline.CurrentSecond = this.video.currentTime;
        this.controls.TimeLabel.CurrentSeconds = this.video.currentTime;
    }

    private updateBuffered (): void{
        this.controls.Timeline.CurrentBuffered = this.video.buffered;
    }
}

export class PlayerSourceEvent extends Event {
    private _group: string;

    private _videoTrack: string;

    private _quality: string;

    constructor(group: string, videoTrack: string, quality: string) {
        super("changeSource");
        this._group = group;
        this._videoTrack = videoTrack;
        this._quality = quality;
    }

    public get group(): string {
        return this._group;
    }

    public get videoTrack(): string {
        return this._videoTrack;
    }

    public get quality(): string {
        return this._quality;
    }
}