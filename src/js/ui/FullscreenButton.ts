import { Component } from "../type/Component";
import { Button } from "./Button";
import { Icon, IconType } from "./Icon";

export class FullscreenButton extends Button implements Component{
    private isFullscreen: boolean;
    constructor (isFullscreen: boolean = false) {
        super();
        this.Icon = new Icon(IconType.fullscreen);
        this.isFullscreen = isFullscreen;
        this.buttonElement.addEventListener("click",(e: Event) => {
            this.isFullscreen = !this.isFullscreen;
            this.emit("click", new FullscreenButtonEvent(this.isFullscreen,"click"));
        });
    }

    public get IsFullscreen(): boolean {
        return this.isFullscreen;
    }
}

export class FullscreenButtonEvent extends Event {
    private isFullscreen: boolean;
    constructor(isFullscreen: boolean, name:string){
        super(name);
        this.isFullscreen = isFullscreen;
    }

    public get IsFullscreen (): boolean {
        return this.isFullscreen;
    }
}