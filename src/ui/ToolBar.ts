import ToolBarItem from './ToolBarItem';
import * as Icons from './Icons';

class ToolBar {
    id: string;

    items: ToolBarItem[];

    currentTool: number;

    currentToolChanged: (toolIndex: number) => void | null;

    toolClicked: (toolIndex: number) => void | null;

    constructor() {
        const num = Math.floor(Math.random() * 1000);
        this.id = `@boardfy-toolbar-${num}`;
        this.currentTool = -1;
        this.currentToolChanged = null;
        this.items = [
            new ToolBarItem({
                id: 'pen',
                icon: Icons.PenIcon,
                text: 'Write',
                onClick: () => {
                    this.setCurrentTool(this.currentTool === 0 ? -1 : 0);
                }
            }),
            new ToolBarItem({
                id: 'color',
                icon: Icons.PaletteIcon,
                text: 'Color',
                onClick: () => {
                    if (this.toolClicked) {
                        this.toolClicked(2);
                    }
                }
            }),
            new ToolBarItem({
                id: 'strokeWidth',
                icon: Icons.LineWidthIcon,
                text: 'Stroke Width',
                onClick: () => {
                    if (this.toolClicked) {
                        this.toolClicked(3);
                    }
                }
            }),
            new ToolBarItem({
                id: 'clear',
                icon: Icons.ClearIcon,
                text: 'Clear',
                onClick: () => {
                    if (this.toolClicked) {
                        this.toolClicked(1);
                    }
                }
            })
        ];
    }

    setCurrentTool(ind: number) {
        this.currentTool = ind;
        if (this.currentToolChanged) {
            this.currentToolChanged(ind);
        }
        this.render();
    }

    render(): void {
        let element = document.getElementById(this.id);
        if (!element) {
            element = document.createElement('div');
            element.setAttribute('id', this.id);
            document.body.appendChild(element);
        }
        element.className = 'boardfy-toolbar';
        element.innerHTML = '';
        this.items.forEach((item, index) => item.renderTo(element, this.currentTool === index));
    }
}

export default ToolBar;
