interface CanvasBoardPoint {
    x: number;
    y: number;
}

class CanvasBoard {
    id: string;

    canvas: HTMLCanvasElement | null;
    
    svg: SVGElement;

    currentPath: CanvasBoardPoint[];

    currentSvgPath: SVGElement;

    color: string;

    width: number;

    constructor() {
        const num = Math.floor(Math.random() * 1000);
        this.id = `@boardfy-canvasboard-${num}`;
        this.canvas = null;
        this.currentPath = [];
        this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.currentSvgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        this.svg.appendChild(this.currentSvgPath);
        this.svg.classList.add('boardfy-canvas-board', 'svg-board');
        document.body.appendChild(this.svg);
        this.color = '#212121';
        this.width = 1;

        this.mouseDown = this.mouseDown.bind(this);
        this.mouseMove = this.mouseMove.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
    }

    begin() {
        if (!this.canvas) {
            this.canvas = document.getElementById(this.id) as HTMLCanvasElement;
            if (!this.canvas) {
                this.canvas = document.createElement('canvas');
                this.canvas.setAttribute('id', this.id);
                document.body.appendChild(this.canvas);
            }
        }
        if (!this.canvas) {
            return;
        }
        this.canvas.className = 'boardfy-canvas-board';
        const rc = document.body.getBoundingClientRect();
        this.canvas.width = rc.width;
        this.canvas.height = rc.height;
        this.svg.setAttribute('width', rc.width.toString());
        this.svg.setAttribute('height', rc.height.toString());
        this.svg.setAttributeNS('http://www.w3.org/2000/svg', 'viewBox', `0 0 ${rc.width} ${rc.height}`);

        this.canvas.addEventListener('mousedown', this.mouseDown);
    }

    end() {
        document.body.removeChild(this.canvas);
        this.canvas.removeEventListener('mousedown', this.mouseDown);
        this.canvas = null;
    }

    private appendPoint(x: number, y: number) {
        this.currentPath.push({ x, y });
        if (this.currentPath.length > 0) {
            const pathStr = this.currentPath.map((point, index) => {
                if (index === 0) {
                    return `M ${point.x.toFixed(1)} ${point.y.toFixed(1)}`;
                } else {
                    return `L ${point.x.toFixed(1)} ${point.y.toFixed(1)}`;
                }
            }).join(' ');
            this.currentSvgPath.setAttribute('d', pathStr);
            this.currentSvgPath.setAttribute('stroke', this.color);
            this.currentSvgPath.setAttribute('stroke-width', `${this.width}px`);
        } else {
            this.currentSvgPath.setAttribute('d', '');
        }
    }

    mouseDown(e: MouseEvent) {
        this.canvas.addEventListener('mousemove', this.mouseMove);
        this.canvas.addEventListener('mouseup', this.mouseUp);
        this.appendPoint(e.pageX, e.pageY);
    }

    mouseMove(e: MouseEvent) {
        this.appendPoint(e.pageX, e.pageY);
    }

    mouseUp(e: MouseEvent) {
        this.appendPoint(e.pageX, e.pageY);

        this.canvas.removeEventListener('mousemove', this.mouseMove);
        this.canvas.removeEventListener('mouseup', this.mouseUp);

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const pathStr = this.currentPath.map((point, index) => {
            if (index === 0) {
                return `M ${point.x.toFixed(1)} ${point.y.toFixed(1)}`;
            } else {
                return `L ${point.x.toFixed(1)} ${point.y.toFixed(1)}`;
            }
        }).join(' ');
        path.setAttribute('d', pathStr);
        path.setAttribute('stroke', this.color);
        path.setAttribute('stroke-width', `${this.width}px`);
        this.svg.appendChild(path);

        this.currentSvgPath.setAttribute('d', '');

        this.currentPath = [];
    }

    clear() {
        this.svg.innerHTML = '';
        this.currentSvgPath.setAttribute('d', '');
        this.svg.appendChild(this.currentSvgPath);
    }
}

export default CanvasBoard;
