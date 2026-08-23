const plane = document.getElementById('plane');
const drawingplane = document.getElementById('drawingplane')
const canvas = document.getElementById("canvas");
const equation = document.getElementById('equation');
let vw = window.innerWidth/100;
const lvl = 19;
let vh = window.innerHeight/100;
katex.render("\\sin(y) = \\sin^2(x)", equation);
if(vw>1.1*vh){
    vw = 1.1*vh;
}
if(vh>1.2*vw){
    vh = 1.2*vw;
}
let scale = 4;
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
            return Math.asin(Math.pow(Math.sin(t),2));
        },
        pRange: {
            l: -10,
            r: 10
        }
    },
    {
        Function_x: function(t) {
            return t;
        },
        Function_y: function(t) {
            return Math.PI-Math.asin(Math.pow(Math.sin(t),2));
        },
        pRange: {
            l: -10,
            r: 10
        }
    }
]
const graphLen = 57.4;
let range= {
    xl: -5,
    xr: 5,
    yl: -5,
    yr: 5
}
