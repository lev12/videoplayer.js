import { Component } from "../type/Component";
import { EventEmitter } from 'events'
import { Icon, IconType } from "./Icon";

export enum ButtonType {
    empty,
    text,
    icon,
    iconText
}

export enum ButtonState {
    enabled,
    disabled,
    hover,
    focused,
    pressed
}

export class Button extends EventEmitter implements Component {
    protected buttonElement: HTMLButtonElement;
    protected textElement: HTMLSpanElement | undefined;
    protected iconElement: HTMLSpanElement | undefined;

    private type: ButtonType;
    private state: ButtonState;
    private text: string | undefined;
    private icon: Icon | undefined;
    //private iconDisabled: Icon | undefined;

    constructor (isEmitEvent: boolean = true){
        super();
        this.state = ButtonState.enabled;
        this.type = ButtonType.empty;
        this.buttonElement = this.createButtonElement();
        if (isEmitEvent) this.buttonElement.addEventListener("click",(e: Event) => {
            if (this.state !== ButtonState.disabled) {
                this.emit("click", new ButtonEvent());
            }
        });
    }

    public element(): HTMLElement {
        return this.buttonElement;
    }

    public get State(): ButtonState {
        return this.state;
    }

    public disable(): void {
        this.state = ButtonState.disabled;
    }

    public enable(): void {
        this.state = ButtonState.enabled;
    }

    public isEnable(): boolean {
        if (this.state === ButtonState.disabled) return false;
        else return true;
    }

    public click(): void {
        this.buttonElement.click();
    };

    public get Type(): ButtonType {
        return this.type;
    }

    public get Text(): string {
        if (typeof this.text !== "undefined") {
            return this.text;
        }
        else{
            return "";
        }
    }

    public set Text(value: string) {
        this.text = value;
        this.textElement = this.createTextElement(value);
        for (let i = 0; i < this.buttonElement.children.length; i++) {
            for (let j = 0; j < this.buttonElement.children[i].classList.length; j++) {
                if (this.buttonElement.children[i].classList[j] === "vp-button-text") {
                    this.buttonElement.children[i].remove();
                    break;
                }
            }
        }
        if (typeof this.iconElement !== "undefined") {
            this.buttonElement.insertBefore(this.textElement,this.iconElement);
        }
        else this.buttonElement.append(this.textElement);
        if (typeof this.iconElement === "undefined") {
            this.type = ButtonType.text;
        } else {
            this.type = ButtonType.iconText;
        }
    }

    public get Icon(): Icon {
        if (typeof this.icon !== "undefined") {
            return this.icon;
        }
        else {
            return new Icon();
        }
    }

    public set Icon(value: Icon) {
        this.icon = value;
        this.iconElement = this.icon.element();
        for (let i = 0; i < this.buttonElement.children.length; i++) {
            for (let j = 0; j < this.buttonElement.children[i].classList.length; j++) {
                if (this.buttonElement.children[i].classList[j] === "vp-icon-placeholder") {
                    this.buttonElement.children[i].remove();
                    break;
                }
            }
        }
        this.buttonElement.append(this.iconElement);
        if (typeof this.textElement === "undefined") {
            this.type = ButtonType.icon;
        } else {
            this.type = ButtonType.iconText;
        }
    }

    /*public get IconDisabled(): Icon {
        if (typeof this.iconDisabled !== "undefined") {
            return this.iconDisabled;
        }
        else {
            return new Icon();
        }
    }

    public set IconDisabled(value: Icon) {
        this.iconDisabled = value;
    }*/
    
    public addClass (className: string){
        this.buttonElement.classList.add(className);
    }

    public removeIcon (){
        this.icon = undefined;
        for (let i = 0; i < this.buttonElement.children.length; i++) {
            for (let j = 0; j < this.buttonElement.children[i].classList.length; j++) {
                if (this.buttonElement.children[i].classList[j] === "vp-icon-placeholder") {
                    this.buttonElement.children[i].remove();
                    break;
                }
            }
        }
    }

    private createButtonElement(): HTMLButtonElement{
        let buttonElement: HTMLButtonElement = document.createElement('button');
        buttonElement.classList.add("vp-button");
        return buttonElement;
    }

    private createTextElement(text: string): HTMLSpanElement{
        let textElement = document.createElement('span');
        textElement.classList.add("vp-button-text");
        textElement.innerText = text;
        return textElement;
    }

    private createIconElement(iconCssStyle: string): HTMLSpanElement{
        let textElement = document.createElement('span');
        textElement.classList.add("vp-button-icon");
        textElement.classList.add(iconCssStyle);
        return textElement;
    }
}

export class ButtonEvent extends Event {
    constructor (name: string = "click"){
        super(name);
    }
}