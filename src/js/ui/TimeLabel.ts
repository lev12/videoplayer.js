import { Component } from "../type/Component";

export class TimeLabel implements Component {
    private container: HTMLDivElement;
    private remainingTimeElement: HTMLSpanElement;
    private durationTimeElement: HTMLSpanElement;

    private currentSeconds:number;
    private durationSeconds:number;
    constructor () {
        this.durationSeconds = 0;
        this.currentSeconds = 0;

        this.container = this.createContainer();
        this.remainingTimeElement = this.createRemainingTime(this.currentSeconds);
        this.durationTimeElement = this.createDurationTime(this.durationSeconds);

        this.container.append(this.remainingTimeElement);
        this.container.append(this.createDelimiter());
        this.container.append(this.durationTimeElement);

        this.update();
    }
    element(): HTMLElement {
        return this.container;
    }

    public get DurationSeconds (): number {
        return this.durationSeconds;
    }

    public set DurationSeconds (seconds: number) {
        this.durationSeconds = seconds;
        this.update();
    }
    
    public get CurrentSeconds (): number {
        return this.currentSeconds;
    }

    public set CurrentSeconds (seconds: number) {
        this.currentSeconds = seconds;
        this.update();
    }

    private createContainer (): HTMLDivElement {
        let container = document.createElement('div');
        container.classList.add("vp-time");
        return container;
    }

    private createRemainingTime(value: number): HTMLSpanElement {
        let remainingTime = document.createElement('span');
        remainingTime.classList.add("vp-remaining-time-display");
        return remainingTime;
    }

    private createDurationTime(value: number): HTMLSpanElement {
        let durationTime = document.createElement('span');
        durationTime.classList.add("vp-duration-display");
        return durationTime;
    }

    private createDelimiter(): HTMLSpanElement {
        let delimiter = document.createElement('span');
        delimiter.innerText = "/";
        return delimiter;
    }

    private update(): void {
        this.remainingTimeElement.innerText = this.timeSecondsToString(this.currentSeconds);
        this.durationTimeElement.innerText = this.timeSecondsToString(this.durationSeconds);
    }

    private timeSecondsToString (timeSeconds: number): string {
        let time = "";
        let seconds = Math.floor(timeSeconds % 60);
        let minutes = Math.floor(timeSeconds / 60);
        let hours =Math.floor(timeSeconds / 3600);

        let secondsString = seconds.toString();
        if (Math.floor(seconds / 10) === 0) {
            secondsString = "0" + seconds.toString();
        }

        if ((minutes === 0) && (hours === 0)){
            time = "0:" + secondsString;
        }
        else if ((hours === 0)) {
            time = minutes.toString() + ":" + secondsString;
        }
        else {
            time = hours.toString() + ":" + minutes.toString() + ":" + secondsString;
        }
        return time;
    }
}