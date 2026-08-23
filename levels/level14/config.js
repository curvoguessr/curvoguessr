const plane = document.getElementById('plane');
const drawingplane = document.getElementById('drawingplane')
const canvas = document.getElementById("canvas");
const equation = document.getElementById('equation');
let vw = window.innerWidth/100;
const lvl = 14;
let vh = window.innerHeight/100;
katex.render("y+e = e^{\\sec\\left(\\frac{3x}{4}\\right)}", equation);
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
            return Math.exp(1/Math.cos(3*t/4)) - Math.E;
        },
        pRange: {
            l: -9.933,
            r: -6.823
        }
    },
    {
        Function_x: function(t) {
            return t;
        },
        Function_y: function(t) {
            return Math.exp(1/Math.cos(3*t/4)) - Math.E;
        },
        pRange: {
            l: -6.17,
            r: -2.13
        }
    },
    {
        Function_x: function(t) {
            return t;
        },
        Function_y: function(t) {
            return Math.exp(1/Math.cos(3*t/4)) - Math.E;
        },
        pRange: {
            l: -1.555,
            r: 1.554
        }
    },
    {
        Function_x: function(t) {
            return t;
        },
        Function_y: function(t) {
            return Math.exp(1/Math.cos(3*t/4)) - Math.E;
        },
        pRange: {
            l: 2.13,
            r: 6.17
        }
    },
    {
        Function_x: function(t) {
            return t;
        },
        Function_y: function(t) {
            return Math.exp(1/Math.cos(3*t/4)) - Math.E;
        },
        pRange: {
            l: 6.823,
            r: 9.933
        }
    }
]
const graphLen = 71.29;
let range= {
    xl: -10,
    xr: 10,
    yl: -10,
    yr: 10
}
