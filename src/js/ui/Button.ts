import { Component } from "../type/Component";
import { EventEmitter } from 'events'
import { Icon, IconType } from "./Icon";

export enum ButtonType {
    empty,
    text,
    icon,
    iconText
}

export class Button extends EventEmitter implements Component {
    protected buttonElement: HTMLButtonElement;
    protected textElement: HTMLSpanElement | undefined;
    protected iconElement: HTMLSpanElement | undefined;

    private type: ButtonType;
    private text: string | undefined;
    private icon: Icon | undefined;

    constructor (){
        super();
        this.type = ButtonType.empty;
        this.buttonElement = this.createButtonElement();
        this.buttonElement.addEventListener("click",(e: Event) => {
            this.emit("click", new ButtonEvent("click"));
        });
    }

    public element(): HTMLElement {
        return this.buttonElement;
    }

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
        this.textElement = this.createTextElement();
        this.buttonElement.append(this.textElement);
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
            for (let j = 0; i < this.buttonElement.children[i].classList.length; j++) {
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
    
    public addClass (className: string){
        this.buttonElement.classList.add(className);
    }

    private createButtonElement(): HTMLButtonElement{
        let buttonElement: HTMLButtonElement = document.createElement('button');
        buttonElement.classList.add("vp-button");
        return buttonElement;
    }

    private createTextElement(): HTMLSpanElement{
        let textElement = new HTMLSpanElement();
        textElement.classList.add("vp-button-text");
        return textElement;
    }

    private createIconElement(iconCssStyle: string): HTMLSpanElement{
        let textElement = new HTMLSpanElement();
        textElement.classList.add("vp-button-icon");
        textElement.classList.add(iconCssStyle);
        return textElement;
    }
}

export class ButtonEvent extends Event {
    constructor (name:string){
        super(name);
    }
}