import { Component } from "../../type/Component";
import { IconType } from "../Icon";
import { SettingsControl } from "./SettingsControl";
import { SettingsControlButton } from "./SettingsControlButton";
import { SettingsMenu } from "./SettingsMenu";

export class SettingsSpeed extends SettingsMenu {
    private backButton: SettingsControlButton;
    private speedSelect: Array<SettingsControlButton>;

    constructor () {
        super();
        this.backButton = this.createBackButton();
        this.addBackButton(this.backButton);
        this.speedSelect = new Array<SettingsControlButton>;
        this.speedSelect.push(this.createSpeedSelectButton(0.25));
        this.speedSelect.push(this.createSpeedSelectButton(0.5));
        this.speedSelect.push(this.createSpeedSelectButton(0.75));
        this.speedSelect.push(this.createSpeedSelectButton(1));
        this.speedSelect.push(this.createSpeedSelectButton(1.25));
        this.speedSelect.push(this.createSpeedSelectButton(1.5));
        this.speedSelect.push(this.createSpeedSelectButton(1.75));
        this.speedSelect.push(this.createSpeedSelectButton(2));
        console.log (this.speedSelect);
        for (let i=0; i < this.speedSelect.length; i++) {
            this.addElementInMenu(this.speedSelect[i] as Component);
        }
    }

    public get BackButton (): SettingsControlButton {
        return this.backButton;
    }

    private createBackButton (): SettingsControlButton {
        let button = SettingsControlButton.getBackButton();

        return button;
    }
    
    private createSpeedSelectButton (speed: number = 1): SettingsControlButton {
        let button = SettingsControlButton.getSpeedSelect(speed);
        return button;
    }
}