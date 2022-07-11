import { Component } from "../../type/Component";
import { IconType } from "../Icon";
import { SettingsControlButton } from "./SettingsControlButton";
import { SettingsMenu } from "./SettingsMenu";
import { SettingsSpeed } from "./SettingsSpeed";

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
            this.speedButton.on("click", () => {
                if (typeof this.speedMenu !== "undefined")
                this.viewOtherMenu(this.speedMenu);
            })
            this.speedMenu.BackButton.on("click", () => {
                this.hideMenu();
            })
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
    }

    private hideMenu () {
        this.activeMenu.element().parentNode?.append(this.element());
        this.activeMenu.element().parentNode?.removeChild(this.activeMenu.element());
        this.activeMenu = this;
    }
}