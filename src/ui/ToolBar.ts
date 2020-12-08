import ToolBarItem from './ToolBarItem';

class ToolBar {
    id: string;

    items: ToolBarItem[];

    constructor() {
        const num = Math.floor(Math.random() * 1000);
        this.id = `@boardfy-${num}`;
        this.items = [
            new ToolBarItem({
                id: 'pen',
                icon: 'pen',
                text: 'Write'
            }),
        ];
    }

    render(): void {
        let element = document.getElementById(this.id);
        if (!element) {
            element = document.createElement('div');
            element.setAttribute('id', this.id);
            document.body.appendChild(element);
        }
        element.className = 'boardfy-toolbar';
        const buttons = this.items.map((item) => item.render());
        element.innerHTML = buttons.join('');
    }
}

export default ToolBar;
