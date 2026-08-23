const plane = document.getElementById('plane');
const drawingplane = document.getElementById('drawingplane')
const canvas = document.getElementById("canvas");
const equation = document.getElementById('equation');
let vw = window.innerWidth/100;
const lvl = 24;
let vh = window.innerHeight/100;
katex.render("y = 5\\sum_{k=1}^{12}\\frac{\\sin\\left(\\left(2k+1\\right)\\cdot x\\right)}{2k+1}", equation);
if(vw>1.1*vh){
    vw = 1.1*vh;
}
if(vh>1.2*vw){
    vh = 1.2*vw;
}
let scale = 2;
let subxunit = scale*vw;
let subyunit = scale*vh;

let xunit = 2*subxunit;
let yunit = 2*subyunit;

let cw = 80*vw;
let ch = 80*vh;

canvas.style.width = cw + "px";
canvas.style.height = ch + "px";
plane.width = cw;
drawingplane.width = plane.width;
plane.height = ch;
drawingplane.height = plane.height;
let Graph = [
    {
        Function_x: function(t) {
            return t;
        },
        Function_y: function(t) {
            let ans = 0;
            for (let k = 1; k <= 12; k++) {
                ans += Math.sin((2*k+1)*t)/(2*(k+1));
            }
            ans *= 5;
            return ans;
        },
        pRange: {
            l: -10,
            r: 0
        }
    },
    {
        Function_x: function(t) {
            return t;
        },
        Function_y: function(t) {
            let ans = 0;
            for (let k = 1; k <= 12; k++) {
                ans += Math.sin((2*k+1)*t)/(2*(k+1));
            }
            ans *= 5;
            return ans;
        },
        pRange: {
            l: 0,
            r: 10
        }
    }
]
const graphLen = 124.32;
let range= {
    xl: -10,
    xr: 10,
    yl: -10,
    yr: 10
}
