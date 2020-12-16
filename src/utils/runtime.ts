declare const browser : any;
declare const chrome: any;

const runtime = {
    getURL: function(path: string) {
        if (chrome) {
            return chrome.runtime.getURL(path);
        }
        return browser.runtime.getURL(path);
    },
};

export default runtime;
