import { Component } from "../type/Component";
import { PauseButton } from "./PauseButton";
import { Time } from "./Time";
import { Timeline } from "./Timeline";
import { VolumeController } from "./VolumeController";

export class ControlBar implements Component {
    private container: HTMLDivElement;
    private timeline: Timeline;

    private containerBottom: HTMLDivElement;
    private pauseButton: PauseButton;
    private volumeController: VolumeController;
    private time: Time;

    constructor () {
        this.container = this.createContainer();
        this.timeline = this.createTimeline();
        this.pauseButton = this.createPauseButton();
        this.volumeController = this.createVolume(100);
        this.time = this.createTime();
        this.containerBottom = this.createContainerBottom(this.pauseButton, this.volumeController, this.time);

        this.container.append (this.timeline.element());
        this.container.append (this.containerBottom);
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

    public get Time(): Time {
        return this.time;
    }

    private createContainer (): HTMLDivElement {
        let container: HTMLDivElement = document.createElement('div');
        container.classList.add("vp-controls");
        return container;
    }

    private createContainerBottom (pButton: PauseButton, vController: VolumeController, t: Time): HTMLDivElement {
        let container: HTMLDivElement = document.createElement('div');
        container.classList.add("vp-control-bottom-container");
        
        container.append (pButton.element());
        container.append (vController.element());
        container.append (t.element());
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

    private createTime (): Time {
        let time: Time = new Time();
        return time;
    }
}