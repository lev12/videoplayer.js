import { Component } from "../../type/Component";
import { IconType } from "../Icon";
import { SettingsControlButton } from "./SettingsControlButton";
import { SettingsList, SettingsListEvent } from "./SettingsList";
import { SettingsMenu } from "./SettingsMenu";
import { SettingsSpeed, SettingsSpeedEvent } from "./SettingsSpeed";

export class SettingsControl extends SettingsMenu {
    private activeMenu: SettingsMenu;

    private versionButton: SettingsControlButton | undefined;
    private audioTrackButton: SettingsControlButton | undefined;
    private videoTrackButton: SettingsControlButton | undefined;
    private subtitlesButton: SettingsControlButton | undefined;
    private speedButton: SettingsControlButton | undefined;
    private qualityButton: SettingsControlButton | undefined;

    //private audioTrackMenu: Settings
    private versionMenu: SettingsList | undefined;
    private audioTrackMenu: SettingsList | undefined;
    private videoTrackMenu: SettingsList | undefined;
    private subtitlesMenu: SettingsList | undefined;
    private speedMenu: SettingsSpeed | undefined;
    private qualityMenu: SettingsList | undefined;

    private groupList: Array<string>;
    private videoTrackList: Array<Array<string>>;
    private qualityList: Array<Array<Array<string>>>;

    constructor () {
        super();

        this.activeMenu = this;

        this.groupList = new Array<string>;
        this.videoTrackList = new Array<Array<string>>;
        this.qualityList = new Array<Array<Array<string>>>;

        this.addAudioTrack(this.videoTrackList);
        this.addSubtitles(this.videoTrackList);
        this.addSpeed();
    }

    public addVersion (value: Array<string>) {
        this.groupList = value;
        if (typeof this.versionButton === "undefined") {
            this.versionButton = SettingsControlButton.getVersionButton();
            this.addElementInMenu(this.versionButton);
            this.versionMenu = new SettingsList();
            for (let i = 0; i < value.length; i++) {
                this.versionMenu.addButton(value[i]);
            }
            
            this.versionButton.Text = this.versionMenu.select(0);
            this.versionMenu.on("change", (e: SettingsListEvent) => {
                if ((typeof this.versionMenu !== "undefined") && (typeof this.versionButton !== "undefined")) {
                    this.versionButton.Text = e.Value;
                    this.updateVideoTrack();
                    this.updateQuality();
                    this.emit("changeSource", this.createEvent());
                }
            });
            this.versionButton.on("click", () => {
                if (typeof this.versionMenu !== "undefined")
                this.viewOtherMenu(this.versionMenu);
            });
            this.versionMenu.BackButton.on("click", () => {
                this.hideMenu();
            });
        }
    }

    public addAudioTrack (value: Array<Array<string>>) {
        
        if (typeof this.audioTrackButton === "undefined") {
            this.audioTrackButton = SettingsControlButton.getAudioTrackButton();
            this.addElementInMenu(this.audioTrackButton);
        }
    }

    public addVideoTrack (value: Array<Array<string>>) {
        this.videoTrackList = value;
        if (typeof this.videoTrackButton === "undefined") {
            this.videoTrackButton = SettingsControlButton.getVideoTrackButton();
            this.addElementInMenu(this.videoTrackButton);
            this.videoTrackMenu = new SettingsList();

            let selectVersion: string;
            if (typeof this.versionMenu !== "undefined") selectVersion = this.versionMenu.Selected;
            else selectVersion = value[0][0];
            for (let i = 0; i < value.length; i++) {
                const elementVersion = value[i];
                if (selectVersion === elementVersion[0]) this.videoTrackMenu.addButton(elementVersion[1]);                
            }
            
            this.videoTrackButton.Text = this.videoTrackMenu.select(0);
            this.videoTrackMenu.on("change", (e: SettingsListEvent) => {
                if ((typeof this.versionMenu !== "undefined") && (typeof this.videoTrackButton !== "undefined")) {
                    this.videoTrackButton.Text = e.Value;
                    this.updateQuality();
                    this.emit("changeSource", this.createEvent());
                }
            });
            this.videoTrackButton.on("click", () => {
                if (typeof this.videoTrackMenu !== "undefined")
                this.viewOtherMenu(this.videoTrackMenu);
            });
            this.videoTrackMenu.BackButton.on("click", () => {
                this.hideMenu();
            });
        }
    }

    public addSubtitles (value: Array<Array<string>>) {
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

    public addQuality (value: Array<Array<Array<string>>>) {
        this.qualityList = value;
        if (typeof this.qualityButton === "undefined") {
            this.qualityButton = SettingsControlButton.getQualityButton();
            this.addElementInMenu(this.qualityButton);
            this.qualityMenu = new SettingsList();

            let selectVersion: string;
            if (typeof this.versionMenu !== "undefined") selectVersion = this.versionMenu.Selected;
            else selectVersion = value[0][0][0];
            let selectVideoTrack: string;
            if (typeof this.videoTrackMenu !== "undefined") selectVideoTrack = this.videoTrackMenu.Selected;
            else selectVideoTrack = value[0][0][1];

            for (let i = 0; i < value.length; i++) {
                const elementVersion = value[i];
                if (selectVersion === elementVersion[0][0]) {
                    for (let j = 0; j < elementVersion.length; j++) {
                        const element = elementVersion[j];
                        if (selectVideoTrack === element[1]) 
                        this.qualityMenu.addButton(element[2]);
                    }           
                }
            }

            this.qualityButton.Text = this.qualityMenu.select(0);
            this.qualityMenu.on("change", (e: SettingsListEvent) => {
                if ((typeof this.qualityMenu !== "undefined") && (typeof this.qualityButton !== "undefined")) {
                    this.qualityButton.Text = e.Value;
                    this.emit("changeSource", this.createEvent());
                }
            });
            this.qualityButton.on("click", () => {
                if (typeof this.qualityMenu !== "undefined")
                this.viewOtherMenu(this.qualityMenu);
            });
            this.qualityMenu.BackButton.on("click", () => {
                this.hideMenu();
            });
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

    private updateVideoTrack () {
        if ((typeof this.videoTrackMenu !== "undefined") && (typeof this.versionMenu !== "undefined")) {
            let selectVersion = this.versionMenu.Selected;
            this.videoTrackMenu.removeAllButtons();
            for (let i = 0; i < this.videoTrackList.length; i++) {
                const element = this.videoTrackList[i];
                if (element[0] === selectVersion) {
                    this.videoTrackMenu.addButton(element[1]);
                }
            }
            let text = this.videoTrackMenu.select(0);
            if (typeof this.videoTrackButton !== "undefined") this.videoTrackButton.Text = text;
        }
    }

    private updateQuality () {
        if ((typeof this.versionMenu !== "undefined") && (typeof this.videoTrackMenu !== "undefined") && (typeof this.qualityMenu !== "undefined")) {
            let selectVersion: string = this.versionMenu.Selected;
            let selectVideoTrack: string = this.videoTrackMenu.Selected;
            this.qualityMenu.removeAllButtons();
            for (let i = 0; i < this.qualityList.length; i++) {
                const elementVersion = this.qualityList[i];
                if (selectVersion === elementVersion[0][0]) {
                    for (let j = 0; j < elementVersion.length; j++) {
                        const element = elementVersion[j];
                        if (selectVideoTrack === element[1]) 
                        this.qualityMenu.addButton(element[2]);
                    }
                }
            }

            let text = this.qualityMenu.select(0);
            if (typeof this.qualityButton !== "undefined") this.qualityButton.Text = text;
        }
    }

    private createEvent (): SettingsControlEvent {
        return new SettingsControlEvent(this.activeMenu, this.speedMenu?.Speed, this.versionMenu?.Selected,
                                        this.videoTrackMenu?.Selected, this.qualityMenu?.Selected);
    }
}

export class SettingsControlEvent extends Event{
    private _settingsMenuActive: SettingsMenu;
    private _version: string;
    private _videoTrack: string;
    private _quality: string;
    private _speed: number;

    constructor (activeMenu:SettingsMenu, speed:number|undefined = undefined, version: string|undefined = undefined,
                 videoTrack: string|undefined = undefined,quality: string|undefined = undefined){
        super("change");
        this._settingsMenuActive = activeMenu;
        if (typeof speed !== "undefined") this._speed = speed;
        else this._speed = 1;
        if (typeof version !== "undefined") this._version = version;
        else this._version = "";
        if (typeof videoTrack !== "undefined") this._videoTrack = videoTrack;
        else this._videoTrack = "";
        if (typeof quality !== "undefined") this._quality = quality;
        else this._quality = "";
    }

    public get SettingsMenuActive(): SettingsMenu {
        return this._settingsMenuActive;
    }

    public get Speed(): number {
        return this._speed;
    }

    public get Version(): string {
        return this._version;
    }

    public get VideoTrack(): string {
        return this._videoTrack;
    }

    public get Quality(): string {
        return this._quality;
    }
}