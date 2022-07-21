import { Component } from "../../type/Component";
import { Button, ButtonEvent } from "../Button";
import { Icon, IconType } from "../Icon";

export class SettingsButton extends Button implements Component{
    private isViewSettingsControl: boolean;
    constructor (isViewSettingsControl: boolean = false) {
        super(false);
        this.isViewSettingsControl = isViewSettingsControl
        this.Icon = new Icon(IconType.settings);
        this.buttonElement.addEventListener("click",(e: Event) => {
            this.isViewSettingsControl = !this.isViewSettingsControl;
            if (this.isEnable()) this.emit("click", new SettingsButtonEvent(this.isViewSettingsControl, "click"));
        });
    }

    public get IsViewSettingsControl(): boolean {
        return this.isViewSettingsControl;
    }
}

export class SettingsButtonEvent extends ButtonEvent {
    private isView: boolean
    constructor(isView:boolean ,name:string){
        super(name);
        this.isView = isView;
    }

    public get IsView (): boolean {
        return this.isView;
    }
}