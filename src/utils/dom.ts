export function loadCss(url: string) {
    const styleLink = document.createElement('link');
    styleLink.setAttribute("rel", "stylesheet");
    styleLink.setAttribute("type", "text/css");
    styleLink.setAttribute("href", url);
    document.head.appendChild(styleLink);
}

export function loadJavaScript(url: string, onLoad: () => void) {
    const scriptTag = document.createElement('script');
    scriptTag.setAttribute('src', url);
    scriptTag.addEventListener('load', () => onLoad);
    document.body.appendChild(scriptTag);
}
