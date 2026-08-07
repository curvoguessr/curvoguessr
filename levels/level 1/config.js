const plane = document.getElementById('plane');
const drawingplane = document.getElementById('drawingplane')

let vw = window.innerWidth/100;
let vh = window.innerHeight/100;
if(vw>3*vh/2){
    vw = 3*vh/2;
}
let subxunit = 2*vw;
let subyunit = 2*vh;

let xunit = 2*subxunit;
let yunit = 2*subyunit;

let cw = 80*vw;
let ch = 80*vh;

plane.width = cw;
drawingplane.width = cw;
plane.height = ch;
drawingplane.height = ch;


function Function_x(t) {
    return t;
}
function Function_y(t) {
    return t;
}

const range = {
    xl : -10,
    xr : 10,
    yl : -10,
    yr: 10
};

const pRange = {
    l : 0,
    r : 1
};
