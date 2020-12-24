class ColorPalette {
    element: HTMLElement;

    colors: string[];

    handleColorChange?: (color: string) => void;

    constructor() {
        let el = document.getElementById('color-palette');
        if (!el) {
            el = document.createElement('div');
            el.setAttribute('id', 'color-palette');
            document.body.appendChild(el);
        }
        this.element = el;
        this.element.style.display = 'none';
        this.colors = ['#212121', '#1b5e20', '#8e24aa', '#304ffe'];
        this.itemClick = this.itemClick.bind(this);
    }

    private changeColor(color: string) {
        this.end();
        if (this.handleColorChange) {
            this.handleColorChange(color);
        }
    }

    private itemClick(e: { target: any; }) {
        const clicked = e.target as HTMLElement;
        if (clicked) {
            if (clicked.classList.contains('color-0')) {
                this.changeColor(this.colors[0]);
            } else if (clicked.classList.contains('color-1')) {
                this.changeColor(this.colors[1]);
            } else if (clicked.classList.contains('color-2')) {
                this.changeColor(this.colors[2]);
            } else if (clicked.classList.contains('color-3')) {
                this.changeColor(this.colors[3]);
            }
        }
    }

    private updateElementHTML() {
        let items = this.element.querySelectorAll('.color-palette-item');
        items.forEach((item) => {
            item.removeEventListener('click', this.itemClick);
        });
        this.element.innerHTML =
            '<div class="color-palette-container">' +
            `   <div class="color-palette-item color-0" style="background: ${this.colors[0]}"></div>` +
            `   <div class="color-palette-item color-1" style="background: ${this.colors[1]}"></div>` +
            `   <div class="color-palette-item color-2" style="background: ${this.colors[2]}"></div>` +
            `   <div class="color-palette-item color-3" style="background: ${this.colors[3]}"></div>` +
            '</div>';
        items = this.element.querySelectorAll('.color-palette-item');
        items.forEach((item) => {
            item.addEventListener('click', this.itemClick);
        });
    }

    start() {
        this.element.style.display = 'block';
        this.updateElementHTML();
    }

    end() {
        this.element.style.display = 'none';
    }
}

export default ColorPalette;
