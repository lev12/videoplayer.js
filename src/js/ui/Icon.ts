import { Component } from "../type/Component";

export enum IconType {
    none,
    pause,
    play,
    volumeLow,
    volumeMid,
    volumeHigh,
    volumeMute,
    settings,
    pictureInPicture,
    fullscreen,
    audioTrack,
    videoTrack,
    subtitles,
    speed,
    quality,
    back,
    check,
    close
}

export class Icon implements Component {
    private iconElement: HTMLSpanElement;

    constructor(icon: IconType = IconType.none) {
        this.iconElement = this.createIconElement(icon);
    }

    element(): HTMLElement {
        return this.iconElement;
    }

    private typeToCSSClassName (icon: IconType): string{
        let className: string;
        switch (icon){
            case IconType.pause:  className = "vp-icon-pause"; break;
            case IconType.play:  className = "vp-icon-play"; break;
            case IconType.volumeLow:  className = "vp-icon-volume-low"; break;
            case IconType.volumeMid:  className = "vp-icon-volume-mid"; break;
            case IconType.volumeHigh:  className = "vp-icon-volume-high"; break;
            case IconType.volumeMute:  className = "vp-icon-volume-mute"; break;
            case IconType.settings:  className = "vp-icon-settings"; break;
            case IconType.pictureInPicture:  className = "vp-icon-picture-in-picture"; break;
            case IconType.fullscreen:  className = "vp-icon-fullscreen"; break;
            case IconType.audioTrack:  className = "vp-icon-audio-track"; break;
            case IconType.videoTrack:  className = "vp-icon-video-track"; break;
            case IconType.subtitles:  className = "vp-icon-subtitles"; break;
            case IconType.speed:  className = "vp-icon-speed"; break;
            case IconType.quality:  className = "vp-icon-quality"; break;
            case IconType.back:  className = "vp-icon-back"; break;
            case IconType.check:  className = "vp-icon-check"; break;
            case IconType.close:  className = "vp-icon-close"; break;
            default: className = "vp-icon-close";
        }
        return className;
    }

    private createIconElement(icon: IconType): HTMLSpanElement {
        let iconElement = document.createElement('span');
        iconElement.classList.add("vp-icon-placeholder",this.typeToCSSClassName(icon));
        return iconElement;
    }
}