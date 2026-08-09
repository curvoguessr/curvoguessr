const plane = document.getElementById('plane');
const drawingplane = document.getElementById('drawingplane')
const canvas = document.getElementById("canvas");
let vw = window.innerWidth/100;
let vh = window.innerHeight/100;
if(vw>1.1*vh){
    vw = 1.1*vh;
}
if(vh>1.2*vw){
    vh = 1.2*vw;
}
let subxunit = 2*vw;
let subyunit = 2*vh;

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
let range= {
    xl: -10,
    xr: 10,
    yl: -10,
    yr: 10
}