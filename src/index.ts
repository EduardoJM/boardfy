import { loadCss, loadJavaScript } from './utils/dom';
import runtime from './utils/runtime';
import ToolBar from './ui/ToolBar';
import CanvasBoard from './ui/CanvasBoard';
import ColorPalette from './ui/screens/ColorPalette';
import StrokeWidthPalette from './ui/screens/StrokeWidthPalette';

const t = new ToolBar();
const b = new CanvasBoard();
const palette = new ColorPalette();
const swPalette = new StrokeWidthPalette();
palette.handleColorChange = (color: string) => {
    b.color = color;
}
swPalette.handleWidthChange = (width: number) => {
    b.width = width;
}
t.currentToolChanged = (toolIndex: number) => {
    if (toolIndex === 0) {
        b.begin();
    } else {
        b.end();
    }
};
t.toolClicked = (toolIndex: number) => {
    if (toolIndex === 1) {
        b.clear();
    } else if (toolIndex === 2) {
        palette.start();
    } else if (toolIndex === 3) {
        swPalette.start();
    }
};
t.render();

loadCss(runtime.getURL("styles/index.css"));
