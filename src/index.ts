import ToolBar from './ui/ToolBar';

declare var browser: any;

const t = new ToolBar();
t.render();

const styleLink = document.createElement('link');
styleLink.setAttribute("rel", "stylesheet");
styleLink.setAttribute("type", "text/css");
styleLink.setAttribute("href", browser.runtime.getURL("styles/index.css"));
document.head.appendChild(styleLink);
