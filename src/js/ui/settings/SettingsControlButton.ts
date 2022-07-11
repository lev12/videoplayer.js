import { Component } from "../../type/Component";
import { Button, ButtonEvent } from "../Button";
import { Icon, IconType } from "../Icon";

export class SettingsControlButton extends Button implements Component {
    private constructor (text: string, icon?: IconType) {
        super(false);
        this.Text = text;
        if (typeof icon !== "undefined") this.Icon = new Icon(icon);
        
        this.addClass("vp-button-list-item");
        this.addClass("vp-button-settings");
        this.buttonElement.addEventListener("click",(e: Event) => {
            this.emit("click", new SettingsControlButtonEvent("click"));
        });
    }

    public static getAudioTrackButton (): SettingsControlButton {
        return new SettingsControlButton("Основная", IconType.audioTrack);
    }

    public static getVideoTrackButton (): SettingsControlButton {
        return new SettingsControlButton("Основная", IconType.videoTrack);
    }

    public static getSubtitlesButton (): SettingsControlButton {
        return new SettingsControlButton("Выключены", IconType.subtitles);
    }

    public static getSpeedButton (): SettingsControlButton {
        return new SettingsControlButton("Нормальная", IconType.speed);
    }

    public static getQualityButton (name: string = "автонастройка"): SettingsControlButton {
        return new SettingsControlButton(name, IconType.quality);
    }

    public static getBackButton (): SettingsControlButton {
        return new SettingsControlButton("Назад", IconType.back);
    }

    public static getSpeedSelect (speed: number): SettingsControlButton {
        if (speed === 1) return new SettingsControlButton("Нормальная");
        else return new SettingsControlButton(speed+"");
    }
}

export class SettingsControlButtonEvent extends ButtonEvent {
    constructor(name:string){
        super(name);
    }
}