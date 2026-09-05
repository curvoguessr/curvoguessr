const plane = document.getElementById('plane');
const drawingplane = document.getElementById('drawingplane')
const canvas = document.getElementById("canvas");
const equation = document.getElementById('equation');
let vw = window.innerWidth/100;
const lvl = 13;
let vh = window.innerHeight/100;
katex.render("\\sin(y) = x^3", equation);
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
let Graph = [
]
for (let i = -10; i <= 5; i += 5) {
    let add = {
        Function_x: function(t) {
            if (Math.sin(t)>=0) return Math.pow(Math.sin(t),1/3);
            return -Math.pow(-Math.sin(t),1/3);
        },
        Function_y: function(t) {
            return t;
        },
        pRange: {
            l: i,
            r: i+5
        }
    };
    Graph.push(add);
}
const graphLen = 27.38;
let range= {
    xl: -10,
    xr: 10,
    yl: -10,
    yr: 10
}
