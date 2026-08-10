const plane = document.getElementById('plane');
const drawingplane = document.getElementById('drawingplane')
const canvas = document.getElementById("canvas");
const equation = document.getElementById('equation');
let vw = window.innerWidth/100;
let vh = window.innerHeight/100;
katex.render("y = x - \\frac{1}{x^2}", equation);
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
const Graph = [
    {
        Function_x: function(t) {
            return t;
        },
        Function_y: function(t) {
            return t - (1/(t*t));
        },
        pRange: {
            l: -10,
            r: -0.3
        }
    },
    {
        Function_x: function(t) {
            return t;
        },
        Function_y: function(t) {
            return t - (1/(t*t));
        },
        pRange: {
            l: 0.3,
            r: 10
        }
    }
]
let range= {
    xl: -10,
    xr: 10,
    yl: -10,
    yr: 10
}
