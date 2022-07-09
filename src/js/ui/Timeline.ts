import { Component } from "../type/Component";
import { EventEmitter } from 'events'

export class Timeline extends EventEmitter implements Component {
    
    private container: HTMLDivElement;
    private viewedLine: HTMLDivElement;
    private bufferedLineContainer: HTMLDivElement;
    private bufferedLineArray: Array<HTMLDivElement>;
    private timeMarker: HTMLDivElement;

    private duration: number;
    private currentSecond: number;
    private currentBuffered: TimeRanges | undefined;


    constructor (){
        super();
        this.duration = 0;
        this.currentSecond = 0;
        this.bufferedLineArray = new Array<HTMLDivElement>;

        this.timeMarker = this.createTimeMarker();

        this.container = this.createContainer();
        this.container.addEventListener("mouseover", this.viewTimeMarker.bind(this));
        this.container.addEventListener("mouseleave", this.hideTimeMarker.bind(this));

        this.viewedLine = this.createViewedLine();
        this.updateTime();
        this.bufferedLineContainer = this.createBufferedContainer();
        this.updateBuffer();

        this.container.append (this.bufferedLineContainer);
        this.container.append (this.viewedLine);
        this.container.append (this.timeMarker);
    }

    element (): HTMLElement{
        return this.container;
    }

    get CurrentSecond (){
        return this.currentSecond;
    }

    set CurrentSecond (value: number){
        this.currentSecond = value;
        this.updateTime();
    }

    set CurrentBuffered (value: TimeRanges){
        this.currentBuffered = value;
        this.updateBuffer();
    }

    set Duration (seconds: number){
        this.duration = seconds;
    }

    private createContainer (): HTMLDivElement {
        let container: HTMLDivElement = document.createElement('div');
        container.classList.add("vp-timeline");
        return container;
    }

    private createBufferedContainer (): HTMLDivElement {
        let container: HTMLDivElement = document.createElement('div');
        container.classList.add("vp-progress-buffer-container");
        return container;
    }

    private createViewedLine(): HTMLDivElement {
        let line: HTMLDivElement = document.createElement('div');
        line.classList.add("vp-progress-play");
        return line;
    }

    private createBufferedLine(): HTMLDivElement {
        let line: HTMLDivElement = document.createElement('div');
        line.classList.add("vp-progress-buffer");
        return line;
    }

    private createTimeMarker(): HTMLDivElement {
        let container: HTMLDivElement = document.createElement('div');
        container.classList.add("vp-time-marker");
        let time: HTMLSpanElement = document.createElement('span');
        container.append(time);
        container.style.display = "none";
        return container;
    }

    private updateTime (): void{
        let width = (this.currentSecond / this.duration) * 100;
        let widthCSS = width + "%";
        this.viewedLine.style.width = widthCSS;
    }

    private updateBuffer (): void{
        if (this.currentBuffered instanceof TimeRanges)
        {
            for (let i = 0; i < this.currentBuffered.length; i++){
                let width = Math.ceil(((this.currentBuffered.end(i) - this.currentBuffered.start(i)) / this.duration) * 100);
                let widthCSS = width + "%";
                let left = Math.floor((this.currentBuffered.start(i) / this.duration) * 100);
                let leftCSS = left + "%";
                if (i < this.bufferedLineArray.length){
                    this.bufferedLineArray[i].style.width = widthCSS;
                    this.bufferedLineArray[i].style.left = leftCSS;
                }
                else{
                    let line = this.createBufferedLine();
                    line.style.width = widthCSS;
                    line.style.left = leftCSS;
                    this.bufferedLineArray.push(line);
                    this.bufferedLineContainer.append(line);
                }
            }
        }
    }

    private viewTimeMarker(e: MouseEvent): void{
        this.timeMarker.style.display = "block";
        this.container.addEventListener("mousemove", (e: MouseEvent) =>
        { 
            let left = (e.clientX - this.container.getBoundingClientRect().left) - (this.timeMarker.clientWidth / 2);
            let leftCSS = left + "px";
            this.timeMarker.style.left = leftCSS;

            let timeWatch = (((e.clientX - this.container.getBoundingClientRect().left) / this.container.clientWidth) * this.duration);
            if (timeWatch < 0) timeWatch = 0;
            if (timeWatch > this.duration) timeWatch = this.duration;
            let timeSpan: HTMLSpanElement = this.timeMarker.children[0] as HTMLSpanElement;
            let time: string = this.timeText(timeWatch);
            timeSpan.innerHTML = time;
        });
        let fun = (e: MouseEvent) =>
        { 
            e.preventDefault();
            this.CurrentSecond = (((e.clientX - this.container.getBoundingClientRect().left) / this.container.clientWidth) * this.duration);;
            this.emit("change", new TimelineEvent(this.CurrentSecond,"change"));
        };
        this.container.addEventListener("mousedown", (e: MouseEvent) =>
        { 
            e.preventDefault();
            fun(e);
            this.container.addEventListener("mousemove", fun);
        });
        this.container.addEventListener("mouseup", (e: MouseEvent) =>
        {
            e.preventDefault();
            this.container.removeEventListener("mousemove", fun);
        });
        this.container.addEventListener("mouseleave", (e: MouseEvent) =>
        {
            e.preventDefault();
            this.container.removeEventListener("mousemove", fun);
        });
        

    }

    private hideTimeMarker(): void{
        this.timeMarker.style.display = "none";
    }

    private timeText (timeSeconds: number) : string{
        let time = "";
        let seconds = Math.floor(timeSeconds % 60);
        let minutes = Math.floor(timeSeconds / 60);
        let hours =Math.floor(timeSeconds / 3600);
        if ((minutes === 0) && (hours === 0)){
            time = "0:" + seconds.toString();
        }
        else if ((hours === 0)) {
            time = minutes.toString() + ":" + seconds.toString();
        }
        else {
            time = hours.toString() + ":" + minutes.toString() + ":" + seconds.toString();
        }
        return time;
    }
}

export class TimelineEvent extends Event {
    private time:number;
    constructor(time:number, name:string){
        super(name);
        this.time = time;
    }

    get TimeSeconds (){
        return this.time;
    }
}
