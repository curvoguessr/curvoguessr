const plane = document.getElementById('plane');
const drawingplane = document.getElementById('drawingplane')
const canvas = document.getElementById("canvas");
const equation = document.getElementById('equation');
let vw = window.innerWidth/100;
const lvl = 20;
let vh = window.innerHeight/100;
katex.render("(x^2+y^2)^2 = 36(x^2-y^2)", equation);
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
            return (6*Math.cos(t))/(1+Math.pow(Math.sin(t),2));
        },
        Function_y: function(t) {
            return (6*Math.cos(t)*Math.sin(t))/(1+Math.pow(Math.sin(t),2));
        },
        pRange: {
            l: 0,
            r: Math.PI/2
        }
    },
    {
        Function_x: function(t) {
            return (6*Math.cos(t))/(1+Math.pow(Math.sin(t),2));
        },
        Function_y: function(t) {
            return (6*Math.cos(t)*Math.sin(t))/(1+Math.pow(Math.sin(t),2));
        },
        pRange: {
            l: Math.PI/2,
            r: Math.PI
        }
    },
    {
        Function_x: function(t) {
            return (6*Math.cos(t))/(1+Math.pow(Math.sin(t),2));
        },
        Function_y: function(t) {
            return (6*Math.cos(t)*Math.sin(t))/(1+Math.pow(Math.sin(t),2));
        },
        pRange: {
            l: -Math.PI,
            r: -Math.PI/2
        }
    },
    {
        Function_x: function(t) {
            return (6*Math.cos(t))/(1+Math.pow(Math.sin(t),2));
        },
        Function_y: function(t) {
            return (6*Math.cos(t)*Math.sin(t))/(1+Math.pow(Math.sin(t),2));
        },
        pRange: {
            l: -Math.PI/2,
            r: 0
        }
    }
]
const graphLen = 31.46;
let range= {
    xl: -10,
    xr: 10,
    yl: -10,
    yr: 10
}
