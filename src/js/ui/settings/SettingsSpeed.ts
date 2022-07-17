import { Component } from "../../type/Component";
import { Icon, IconType } from "../Icon";
import { SettingsControl } from "./SettingsControl";
import { SettingsControlButton } from "./SettingsControlButton";
import { SettingsMenu } from "./SettingsMenu";

export class SettingsSpeed extends SettingsMenu {
    private backButton: SettingsControlButton;
    private speedSelect: Array<SettingsControlButton>;
    private speed: number;

    constructor () {
        super();
        this.speed = 1;
        this.backButton = this.createBackButton();
        this.addBackButton(this.backButton);
        this.speedSelect = new Array<SettingsControlButton>;
        this.speedSelect.push(this.createSpeedSelectButton(0.25));
        this.speedSelect.push(this.createSpeedSelectButton(0.5));
        this.speedSelect.push(this.createSpeedSelectButton(0.75));
        this.speedSelect.push(this.createSpeedSelectButton(1, true));
        this.speedSelect.push(this.createSpeedSelectButton(1.25));
        this.speedSelect.push(this.createSpeedSelectButton(1.5));
        this.speedSelect.push(this.createSpeedSelectButton(1.75));
        this.speedSelect.push(this.createSpeedSelectButton(2));
        console.log (this.speedSelect);
        for (let i=0; i < this.speedSelect.length; i++) {
            this.addElementInMenu(this.speedSelect[i] as Component);
            this.speedSelect[i].on("click", (e: Event) => {
                for (let i=0; i < this.speedSelect.length; i++) {
                    this.speedSelect[i].removeIcon();
                }
                this.speedSelect[i].Icon = new Icon(IconType.check);
                let speed: number;
                speed = Number.parseFloat(this.speedSelect[i].Text);
                if (speed.toString() === "NaN") {
                    speed = 1;
                }
                this.speed = speed;
                this.emit("click", new SettingsSpeedEvent(speed));
            })
        }
    }

    public get BackButton (): SettingsControlButton {
        return this.backButton;
    }

    public get Speed (): number {
        return this.speed;
    }

    private createBackButton (): SettingsControlButton {
        let button = SettingsControlButton.getBackButton();
        return button;
    }
    
    private createSpeedSelectButton (speed: number = 1, selected: boolean = false): SettingsControlButton {
        let button = SettingsControlButton.getSpeedSelect(speed);
        if (selected) button.Icon = new Icon(IconType.check);
        return button;
    }
}

export class SettingsSpeedEvent extends Event {
    private _speed: number;

    constructor(speed: number) {
        super("change");
        this._speed = speed;
    }

    public get speed(): number {
        return this._speed;
    }
}