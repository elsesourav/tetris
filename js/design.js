cssRoot.style.setProperty("--ww", `${window.innerWidth}px`);
cssRoot.style.setProperty("--wh", `${window.innerHeight}px`);

// addjust size for every device
const min = window.innerWidth < window.innerHeight * 0.5 ? window.innerWidth : window.innerHeight;
const isWidth = min == window.innerWidth;

const WIDTH = isWidth ? min : window.innerHeight * 0.5;
const HEIFHT = isWidth ? window.innerHeight * 0.5 : min;
const MARGIN = min * 0.02;

cssRoot.style.setProperty("--border-size", `${MARGIN}px`);

const cssImage = [
    `background: linear-gradient(140.54deg, #060028 27.63%, #8000FF 100%), linear-gradient(180deg, #000000 0%, #C8C5C5 100%), radial-gradient(100% 200% at 0% 0%, #FFFFFF 0%, #2400B4 100%), linear-gradient(180deg, #42FF00 0%, #7500AC 100%), linear-gradient(133.98deg, #F90000 30.43%, #0073B4 100%), radial-gradient(70.41% 100% at 50% 0%, #D5B300 0%, #2200AA 100%);
    background-blend-mode: overlay, color-dodge, darken, difference, difference, normal;`,
    `background: linear-gradient(301.28deg, #FF0000 0%, #1D0027 100%), linear-gradient(121.28deg, #207A00 0%, #950000 100%), linear-gradient(238.72deg, #FFB800 0%, #000000 100%), linear-gradient(238.72deg, #00D1FF 0%, #A80000 100%), linear-gradient(125.95deg, #00E0FF 10.95%, #87009D 100%), linear-gradient(263.7deg, #B60000 3.43%, #B100A0 96.57%), linear-gradient(320.54deg, #800000 0%, #00C2FF 72.37%), linear-gradient(130.22deg, #8FA600 18.02%, #5A31FF 100%);
    background-blend-mode: difference, color-dodge, difference, lighten, color-dodge, difference, difference, normal;`,
    `background: linear-gradient(140.54deg, #060028 27.63%, #8000FF 100%), linear-gradient(180deg, #000000 0%, #C8C5C5 100%), radial-gradient(80.99% 100% at 50% 0%, #FFFFFF 0%, #030080 100%), linear-gradient(180deg, #42FF00 0%, #7500AC 100%), linear-gradient(133.98deg, #F90000 30.43%, #0073B4 100%), radial-gradient(55.83% 101.07% at 50% -1.07%, #8F00FF 0%, #0F0018 100%), radial-gradient(70.41% 100% at 50% 0%, #D5B300 0%, #2200AA 100%);
    background-blend-mode: overlay, color-dodge, darken, difference, difference, difference, normal;`,
    `background: linear-gradient(328.78deg, #030086 14.45%, #BD6177 84.36%), linear-gradient(301.28deg, #209B4A 0%, #7000FF 100%), radial-gradient(100% 138.56% at 100% 0%, #D50000 0%, #00FFE0 100%), radial-gradient(100% 148.07% at 0% 0%, #D50000 0%, #00FFFF 100%);
    background-blend-mode: soft-light, overlay, difference, normal;`
]

const selectedCssImage = cssImage[Math.floor(cssImage.length * Math.random())];
document.body.style = selectedCssImage;