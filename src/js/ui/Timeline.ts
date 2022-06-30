import { Component } from "../type/Component";

export class Timeline implements Component {
    private container: HTMLDivElement;
    private viewedLine: HTMLDivElement;
    private bufferedLineContainer: HTMLDivElement;
    private bufferedLineArray: Array<HTMLDivElement>;

    private duration: number;
    private currentSecond: number;
    private currentBuffered: TimeRanges | undefined;


    constructor (){
        this.duration = 0;
        this.currentSecond = 0;
        //this.currentBuffered = new TimeRanges();
        this.bufferedLineArray = new Array<HTMLDivElement>;

        this.container = this.createContainer();
        this.viewedLine = this.createViewedLine();
        this.updateTime();
        this.bufferedLineContainer = this.createBufferedContainer();
        this.updateBuffer();


        this.container.append (this.bufferedLineContainer);
        this.container.append (this.viewedLine);
    }

    element (){
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

    private updateTime (): void{
        let width = (this.currentSecond / this.duration) * 100;
        let widthCSS = width + "%";
        this.viewedLine.style.width = widthCSS;
    }

    private updateBuffer (): void{
        if (this.currentBuffered instanceof TimeRanges)
        {
            for (let i = 0; i < this.currentBuffered.length; i++){
                let width = (this.currentBuffered.end(i) / this.duration) * 100;
                let widthCSS = width + "%";
                let left =  (this.currentBuffered.start(i) / this.duration) * 100;
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
}