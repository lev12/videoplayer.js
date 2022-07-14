import { Component } from "../type/Component";
import { FullscreenButton } from "./FullscreenButton";
import { PauseButton } from "./PauseButton";
import { PictureInPictureButton } from "./PictureInPictureButton";
import { SettingsButton, SettingsButtonEvent } from "./settings/SettingsButton";
import { SettingsControl, SettingsControlEvent } from "./settings/SettingsControl";
import { TimeLabel } from "./TimeLabel";
import { Timeline } from "./Timeline";
import { VolumeController } from "./VolumeController";

export class ControlBar implements Component {
    private container: HTMLDivElement;
    private timeline: Timeline;

    private containerBottom: HTMLDivElement;
    private pauseButton: PauseButton;
    private volumeController: VolumeController;
    private timeLabel: TimeLabel;
    private settingsButton: SettingsButton;
    private pictureInPictureButton: PictureInPictureButton;
    private fullscreenButtonButton: FullscreenButton;

    private settingsControl: SettingsControl | undefined;

    constructor () {
        this.container = this.createContainer();
        this.timeline = this.createTimeline();
        this.pauseButton = this.createPauseButton();
        this.volumeController = this.createVolume(100);
        this.timeLabel = this.createTime();
        this.settingsButton = this.createSettingsButton();
        this.pictureInPictureButton = this.createPictureInPictureButton();
        this.fullscreenButtonButton = this.createFullscreenButton();
        this.containerBottom = this.createContainerBottom(  this.pauseButton, this.volumeController, this.timeLabel,
                                                            this.settingsButton, this.pictureInPictureButton, this.fullscreenButtonButton);

        this.container.append (this.timeline.element());
        this.container.append (this.containerBottom);

        this.settingsButton.on("click", (e: SettingsButtonEvent) => {
            if (typeof this.settingsControl === "undefined") this.settingsControl = this.createSettingsControl();
            if (e.IsView){
                if ((this.containerBottom.previousSibling !== null) && (typeof this.settingsControl !== "undefined"))
                {
                    this.container.insertBefore (this.settingsControl.element(), this.containerBottom.previousSibling);
                }
                else if (typeof this.settingsControl !== "undefined") this.container.append(this.settingsControl.element());
            } 
            else if (typeof this.settingsControl !== "undefined") this.container.removeChild(this.settingsControl.element());

            if (this.settingsControl !== undefined) this.settingsControl.on("view", (e: SettingsControlEvent) => {
                if (e.SettingsMenuActive instanceof SettingsControl) {
                    this.settingsButton.enable();
                }
                else {
                    this.settingsButton.disable();
                }
            })
        });


    }

    element (){
        return this.container;
    }

    public get Timeline(): Timeline{
        return this.timeline;
    }

    public get PauseButton(): PauseButton {
        return this.pauseButton;
    }

    public get VolumeController(): VolumeController {
        return this.volumeController;
    }

    public get TimeLabel(): TimeLabel {
        return this.timeLabel;
    }

    public get SettingsButton(): SettingsButton {
        return this.settingsButton;
    }

    public get SettingsControl(): SettingsControl {
        if (typeof this.settingsControl === "undefined") this.settingsControl = this.createSettingsControl();
        return this.settingsControl;
    }

    public get PictureInPictureButton(): PictureInPictureButton {
        return this.pictureInPictureButton;
    }

    public get FullscreenButton(): FullscreenButton {
        return this.fullscreenButtonButton;
    }

    private createContainer (): HTMLDivElement {
        let container: HTMLDivElement = document.createElement('div');
        container.classList.add("vp-controls");
        return container;
    }

    private createContainerBottom ( pButton: PauseButton, vController: VolumeController, t: TimeLabel,
                                    sButton :SettingsButton, pipButton: PictureInPictureButton, fButton: FullscreenButton): HTMLDivElement {
        let container: HTMLDivElement = document.createElement('div');
        container.classList.add("vp-control-bottom-container");
        
        container.append (pButton.element());
        container.append (vController.element());
        container.append (t.element());

        let delimiter: HTMLDivElement = document.createElement('div');
        delimiter.classList.add("vp-control-space");
        container.append (delimiter);

        container.append (sButton.element());
        container.append (pipButton.element());
        container.append (fButton.element());
        return container;
    }

    private createTimeline (): Timeline{
        let timeline: Timeline = new Timeline();
        return timeline;
    }

    private createPauseButton (): PauseButton{
        let pauseButton: PauseButton = new PauseButton();
        return pauseButton;
    }

    private createVolume (volume: number): VolumeController{
        let vol: VolumeController = new VolumeController(volume);
        return vol;
    }

    private createTime (): TimeLabel {
        let time: TimeLabel = new TimeLabel();
        return time;
    }

    private createSettingsButton (): SettingsButton {
        let settingsButton: SettingsButton = new SettingsButton();
        return settingsButton;
    }

    private createPictureInPictureButton (): PictureInPictureButton {
        let pictureInPictureButton: PictureInPictureButton = new PictureInPictureButton();
        return pictureInPictureButton;
    }

    private createFullscreenButton (): FullscreenButton {
        let fullscreenButton: FullscreenButton = new FullscreenButton();
        return fullscreenButton;
    }

    private createSettingsControl(): SettingsControl {
        let settingsControl: SettingsControl = new SettingsControl();
        return settingsControl;
    }
}