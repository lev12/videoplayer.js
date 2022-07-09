import { Component } from "../type/Component";
import { Button } from "./Button";
import { Icon, IconType } from "./Icon";

export class FullscreenButton extends Button implements Component{
    constructor () {
        super();
        this.Icon = new Icon(IconType.fullscreen);
        this.buttonElement.addEventListener("click",(e: Event) => {
            this.emit("click", new FullscreenButtonEvent("click"));
        });
    }
}

export class FullscreenButtonEvent extends Event {
    constructor(name:string){
        super(name);
    }
}