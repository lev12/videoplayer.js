import { Component } from "../type/Component";
import { PauseButton } from "./PauseButton";
import { Timeline } from "./Timeline";
import { VolumeController } from "./VolumeController";

export class ControlBar implements Component {
    private container: HTMLDivElement;
    private timeline: Timeline;

    private containerBottom: HTMLDivElement;
    private pauseButton: PauseButton;
    private volumeController: VolumeController;

    constructor () {
        this.container = this.createContainer();
        this.timeline = this.createTimeline();
        this.pauseButton = this.createPauseButton();
        this.volumeController = this.createVolume(100);
        this.containerBottom = this.createContainerBottom(this.pauseButton,this.volumeController);

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

    private createContainer (): HTMLDivElement {
        let container: HTMLDivElement = document.createElement('div');
        container.classList.add("vp-controls");
        return container;
    }

    private createContainerBottom (pButton: PauseButton, vController: VolumeController): HTMLDivElement {
        let container: HTMLDivElement = document.createElement('div');
        container.classList.add("vp-control-bottom-container");
        
        container.append (pButton.element());
        container.append (vController.element());
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
}