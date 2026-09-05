const plane = document.getElementById('plane');
const drawingplane = document.getElementById('drawingplane')
const canvas = document.getElementById("canvas");
const equation = document.getElementById('equation');
let vw = window.innerWidth/100;
const lvl = 3;
let vh = window.innerHeight/100;
katex.render("y = x - \\cos(x)", equation);
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
const undoplane = document.getElementById("undoplane");
undoplane.width = plane.width;
undoplane.height = plane.height;

const mod = (n, d) => ((n % d) + d) % d;
const Graph = [
    {
        Function_x: function(t) {
            return t;
        },
        Function_y: function(t) {
            return t-Math.cos(t);
        },
        pRange: {
            l: -10,
            r: 10
        }
    }
]
const graphLen = 30.17;
let range= {
    xl: -10,
    xr: 10,
    yl: -10,
    yr: 10
}
