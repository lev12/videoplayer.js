import { Component } from "../../type/Component";
import { EventEmitter } from 'events';
import { SettingsControlButton } from "./SettingsControlButton";

export class SettingsMenu extends EventEmitter implements Component {
    protected container: HTMLDivElement;
    protected containerList: HTMLUListElement;

    constructor () {
        super();
        this.container = this.createContainer();
        this.containerList = this.createContainerList();
        this.container.append(this.containerList);
    }

    element(): HTMLElement {
        return this.container;
    }

    private createContainer (): HTMLDivElement {
        let container = document.createElement('div');
        container.classList.add("vp-control-settings-container");
        return container;
    }

    private createContainerList (): HTMLUListElement {
        let list: HTMLUListElement = document.createElement('ul');
        list.classList.add("vp-control-list", "vp-control-settings-list");
        return list;
    }

    protected addElementInMenu (element: Component) {
        let li: HTMLLIElement = document.createElement('li');
        li.classList.add("vp-control-item", "vp-control-settings-item");
        li.append(element.element());
        this.containerList.append(li);
    } 

    protected addBackButton (element: SettingsControlButton) {
        element.addClass("vp-button-quality-back");
        let li: HTMLLIElement = document.createElement('li');
        li.classList.add("vp-control-item", "vp-control-settings-item");
        li.append(element.element());
        
        if (this.containerList.firstChild !== null) {
            this.containerList.insertBefore(this.containerList.firstChild, li);
            if (li.previousSibling !== null)
                this.containerList.insertBefore(li.previousSibling,document.createElement('hr'));
        }
        else {
            this.containerList.append(li);
            this.containerList.append(document.createElement('hr'));
        }

    } 

    protected clearContainer () {
        let list = this.container.children[0];
        let elements = list.children;
        let l = elements.length;
        for (let i = 0; i < l; i++) {
            list.removeChild(elements[0]);
        }
    }
}