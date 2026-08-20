const plane = document.getElementById('plane');
const drawingplane = document.getElementById('drawingplane')
const canvas = document.getElementById("canvas");
const equation = document.getElementById('equation');
let vw = window.innerWidth/100;
let vh = window.innerHeight/100;

// katex.render("\\frac{x^{2}}{6.6^{2}}+\\frac{(y+0.6)^{2}}{5.7^{2}}=1",equations);
// katex.render("y = 6.75-6.6\\left(\\frac{x}{3}+1.18\\right)^{2}+1.65\\left(\\frac{x}{3}+1.18\\right), -5.4 \\le x \\le -1.5", equations[1]);
// katex.render("y = 6.75 - 6.6\\left(\\frac{x}{3}-1.18\\right)^2 - 1.65\\left(\\frac{x}{3}-1.18\\right), \\quad 1.5 \\le x \\le 5.4",equations[2]);
// katex.render("y = 0.96 - 2.25\\left(\\frac{x}{3}+0.85\\right)^2, \\quad -4.05 \\le x \\le -1.05",equations[3]);
// katex.render("y = 0.96 - 2.25\\left(\\frac{x}{3}-0.85\\right)^2, \\quad 1.05 \\le x \\le 4.05",equations[4]);
// katex.render("y = -1.65 - 2.4\\sqrt{0.25^2-\\left(\\frac{x}{3}\\right)^2}, \\quad -0.75 \\le x \\le 0.75",equations[5]);
// katex.render("y = -2.16 - 0.96\\sqrt{1-\\left(\\frac{\\frac{x}{3}+0.45}{0.45}\\right)^2}, \\quad -2.7 \\le x \\le 0",equations[6]);
// katex.render("y = -2.16 - 0.96\\sqrt{1-\\left(\\frac{\\frac{x}{3}-0.45}{0.45}\\right)^2}, \\quad 0 \\le x \\le 2.7",equations[7]);
// katex.render("y = 0.15 + 0.15\\left(\\frac{x}{3}+1.4\\right)^2, \\quad -9 \\le x \\le -4.2",equations[8]);
// katex.render("y = -1.14 - 0.06\\left(\\frac{x}{3}+1.4\\right)^2, \\quad -9 \\le x \\le -4.2",equations[9]);
// katex.render("y = -2.34 - 0.24\\left(\\frac{x}{3}+1.4\\right)^2, \\quad -9 \\le x \\le -4.2",equations[10]);
// katex.render("y = 0.15 + 0.15\\left(\\frac{x}{3}-1.4\\right)^2, \\quad 4.2 \\le x \\le 9",equations[11]);
// katex.render("y = -1.14 - 0.06\\left(\\frac{x}{3}-1.4\\right)^2, \\quad 4.2 \\le x \\le 9",equations[12]);
//katex.render("y = -2.34 - 0.24\\left(\\frac{x}{3}-1.4\\right)^2, \\quad 4.2 \\le x \\le 9",equations[13]);
let equations=[
    "\\begin{aligned} y &= -0.6\\pm5.7\\sqrt{1-\\frac{x^2}{6.6^2}} \\\\",
    "y &= 6.75 - 6.6\\left(\\frac{\\left|x\\right|}{3}-1.18\\right)^2 - 1.65\\left(\\frac{\\left|x\\right|}{3}-1.18\\right), \\quad 1.5 \\le \\left|x\\right| \\le 5.4 \\\\",
    "y &= 0.96 - 2.25\\left(\\frac{\\left|x\\right|}{3}-0.85\\right)^2, \\quad 1.05 \\le \\left|x\\right| \\le 4.05 \\\\",
    "y &= -1.65 - 2.4\\sqrt{0.25^2-\\left(\\frac{x}{3}\\right)^2}, \\quad -0.75 \\le x \\le 0.75 \\\\",
    "y &= -2.16 - 0.96\\sqrt{1-\\left(\\frac{\\left|x\\right|-1.35}{1.35}\\right)^2}, \\quad 0 \\le \\left|x\\right| \\le 2.7 \\\\",
    "y &= 0.15 + 0.15\\left(\\frac{x}{3}+1.4\\right)^2, \\quad -9 \\le x \\le -4.2 \\\\",
    "y &= -1.14 - 0.06\\left(\\frac{x}{3}+1.4\\right)^2, \\quad -9 \\le x \\le -4.2 \\\\",
    "y &= -2.34 - 0.24\\left(\\frac{x}{3}+1.4\\right)^2, \\quad -9 \\le x \\le -4.2 \\\\",
    "y &= 0.15 + 0.15\\left(\\frac{x}{3}-1.4\\right)^2, \\quad 4.2 \\le x \\le 9 \\\\",
    "y &= -1.14 - 0.06\\left(\\frac{x}{3}-1.4\\right)^2, \\quad 4.2 \\le x \\le 9 \\\\",
    "y &= -2.34 - 0.24\\left(\\frac{x}{3}-1.4\\right)^2, \\quad 4.2 \\le x \\le 9 \\end{aligned}"
]
let allequations = "";
for (let i = 0; i < 11; i++) {
    allequations += equations[i];
}
katex.render(allequations,equation);
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
const Graph = [
    {
        Function_x: function(t) {
            return 6.6*Math.cos(t);
        },
        Function_y: function(t) {
            return 5.7*Math.sin(t)-0.6;
        },
        pRange: {
            l: 0,
            r: 2*Math.PI
        }
    },
    {
        Function_x: function(t) {
            return t;
        },
        Function_y: function(t) {
            return 6.75-6.6*(t/3+1.18)**2+1.65*(t/3+1.18);
        },
        pRange: {
            l: -5.4,
            r: -1.5
        }
    },
    {
        Function_x: function(t) {
            return t;
        },
        Function_y: function(t) {
            return 6.75-6.6*(t/3-1.18)**2-1.65*(t/3-1.18);
        },
        pRange: {
            l: 1.5,
            r: 5.4
        }
    },
    {
        Function_x: function(t) {
            return t;
        },
        Function_y: function(t) {
            return 0.96-2.25*(t/3+0.85)**2;
        },
        pRange: {
            l: -4.05,
            r: -1.05
        }
    },
    {
        Function_x: function(t) {
            return t;
        },
        Function_y: function(t) {
            return 0.96-2.25*(t/3-0.85)**2;
        },
        pRange: {
            l: 1.05,
            r: 4.05
        }
    },
    {
        Function_x: function(t) {
            return t;
        },
        Function_y: function(t) {
            return -1.65-2.4*Math.sqrt(0.25**2-(t/3)**2);
        },
        pRange: {
            l: -0.75,
            r: 0.75
        }
    },
    {
        Function_x: function(t) {
            return t;
        },
        Function_y: function(t) {
            return -2.16-0.96*Math.sqrt(1-(((t/3+0.45)/0.45)**2));
        },
        pRange: {
            l: -2.7,
            r: 0
        }
    },
    {
        Function_x: function(t) {
            return t;
        },
        Function_y: function(t) {
            return -2.16-0.96*Math.sqrt(1-(((t/3-0.45)/0.45)**2));
        },
        pRange: {
            l: 0,
            r: 2.7
        }
    },
    {
        Function_x: function(t) {
            return t;
        },
        Function_y: function(t) {
            return 0.15+0.15*(t/3+1.4)**2;
        },
        pRange: {
            l: -9,
            r: -4.2
        }
    },
    {
        Function_x: function(t) {
            return t;
        },
        Function_y: function(t) {
            return -1.14-0.06*(t/3+1.4)**2;
        },
        pRange: {
            l: -9,
            r: -4.2
        }
    },
    {
        Function_x: function(t) {
            return t;
        },
        Function_y: function(t) {
            return -2.34-0.24*(t/3+1.4)**2;
        },
        pRange: {
            l: -9,
            r: -4.2
        }
    },
    {
        Function_x: function(t) {
            return t;
        },
        Function_y: function(t) {
            return 0.15+0.15*(t/3-1.4)**2;
        },
        pRange: {
            l: 4.2,
            r: 9
        }
    },
    {
        Function_x: function(t) {
            return t;
        },
        Function_y: function(t) {
            return -1.14-0.06*(t/3-1.4)**2;
        },
        pRange: {
            l: 4.2,
            r: 9
        }
    },
    {
        Function_x: function(t) {
            return t;
        },
        Function_y: function(t) {
            return -2.34-0.24*(t/3-1.4)**2;
        },
        pRange: {
            l: 4.2,
            r: 9
        }
    }
]
let range= {
    xl: -10,
    xr: 10,
    yl: -10,
    yr: 10
}
if(window.matchMedia("(min-width: 769px)").matches){
    const undobutton2 = document.getElementById("undobutton");
    const equation2 = document.getElementById("equation");
    const darkmodebutton2 = document.getElementById("darkbutton");
    equation2.style.fontSize = "2vh";
    let equationxcoordleft = equation2.getBoundingClientRect().left;
    let equationxcoordright = equation2.getBoundingClientRect().right;
    let undobuttonxcoord1 = undobutton2.getBoundingClientRect().left + undobutton2.getBoundingClientRect().width;
    let darkbuttonxcoord = darkmodebutton2.getBoundingClientRect().right + darkmodebutton2.getBoundingClientRect().width;
    while(equationxcoordleft <= undobuttonxcoord1 + 10 || equationxcoordright >= darkbuttonxcoord - 10){
        let currentfontsize = parseFloat(equation2.style.fontSize);
        equation2.style.fontSize = (currentfontsize*0.95) + "vh";
        darkbuttonxcoord = darkmodebutton2.getBoundingClientRect().right + darkmodebutton2.getBoundingClientRect().width;
        equationxcoordleft = equation2.getBoundingClientRect().left;
        equationxcoordright = equation2.getBoundingClientRect().right;
        undobuttonxcoord1 = undobutton2.getBoundingClientRect().left + undobutton2.getBoundingClientRect().width;
    }
}
window.addEventListener("resize",()=>{
    if(window.matchMedia("(min-width: 769px)").matches){
         const undobutton2 = document.getElementById("undobutton");
        const equation2 = document.getElementById("equation");
        const darkmodebutton2 = document.getElementById("darkbutton");
        equation2.style.fontSize = "2vh";
        let equationxcoordleft = equation2.getBoundingClientRect().left;
        let equationxcoordright = equation2.getBoundingClientRect().right;
        let undobuttonxcoord1 = undobutton2.getBoundingClientRect().left + undobutton2.getBoundingClientRect().width;
        let darkbuttonxcoord = darkmodebutton2.getBoundingClientRect().right + darkmodebutton2.getBoundingClientRect().width;
        while(equationxcoordleft <= undobuttonxcoord1 + 10 || equationxcoordright >= darkbuttonxcoord - 10){
            let currentfontsize = parseFloat(equation2.style.fontSize);
            equation2.style.fontSize = (currentfontsize*0.95) + "vh";
            darkbuttonxcoord = darkmodebutton2.getBoundingClientRect().right + darkmodebutton2.getBoundingClientRect().width;
            equationxcoordleft = equation2.getBoundingClientRect().left;
            equationxcoordright = equation2.getBoundingClientRect().right;
            undobuttonxcoord1 = undobutton2.getBoundingClientRect().left + undobutton2.getBoundingClientRect().width;
        }
    }
});
