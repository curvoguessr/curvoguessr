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
const Graph = [
    {
        Function_x: function(t) {
            return t;
        },
        Function_y: function(t) {
            return Math.sqrt(t*(t+2)*(t-1));
        },
        pRange: {
            l: -2,
            r: 0
        }
    },
    {
        Function_x: function(t) {
            return t;
        },
        Function_y: function(t) {
            return -Math.sqrt(t*(t+2)*(t-1));
        },
        pRange: {
            l: -2,
            r: 0
        }
    },
    {
        Function_x: function(t) {
            return t;
        },
        Function_y: function(t) {
            return Math.sqrt(t*(t+2)*(t-1));
        },
        pRange: {
            l: 1,
            r: 5
        }
    },
    {
        Function_x: function(t) {
            return t;
        },
        Function_y: function(t) {
            return -Math.sqrt(t*(t+2)*(t-1));
        },
        pRange: {
            l: 1,
            r: 5
        }
    }
]
let range= {
    xl: -20,
    xr: 20,
    yl: -20,
    yr: 20
}