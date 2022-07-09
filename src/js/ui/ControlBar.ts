import { Component } from "../type/Component";
import { PauseButton } from "./PauseButton";
import { Timeline } from "./Timeline";

export class ControlBar implements Component {
    private container: HTMLDivElement;
    private timeline: Timeline;

    private containerBottom: HTMLDivElement;
    private pauseButton: PauseButton;

    constructor () {
        this.container = this.createContainer();
        this.timeline = this.createTimeline();
        this.pauseButton = this.createPauseButton();
        this.containerBottom = this.createContainerBottom(this.pauseButton);
        this.container.append (this.timeline.element());
        this.container.append (this.containerBottom);
    }

    element (){
        return this.container;
    }

    get Timeline(): Timeline{
        return this.timeline;
    }

    public get PauseButton(): PauseButton {
        return this.pauseButton;
    }

    private createContainer (): HTMLDivElement {
        let container: HTMLDivElement = document.createElement('div');
        container.classList.add("vp-controls");
        return container;
    }

    private createContainerBottom (pButton: PauseButton): HTMLDivElement {
        let container: HTMLDivElement = document.createElement('div');
        container.classList.add("vp-control-bottom-container");
        
        container.append (pButton.element());
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
}