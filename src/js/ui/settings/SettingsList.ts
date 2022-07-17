import { Component } from "../../type/Component";
import { Icon, IconType } from "../Icon";
import { SettingsControlButton } from "./SettingsControlButton";
import { SettingsMenu } from "./SettingsMenu";

export class SettingsList extends SettingsMenu{
    private backButton: SettingsControlButton;
    private buttonList: Array<SettingsControlButton>;
    private value: string;

    constructor () {
        super();
        this.backButton = this.createBackButton();
        this.addElementInMenu(this.backButton as Component);
        this.buttonList = new Array<SettingsControlButton>;
        this.value = "";
    }

    public get BackButton (): SettingsControlButton {
        return this.backButton;
    }

    public get Selected (): string {
        return this.value;
    }

    public addButton (text: string) {
        let button = SettingsControlButton.getSelect(text);
        this.buttonList.push(button);
        this.addElementInMenu(button as Component);
        button.on("click", () => {
            this.value = text;
            for (let i=0; i < this.buttonList.length; i++) {
                this.buttonList[i].removeIcon();
            }
            button.Icon = new Icon(IconType.check);
            this.emit("change", new SettingsListEvent(text));
        })
    }

    public select(index: number): string {
        for (let i=0; i < this.buttonList.length; i++) {
            this.buttonList[i].removeIcon();
        }
        this.buttonList[index].Icon = new Icon(IconType.check);
        this.value = this.buttonList[index].Text;
        return this.buttonList[index].Text;
    }

    public removeAllButtons () {
        this.clearContainer();
        this.buttonList = new Array<SettingsControlButton>;
        this.addElementInMenu(this.backButton as Component);
    }

    private createBackButton (): SettingsControlButton {
        let button = SettingsControlButton.getBackButton();
        return button;
    }    
}

export class SettingsListEvent extends Event {
    private _value: string;

    constructor(value: string) {
        super("change");
        this._value = value;
    }

    public get Value(): string {
        return this._value;
    }
}