export interface ToolBarItemProps {
    id: string;
    text: string;
    icon: string;
}

class ToolBarItem {
    id: string;

    text: string;

    icon: string;

    constructor(opts: ToolBarItemProps) {
        this.id = opts.id;
        this.icon = opts.icon;
        this.text = opts.text;
    }

    render(): string {
        const btn = 
            '<button type="button" class="boardfy-toolbar-item">' +
                `<span>${this.text}</span>` +
            '</button>';
        return btn;
    }
}

export default ToolBarItem;
