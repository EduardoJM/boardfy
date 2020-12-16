import { loadCss, loadJavaScript } from './utils/dom';
import runtime from './utils/runtime';
import ToolBar from './ui/ToolBar';
import CanvasBoard from './ui/CanvasBoard';

const t = new ToolBar();
const b = new CanvasBoard();
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
    }
};
t.render();

loadCss(runtime.getURL("styles/index.css"));
