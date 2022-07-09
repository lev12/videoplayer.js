import { Component } from "../type/Component";
import { Button } from "./Button";
import { Icon, IconType } from "./Icon";

export class PictureInPictureButton extends Button implements Component {
    constructor () {
        super();
        this.Icon = new Icon(IconType.pictureInPicture);
        this.buttonElement.addEventListener("click",(e: Event) => {
            this.emit("click", new PictureInPictureButtonEvent("click"));
        });
    }
}

export class PictureInPictureButtonEvent extends Event {
    constructor(name:string){
        super(name);
    }
}