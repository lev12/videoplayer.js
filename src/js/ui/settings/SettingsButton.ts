import { Component } from "../../type/Component";
import { Button } from "../Button";
import { Icon, IconType } from "../Icon";

export class SettingsButton extends Button implements Component{
    constructor () {
        super();
        this.Icon = new Icon(IconType.settings);
        this.buttonElement.addEventListener("click",(e: Event) => {
            this.emit("click", new SettingsButtonEvent("click"));
        });
    }
}

export class SettingsButtonEvent extends Event {
    constructor(name:string){
        super(name);
    }
}