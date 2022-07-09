import { Button } from "./Button";
import { Icon, IconType } from "./Icon";

export class PauseButton extends Button {
    private isPlay: boolean;
    public get IsPlay(): boolean {
        return this.isPlay;
    }
    public set IsPlay(value: boolean) {
        this.isPlay = value;
        if (this.isPlay){
            this.Icon = new Icon(IconType.pause);
        } else {
            this.Icon = new Icon(IconType.play);
        }
    }

    constructor (){
        super();
        this.isPlay = false;
        this.buttonElement.classList.add("vp-pause");
        this.Icon = new Icon(IconType.play);
        this.buttonElement.addEventListener("click",(e: Event) => {
            this.isPlay = !this.isPlay;
            if (this.isPlay){
                this.Icon = new Icon(IconType.pause);
            } else {
                this.Icon = new Icon(IconType.play);
            }
        });
    }
}