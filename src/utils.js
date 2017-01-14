export const guid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        // eslint-disable-next-line
        var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

const getViewPort = ({ phone, tablet }) => {
    let viewport = 1600;
    if (tablet) viewport = 768; // iPad portrait width
    if (phone) viewport = 375; // iPhone 6 width
    if (typeof window !== 'undefined' && window.innerWidth) {
        viewport = window.innerWidth;
    }
    return viewport;
};

export const  getScreenClass = ({ phone, tablet, breakpoints }) => {
    const defaultBreakpoints = [576, 768, 992, 1200];
    const theBreakpoints = breakpoints && breakpoints.length ? breakpoints : defaultBreakpoints;
    const viewport = getViewPort({ phone, tablet });

    let screenClass = 'xs';

    if (theBreakpoints[0] && viewport >= theBreakpoints[0]) screenClass = 'sm';
    if (theBreakpoints[1] && viewport >= theBreakpoints[1]) screenClass = 'md';
    if (theBreakpoints[2] && viewport >= theBreakpoints[2]) screenClass = 'lg';
    if (theBreakpoints[3] && viewport >= theBreakpoints[3]) screenClass = 'xl';

    return screenClass;
};

export const getBase64Image = (url) => {
    return new Promise((resolve, reject) => {
        var img = document.createElement("img");
        img.crossOrigin = "anonymous";
        img.onload = () => {
            var canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            resolve(canvas.toDataURL("image/jpg"));
        };
        img.onerror = (e) => {
            console.log('image failed to load', e);
            reject(e);
        }
        img.src = url;
    });
}