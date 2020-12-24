import $ from 'jquery';

class StrokeWidthPalette {
    element: HTMLElement;

    widths: number[];

    handleWidthChange?: (width: number) => void;

    constructor() {
        let el = document.getElementById('stroke-width-palette');
        if (!el) {
            el = document.createElement('div');
            el.setAttribute('id', 'stroke-width-palette');
            document.body.appendChild(el);
        }
        this.element = el;
        this.element.style.display = 'none';
        this.widths = [1, 2, 4, 6, 8, 12, 16, 18, 24];
        this.itemClick = this.itemClick.bind(this);
    }

    private updateElementHTML() {
        let items = this.element.querySelectorAll('.stroke-width-list-item');
        items.forEach((item) => {
            item.removeEventListener('click', this.itemClick);
        });
        const body = this.widths.map((w) => {
            const returnVal =
                `<div data-width="${w}" class="stroke-width-list-item">` +
                `   <span data-width="${w}" style="height: ${w}px"></span>` +
                '</div>';
            return returnVal;
        }).join('');
        this.element.innerHTML =
            '<div class="stroke-width-list">' +
            `   ${body}` +
            '</div>';
        items = this.element.querySelectorAll('.stroke-width-list-item');
        items.forEach((item) => {
            item.addEventListener('click', this.itemClick);
        });
    }

    private itemClick(e: { target: any; }) {
        const clicked = e.target as HTMLElement;
        const w = clicked.getAttribute('data-width');
        const num = parseInt(w, 10);
        if (isNaN(num) || !isFinite(num)) {
            return;
        }
        if (this.handleWidthChange) {
            this.handleWidthChange(num);
        }
        this.end();
    }

    start() {
        $(this.element).fadeIn();
        this.updateElementHTML();
    }

    end() {
        $(this.element).fadeOut();
    }
}

export default StrokeWidthPalette;
