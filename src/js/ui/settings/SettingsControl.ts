import { Component } from "../../type/Component";
import { IconType } from "../Icon";
import { SettingsControlButton } from "./SettingsControlButton";
import { SettingsMenu } from "./SettingsMenu";
import { SettingsSpeed, SettingsSpeedEvent } from "./SettingsSpeed";

export class SettingsControl extends SettingsMenu {
    private activeMenu: SettingsMenu;

    private audioTrackButton: SettingsControlButton | undefined;
    private videoTrackButton: SettingsControlButton | undefined;
    private subtitlesButton: SettingsControlButton | undefined;
    private speedButton: SettingsControlButton | undefined;
    private qualityButton: SettingsControlButton | undefined;

    //private audioTrackMenu: Settings
    private speedMenu: SettingsSpeed | undefined;

    constructor () {
        super();

        this.activeMenu = this;

        this.addAudioTrack();
        this.addVideoTrack();
        this.addSubtitles();
        this.addSpeed();
        this.addQuality();
    }

    public addAudioTrack () {
        if (typeof this.audioTrackButton === "undefined") {
            this.audioTrackButton = SettingsControlButton.getAudioTrackButton();
            this.addElementInMenu(this.audioTrackButton);
        }
    }

    public addVideoTrack () {
        if (typeof this.videoTrackButton === "undefined") {
            this.videoTrackButton = SettingsControlButton.getVideoTrackButton();
            this.addElementInMenu(this.videoTrackButton);
        }
    }

    public addSubtitles () {
        if (typeof this.subtitlesButton === "undefined") {
            this.subtitlesButton = SettingsControlButton.getSubtitlesButton();
            this.addElementInMenu(this.subtitlesButton);
        }
    }

    public addSpeed () {
        if (typeof this.speedButton === "undefined") {
            this.speedButton = SettingsControlButton.getSpeedButton();
            this.addElementInMenu(this.speedButton);
            this.speedMenu = new SettingsSpeed();
            this.speedMenu.on("click", (e: SettingsSpeedEvent) => {
                if ((typeof this.speedMenu !== "undefined") && (typeof this.speedButton !== "undefined")) {
                    this.speedButton.Text = SettingsControlButton.getTextSpeedButton(e.speed);
                    this.emit("change", new SettingsControlEvent(this.activeMenu, e.speed));
                }

            });
            this.speedButton.on("click", () => {
                if (typeof this.speedMenu !== "undefined")
                this.viewOtherMenu(this.speedMenu);
            });
            this.speedMenu.BackButton.on("click", () => {
                this.hideMenu();
            });
        }
    }

    public addQuality () {
        if (typeof this.qualityButton === "undefined") {
            this.qualityButton = SettingsControlButton.getQualityButton();
            this.addElementInMenu(this.qualityButton);
        }
    }

    private viewOtherMenu (menu: SettingsMenu) {
        this.container.parentNode?.append(menu.element());
        this.container.parentNode?.removeChild(this.activeMenu.element());
        this.activeMenu = menu;
        if (typeof this.speedMenu !== "undefined")
            this.emit("change", new SettingsControlEvent(this.activeMenu, this.speedMenu.Speed));
    }

    private hideMenu () {
        this.activeMenu.element().parentNode?.append(this.element());
        this.activeMenu.element().parentNode?.removeChild(this.activeMenu.element());
        this.activeMenu = this;
        if (typeof this.speedMenu !== "undefined")
            this.emit("change", new SettingsControlEvent(this.activeMenu, this.speedMenu.Speed));
    }
}

export class SettingsControlEvent extends Event{
    private _settingsMenuActive: SettingsMenu;
    private _quality: string;
    private _speed: number;

    constructor (activeMenu:SettingsMenu, speed:number, quality: string = ""){
        super("change");
        this._settingsMenuActive = activeMenu;
        this._speed = speed;
        this._quality = quality;
    }

    public get SettingsMenuActive(): SettingsMenu {
        return this._settingsMenuActive;
    }

    public get speed(): number {
        return this._speed;
    }

    public get quality(): string {
        return this._quality;
    }
}