import { Component } from "../type/Component";
import { EventEmitter } from 'events';

export class VolumeSlider extends EventEmitter implements Component{
    private container: HTMLDivElement;
    private line: HTMLSpanElement;

    private value: number;

    constructor (value: number){
        super();
        this.value = value;

        this.container = this.createContainer();
        this.line = this.createLine();
        let valueCSS = value.toString() + "%";
        this.line.style.width = valueCSS;

        let fun = (e: MouseEvent) =>
        { 
            e.preventDefault();
            this.value = (((e.clientX - this.container.getBoundingClientRect().left) / this.container.clientWidth) * 100);
            if (this.value < 0) this.value = 0;
            else if (this.value > 100) this.value = 100;
            let valueCSS = this.value.toString() + "%";
            this.line.style.width = valueCSS;
            this.emit("change", new VolumeSliderEvent(this.value,"change"));
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

        this.container.append (this.line);
    }
    element(): HTMLElement {
        return this.container;
    }

    public get Value (): number {
        return this.value;
    }

    public set Value (value: number) {
        this.value = value;
        let valueCSS = value.toString() + "%";
        this.line.style.width = valueCSS;
    }

    private createContainer (): HTMLDivElement {
        let container: HTMLDivElement = document.createElement('div');
        container.classList.add("vp-volume");
        return container;
    }

    private createLine (): HTMLSpanElement {
        let line: HTMLSpanElement = document.createElement('span');
        line.classList.add("vp-volume-value");
        return line;
    }
}

export class VolumeSliderEvent extends Event {
    private value:number;
    constructor(value:number, name:string){
        super(name);
        this.value = value;
    }

    get Value (){
        return this.value;
    }

}