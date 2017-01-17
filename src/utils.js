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

export const getBase64Avatar = (email) => {
    return new Promise((resolve, reject) => {

       fetch('https://api.budgt.eu/avatar.php?email='+encodeURIComponent(email))
            .then(function(response) {
               response.json().then((r) => {
                   resolve(r);
                });
            }).catch((e) => {
                reject(e);
                console.log('image fetch error', e);
            });

    });
}

export const debounce = (fn, delay = 200) => {
    var timer = null;
    return function () {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    };
}