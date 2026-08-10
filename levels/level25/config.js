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
            return t;
        },
        Function_y: function(t) {
            return 2*Math.sin(Math.pow(Math.PI, 2.5)*0.5*t)*Math.sqrt((Math.exp(2)-Math.pow(0.5*t,2))/2)+2*Math.sqrt(Math.abs(0.5*t));
        },
        pRange: {
            l: -2*Math.E,
            r: 2*Math.E
        }
    }
]
let range= {
    xl: -10,
    xr: 10,
    yl: -10,
    yr: 10
}