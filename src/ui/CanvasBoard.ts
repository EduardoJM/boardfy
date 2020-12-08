interface CanvasBoardPoint {
    x: number;
    y: number;
}

class CanvasBoard {
    id: string;

    canvas: HTMLCanvasElement | null;
    
    context: CanvasRenderingContext2D | null;

    svg: SVGElement;

    currentPath: CanvasBoardPoint[];

    constructor() {
        const num = Math.floor(Math.random() * 1000);
        this.id = `@boardfy-canvasboard-${num}`;
        this.canvas = null;
        this.context = null;
        this.currentPath = [];
        this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.svg.classList.add('boardfy-canvas-board', 'svg-board');
        document.body.appendChild(this.svg);

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

        this.context = this.canvas.getContext('2d');
        this.canvas.addEventListener('mousedown', this.mouseDown);
        
        this.renderCanvas();
    }

    end() {
        document.body.removeChild(this.canvas);
        this.canvas.removeEventListener('mousedown', this.mouseDown);
        this.canvas = null;
        this.context = null;
    }

    mouseDown(e: MouseEvent) {
        this.canvas.addEventListener('mousemove', this.mouseMove);
        this.canvas.addEventListener('mouseup', this.mouseUp);
    }

    mouseMove(e: MouseEvent) {
        this.currentPath.push({
            x: e.pageX,
            y: e.pageY,
        });
        this.renderCanvas();
    }

    mouseUp() {
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
        this.svg.appendChild(path);

        this.currentPath = [];
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    renderCanvas() {
        if (this.currentPath.length < 2) {
            return;
        }
        this.context.beginPath();
        this.context.moveTo(this.currentPath[0].x, this.currentPath[0].y);
        for (let i = 1; i < this.currentPath.length; i += 1) {
            this.context.lineTo(this.currentPath[i].x, this.currentPath[i].y);
        }
        this.context.stroke();
    }

    clear() {
        this.svg.innerHTML = '';
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

export default CanvasBoard;
