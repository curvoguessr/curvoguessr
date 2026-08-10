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
    
]
for (let i = -5; i <= 5; i++) {
    let add = {
        Function_x: function(t) {
            return 4*t/3;
        },
        Function_y: function(t) {
            return Math.exp(1/Math.cos(t))-Math.E;
        },
        pRange: {
            l: i*Math.PI - (Math.PI/2)+0.01,
            r: i*Math.PI + (Math.PI/2)-0.01
        }
    };
    Graph.push(add);
}
let range= {
    xl: -10,
    xr: 10,
    yl: -10,
    yr: 10
}