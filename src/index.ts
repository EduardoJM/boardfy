/*
import ToolBar from './ui/ToolBar';


*/
import { loadCss, loadJavaScript } from './utils/dom';
import ToolBar from './ui/ToolBar';
import CanvasBoard from './ui/CanvasBoard';

/*
const c = new CanvasBoard();
c.begin();
*/

const t = new ToolBar();
const b = new CanvasBoard();
t.currentToolChanged = (toolIndex: number) => {
    if (toolIndex === 0) {
        b.begin();
    } else {
        b.end();
    }
};
t.render();


declare var browser: any;

loadCss(browser.runtime.getURL("styles/index.css"));
