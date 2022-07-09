import { Component } from "../type/Component";
import { EventEmitter } from 'events';
import { VolumeButton, VolumeButtonEvent } from "./VolumeButton";
import { VolumeSlider, VolumeSliderEvent } from "./VolumeSlider";
import { ButtonEvent } from "./Button";

export class VolumeController extends EventEmitter implements Component  {
    private value: number;

    private container: HTMLDivElement;
    private button: VolumeButton;
    private slider: VolumeSlider;

    constructor (value: number){
        super();
        if (value < 0) value = 0;
        else if (value > 100) value = 100;
        this.value = value;

        this.button = new VolumeButton(this.value);
        this.button.on("change",(e: VolumeButtonEvent) => {
            this.emit("change", new VolumeControllerEvent(this.value,e.Muted,"change"));
        });

        this.slider = new VolumeSlider(this.value);
        this.slider.on("change", (e: VolumeSliderEvent) => {
            this.Volume = e.Value;
        });

        this.container = this.createContainer();
        this.container.append (this.button.element());
        this.container.addEventListener("mouseenter", (e: MouseEvent) => {
            this.container.append (this.slider.element());
        });
        this.container.addEventListener("mouseleave", (e: MouseEvent) => {
            let temp = this.container.querySelector(".vp-volume");
            if (temp !== null) {
                temp.remove();
            }
        });

        
    }

    element(): HTMLElement {
        return this.container;
    }

    public get Volume (): number {
        return this.value;
    }

    public set Volume (value: number) {
        if (value < 0) value = 0;
        else if (value > 100) value = 100;
        this.value = value;
        this.slider.Value = value;
        this.button.Volume = value;
        this.emit("change", new VolumeControllerEvent(this.value,this.button.IsMute,"change"));
    }

    private createContainer(): HTMLDivElement {
        let container: HTMLDivElement = document.createElement('div');
        container.classList.add("vp-volume-container");
        return container;
    }
}

export class VolumeControllerEvent extends Event {
    private volume:number;
    private mute:boolean;
    constructor(volume:number, isMute:boolean, name:string){
        super(name);
        this.volume = volume;
        this.mute = isMute;
    }

    get Volume (){
        return this.volume;
    }

    
    get Mute (){
        return this.mute; 
    }
}
