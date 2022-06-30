import { Component } from "../type/Component";
import { Timeline } from "./Timeline";

export class ControlBar implements Component {
    private container: HTMLDivElement;
    private timeline: Timeline;
    constructor () {

        this.container = this.createContainer();
        this.timeline = this.createTimeline();
        this.container.append (this.timeline.element());
    }

    element (){
        return this.container;
    }

    get Timeline(): Timeline{
        return this.timeline;
    }

    private createContainer (): HTMLDivElement {
        let container: HTMLDivElement = document.createElement('div');
        container.classList.add("vp-controls");
        return container;
    }

    private createTimeline (): Timeline{
        let timeline: Timeline = new Timeline();
        return timeline;
    }
}