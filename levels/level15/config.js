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
            return Math.sin(2*t);
        },
        Function_y: function(t) {
            return Math.cos(3*t);
        },
        pRange: {
            l: 0,
            r: 0.5*Math.PI
        }
    },
    {
        Function_x: function(t) {
            return Math.sin(2*t);
        },
        Function_y: function(t) {
            return Math.cos(3*t);
        },
        pRange: {
            l: 0.5*Math.PI,
            r: Math.PI
        }
    },
    {
        Function_x: function(t) {
            return Math.sin(2*t);
        },
        Function_y: function(t) {
            return Math.cos(3*t);
        },
        pRange: {
            l: Math.PI,
            r: 1.5*Math.PI
        }
    },
    {
        Function_x: function(t) {
            return Math.sin(2*t);
        },
        Function_y: function(t) {
            return Math.cos(3*t);
        },
        pRange: {
            l: 1.5*Math.PI,
            r: 2*Math.PI
        }
    }
]
let range= {
    xl: -10,
    xr: 10,
    yl: -10,
    yr: 10
}