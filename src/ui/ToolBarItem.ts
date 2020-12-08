export interface ToolBarItemProps {
    id: string;
    text: string;
    icon: string;
    onClick?: () => void;
}

class ToolBarItem {
    id: string;

    text: string;

    icon: string;

    onClick?: () => void;

    constructor(opts: ToolBarItemProps) {
        this.id = opts.id;
        this.icon = opts.icon;
        this.text = opts.text;
        this.onClick = opts.onClick;
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if (this.onClick) {
            this.onClick();
        }
    }

    renderTo(parent: HTMLElement, current: boolean): void {
        const btn = document.createElement('button');
        btn.setAttribute('type', 'button');
        btn.className = `boardfy-toolbar-item${current ? ' active' : ''}`;
        btn.innerHTML = `${this.icon}<span>${this.text}</span>`
        parent.appendChild(btn);
        btn.addEventListener('click', this.handleClick);
    }
}

export default ToolBarItem;
