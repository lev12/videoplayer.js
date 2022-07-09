import { Component } from "../type/Component";
import { Button } from "./Button";
import { Icon, IconType } from "./Icon";

export class VolumeButton extends Button implements Component{
    private isMute: boolean;
    private volume: number;

    public get Volume(): number {
        return this.volume;
    }
    public set Volume(value: number) {
        this.volume = value;
        if (!this.isMute)
        {
            this.Icon = new Icon(this.volumeIcon(this.volume));
        }
        
    }
    public get IsMute(): boolean {
        return this.isMute;
    }
    public set IsMute(value: boolean) {
        this.isMute = value;
        if (this.isMute){
            this.Icon = new Icon(IconType.pause);
        } else {
            this.Icon = new Icon(IconType.play);
        }
    }

    constructor (value: number){
        super();
        this.isMute = false;

        if (value < 0) value = 0;
        else if (value > 100) value = 100;
        this.volume = value;

        this.buttonElement.classList.add("vp-button-volume", "vp-volume-margin");
        this.Icon = new Icon(this.volumeIcon(this.volume));
        this.buttonElement.addEventListener("click",(e: Event) => {
            this.isMute = !this.isMute;
            if (this.isMute){
                this.Icon = new Icon(IconType.volumeMute);
            } else {
                this.Icon = new Icon(this.volumeIcon(this.volume));
            }
            this.emit("change", new VolumeButtonEvent(this.IsMute,"change"));
        });

        
    }

    private volumeIcon (value: number): IconType {
        if (value < 30) return IconType.volumeLow;
        if ((value >= 30) && (value <= 70)) return IconType.volumeMid;
        if (value > 70) return IconType.volumeHigh;
        return IconType.volumeMute;
    }
}

export class VolumeButtonEvent extends Event {
    private muted:boolean;
    constructor(value:boolean, name:string){
        super(name);
        this.muted = value;
    }

    public get Muted (){
        return this.muted;
    }

}