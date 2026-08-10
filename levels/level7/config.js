const plane = document.getElementById('plane');
const drawingplane = document.getElementById('drawingplane')
const canvas = document.getElementById("canvas");
const equation = document.getElementById('equation');
let vw = window.innerWidth/100;
let vh = window.innerHeight/100;
katex.render("y = \\gcd(\\operatorname{round}(x),6)", equation);
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
function mod(n, d) {
    return (n%d + d)%d;
}
const Graph = [
]

for (let i = -10; i <= 10; i++) {
    let add = {
        Function_x: function(t) {
            return t;
        },
        Function_y: function(t) {
            t2 = Math.round(t);
            if (mod(t2,6)==0) return 6;
            if (mod(t2,3)==0) return 3;
            if (mod(t2,2)==0) return 2;
            return 1;
        },
        pRange: {
            l: i-0.5,
            r: i+0.49999999
        }
    }
    Graph.push(add);
}
let range= {
    xl: -10,
    xr: 10,
    yl: -10,
    yr: 10
}
