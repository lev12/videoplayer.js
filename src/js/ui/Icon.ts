import { Component } from "../type/Component";

export enum IconType {
    none,
    pause,
    play,
    volumeLow,
    volumeMid,
    volumeHigh,
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
            case IconType.volumeMid:  className = "vp-icon-pause"; break;
            case IconType.volumeHigh:  className = "vp-icon-pause"; break;
            case IconType.settings:  className = "vp-icon-pause"; break;
            case IconType.pictureInPicture:  className = "vp-icon-pause"; break;
            case IconType.fullscreen:  className = "vp-icon-pause"; break;
            case IconType.audioTrack:  className = "vp-icon-pause"; break;
            case IconType.videoTrack:  className = "vp-icon-pause"; break;
            case IconType.subtitles:  className = "vp-icon-pause"; break;
            case IconType.speed:  className = "vp-icon-pause"; break;
            case IconType.quality:  className = "vp-icon-pause"; break;
            case IconType.back:  className = "vp-icon-pause"; break;
            case IconType.check:  className = "vp-icon-pause"; break;
            case IconType.close:  className = "vp-icon-pause"; break;
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