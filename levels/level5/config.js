const plane = document.getElementById('plane');
const drawingplane = document.getElementById('drawingplane')
const canvas = document.getElementById("canvas");
const equation = document.getElementById('equation');
const equation1 = document.getElementById('equation1');
const eastereggsixseven = document.getElementById('eastereggsixseven');
const lvl = 5;
let vh = window.innerHeight/100;
let vw = window.innerHeight/100;
katex.render("x^2 + y^2 = ", equation1);
katex.render("67", eastereggsixseven);
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
const Graph = [
    {
        Function_x: function(t) {
            return Math.sqrt(67)*Math.cos(t);
        },
        Function_y: function(t) {
            return Math.sqrt(67)*Math.sin(t);
        },
        pRange: {
            l: 0,
            r: 2*Math.PI
        }
    }
]
const graphLen = 25.71;
let range= {
    xl: -10,
    xr: 10,
    yl: -10,
    yr: 10
}

eastereggsixseven.addEventListener("click", ()=>{
    window.location.href="../level67/index.html";
});
