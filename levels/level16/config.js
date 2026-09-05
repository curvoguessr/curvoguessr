const plane = document.getElementById('plane');
const drawingplane = document.getElementById('drawingplane')
const canvas = document.getElementById("canvas");
const equation = document.getElementById('equation');
let vw = window.innerWidth/100;
const lvl = 16;
let vh = window.innerHeight/100;
katex.render("y^2 = x^3 \\sin(x)", equation);
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
    {
        Function_x: function(t) {
            return t;
        },
        Function_y: function(t) {
            return Math.sqrt(Math.pow(t,3)*Math.sin(t));
        },
        pRange: {
            l: 0,
            r: Math.PI
        }
    },
    {
        Function_x: function(t) {
            return t;
        },
        Function_y: function(t) {
            return Math.sqrt(Math.pow(t,3)*Math.sin(t));
        },
        pRange: {
            l: 2*Math.PI+0.000000001,
            r: 6.63
        }
    },
    {
        Function_x: function(t) {
            return t;
        },
        Function_y: function(t) {
            return Math.sqrt(Math.pow(t,3)*Math.sin(t));
        },
        pRange: {
            l: 9.3,
            r: 3*Math.PI
        }
    },
    {
        Function_x: function(t) {
            return t;
        },
        Function_y: function(t) {
            return Math.sqrt(Math.pow(t,3)*Math.sin(t));
        },
        pRange: {
            l: -Math.PI,
            r: 0
        }
    },
    {
        Function_x: function(t) {
            return t;
        },
        Function_y: function(t) {
            return Math.sqrt(Math.pow(t,3)*Math.sin(t));
        },
        pRange: {
            l: -3*Math.PI,
            r: -9.3
        }
    },
    {
        Function_x: function(t) {
            return t;
        },
        Function_y: function(t) {
            return Math.sqrt(Math.pow(t,3)*Math.sin(t));
        },
        pRange: {
            l: -6.63,
            r: -2*Math.PI-0.000000001
        }
    },

    // Negative sqrt
    {
        Function_x: function(t) {
            return t;
        },
        Function_y: function(t) {
            return -Math.sqrt(Math.pow(t,3)*Math.sin(t));
        },
        pRange: {
            l: 0,
            r: Math.PI
        }
    },
    {
        Function_x: function(t) {
            return t;
        },
        Function_y: function(t) {
            return -Math.sqrt(Math.pow(t,3)*Math.sin(t));
        },
        pRange: {
            l: 2*Math.PI+0.000000001,
            r: 6.63
        }
    },
    {
        Function_x: function(t) {
            return t;
        },
        Function_y: function(t) {
            return -Math.sqrt(Math.pow(t,3)*Math.sin(t));
        },
        pRange: {
            l: 9.3,
            r: 3*Math.PI
        }
    },
    {
        Function_x: function(t) {
            return t;
        },
        Function_y: function(t) {
            return -Math.sqrt(Math.pow(t,3)*Math.sin(t));
        },
        pRange: {
            l: -Math.PI,
            r: 0
        }
    },
    {
        Function_x: function(t) {
            return t;
        },
        Function_y: function(t) {
            return -Math.sqrt(Math.pow(t,3)*Math.sin(t));
        },
        pRange: {
            l: -3*Math.PI,
            r: -9.3
        }
    },
    {
        Function_x: function(t) {
            return t;
        },
        Function_y: function(t) {
            return -Math.sqrt(Math.pow(t,3)*Math.sin(t));
        },
        pRange: {
            l: -6.63,
            r: -2*Math.PI-0.000000001
        }
    }
]; 
const graphLen = 109.6;
let range= {
    xl: -10,
    xr: 10,
    yl: -10,
    yr: 10
}
