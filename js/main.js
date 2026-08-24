if (localStorage.getItem("colourmode")==null) {
    localStorage.setItem("colourmode",colourmode);
}
colourmode = localStorage.getItem("colourmode");
if(colourmode == "dark"){
    defaultcolour1 = "#121212";
    defaultcolour2 = "#d6d6d6";
    defaultcolour3 = "white";
    document.body.style.backgroundColor = defaultcolour1;
    let Accuracy = document.getElementById("accuracy");
    let Best = document.getElementById("best");
    Accuracy.style.color = defaultcolour2;
    Best.style.color = defaultcolour2
    if(mode == "pen"){
        DrawingPlane.style.cursor = "url('../../images/pencursordark.png') 16 16, auto";
    }
    if(mode == "eraser"){
        DrawingPlane.style.cursor = "url('../../images/erasercursordark.png') 16 16, auto";
    }
    // const fontsz = (cw+ch)/60;
    // document.fonts.load(`${fontsz}px BreeSerif`)
    //     .then(()=>DrawAxis(subxunit,xunit,cw,subyunit,yunit,ch))
    //     .catch(()=>DrawAxis(subxunit,xunit,cw,subyunit,yunit,ch));
    DrawAxis(subxunit,xunit,cw,subyunit,yunit,ch)
    disable(dark);
    disable(darkmob);
    enable(light);
    enable(lightmob);
}
else {
    defaultcolour1 = "#d6d6d6";
    defaultcolour2 = "#121212";
    defaultcolour3 = "black";
    document.body.style.backgroundColor = defaultcolour1;
    let Accuracy = document.getElementById("accuracy");
    let Best = document.getElementById("best");
    Accuracy.style.color = defaultcolour2;
    Best.style.color = defaultcolour2
    if(mode == "pen"){
        DrawingPlane.style.cursor = "url('../../images/pencursorlight.png') 16 16, auto";
    }
    if(mode == "eraser"){
        DrawingPlane.style.cursor = "url('../../images/erasercursorlight.png') 16 16, auto";
    }
    const fontsz = (cw+ch)/60;
    document.fonts.load(`${fontsz}px BreeSerif`).then(() => {
        DrawAxis(subxunit,xunit,cw,subyunit,yunit,ch);
    });
    disable(light);
    disable(lightmob);
    enable(dark);
    enable(darkmob);
}
if(localStorage.getItem("lvl" + lvl) !== null){
    let Best = document.getElementById("best");
    Best.style.color = defaultcolour2;
    Best.textContent = "Best: " + + localStorage.getItem("lvl" + lvl).toString() + "%";
}
let equationleft = equation.getBoundingClientRect().left;
let equationright = equation.getBoundingClientRect().right;
let equationwidth = equation.getBoundingClientRect().width;
let equationycoord;
let undomobxcoord = undomob.getBoundingClientRect().left + undomob.getBoundingClientRect().width;
let homemobxcoord = homebuttonmob.getBoundingClientRect().left;
let homemobycoord = homebuttonmob.getBoundingClientRect().top;
let alrTransformed = false;
let reSizeTimeout;
let undoxcoord;
let darkxcoord;
let safety = 0;
let centerthings1 = document.querySelector(".centerthings");
const replay = document.getElementById("replay");
const giveupbutton = document.getElementById("giveup");
const share = document.getElementById("share");
const next = document.getElementById("next");
const easteregg = document.getElementById("easteregg");
            
// let sharebutton1 = document.getElementById("share");
// let replaybutton1 = document.getElementById("replay");
// let giveupbutton1 = document.getElementById("giveup");
// let nextlevelbutton1 = document.getElementById("next");
// let easteregg1 = document.getElementById("easteregg");
if(window.matchMedia("(max-width: 768px)").matches){
    if(homemobxcoord <= equationright + 10 || undomobxcoord + 10 >= equationleft ){
        //centerthings1.style.transform = "translateY(100px)";
        centerthings1.style.marginTop = "calc(min(8vw, 47px) + 19px + 37px)";
        alrTransformed = true;
    }
}
let drawingplaneleft = drawingplane.getBoundingClientRect().left;
let drawingplaneright = drawingplane.getBoundingClientRect().right;
let drawingplanewidth = drawingplane.getBoundingClientRect().width;
while((equationleft <= drawingplaneleft + 10 || equationright > drawingplaneright + 10) && safety <= 300){
    let currentfontsize = parseFloat(equation.style.fontSize) || 4.5;
    equation.style.fontSize = (currentfontsize*0.95) + "vh";
    equationleft = equation.getBoundingClientRect().left;
    equationright = equation.getBoundingClientRect().right;
    drawingplaneleft = drawingplane.getBoundingClientRect().left;
    drawingplaneright = drawingplane.getBoundingClientRect().right;
    safety += 1
}
safety = 0;
if(window.matchMedia("(min-width: 769px)").matches){
    if(!equation.style.fontSize){
        equation.style.fontSize = "4.5vh";
    }
    equationleft = equation.getBoundingClientRect().left;
    equationright = equation.getBoundingClientRect().right;
    equationwidth = equation.getBoundingClientRect().width;
    undoxcoord = undo.getBoundingClientRect().left + undo.getBoundingClientRect().width;
    darkxcoord = dark.getBoundingClientRect().left
    while((equationleft <= undoxcoord + 10 || equationleft + equationwidth >= darkxcoord - 10) & safety <= 300){
        let currentfontsize = parseFloat(equation.style.fontSize);
        equation.style.fontSize = (currentfontsize*0.95) + "vh";
        darkxcoord = dark.getBoundingClientRect().left;
        equationleft = equation.getBoundingClientRect().left;
        equationright = equation.getBoundingClientRect().right;
        equationwidth = equation.getBoundingClientRect().width;
        undoxcoord = undo.getBoundingClientRect().left + undo.getBoundingClientRect().width;
        safety += 1;
    }
}
safety = 0;
if(!alrTransformed){
    equationycoord = equation.getBoundingClientRect().top;
    if(equationycoord <= 10){
        // centerthings1.style.marginTop = "calc(4px + min(4vw, 23px))";
        centerthings1.style.marginTop = "calc(41px + min(4vw, 23px))";
    }
}
equationwidth = equation.getBoundingClientRect().width;
while(equationwidth > drawingplanewidth * 0.8 && safety <= 300){
    let currentfontsize = parseFloat(equation.style.fontSize) || 4.5;
    equation.style.fontSize = (currentfontsize * 0.95) + "vh";
    equationwidth = equation.getBoundingClientRect().width;
    safety += 1;
}
safety = 0;
submitwidth = submit.getBoundingClientRect().width;
submit.style.fontSize = "3vh";
replay.style.fontSize = "3vh";
giveupbutton.style.fontSize = "3vh";
share.style.fontSize = "3vh";
next.style.fontSize = "3vh";
easteregg.style.fontSize = "3vh";
submitwidth = submit.getBoundingClientRect().width;
while(submitwidth > drawingplanewidth * 0.2 && safety <= 300){
    let currentfontsize = parseFloat(submit.style.fontSize);
    submit.style.fontSize = (currentfontsize*0.95) + "vh";
    submitwidth = submit.getBoundingClientRect().width;
    replay.style.fontSize = (currentfontsize*0.95) + "vh";
    share.style.fontSize = (currentfontsize*0.95) + "vh";
    giveupbutton.style.fontSize = (currentfontsize*0.95) + "vh";
    next.style.fontSize = (currentfontsize*0.95) + "vh";
    easteregg.style.fontSize = (currentfontsize*0.95) + "vh";
    safety += 1;
}
safety = 0;
let accuracyfont = document.getElementById("accuracy");
let best = document.getElementById("best");
accuracyfont.style.fontSize = "4.5vh";
accuracywidth = accuracyfont.getBoundingClientRect().width;
while(100*accuracywidth > 35*drawingplanewidth && safety <= 300){
    let currentfontsize = parseFloat(accuracyfont.style.fontSize);
    accuracyfont.style.fontSize = (currentfontsize*0.95) + "vh";
    best.style.fontSize = (currentfontsize*0.95) + "vh";
    accuracywidth = accuracyfont.getBoundingClientRect().width;
    safety += 1;
}
window.addEventListener("resize",()=>{
    const canvas = document.getElementById('canvas');
    const plane = document.getElementById('plane');
    const drawingplane = document.getElementById('drawingplane');
    const context1 = plane.getContext("2d");
    const context = drawingplane.getContext("2d");
    context1.resetTransform();
    context1.clearRect(0,0,plane.width,plane.height);
    context.resetTransform();
    context.clearRect(0,0,drawingplane.width,drawingplane.height);
    vw = window.innerWidth/100;
    vh = window.innerHeight/100;
    if(vw>1.1*vh){
       vw = 1.1*vh;
    }
    if(vh>1.2*vw){
        vh = 1.2*vw;
    }
    subxunit = scale*vw;
    subyunit = scale*vh;

    xunit = 2*subxunit;
    yunit = 2*subyunit;

    cw = 80*vw;
    ch = 80*vh;
    canvas.style.width = cw + "px";
    canvas.style.height = ch + "px";
    plane.width = cw;
    drawingplane.width = cw;
    plane.height = ch;
    drawingplane.height = ch;
    rebuilderasergrid();
    //overlap();
    // TransformCanvas(context,cw,ch);
    DrawAxis(subxunit,xunit,cw,subyunit,yunit,ch);
    RedrawUser();
    if (giveup) {
        for (let i = 0; i < Graph.length; i++) {
            DrawGraph(Graph[i].pRange.l, Graph[i].pRange.r, Graph[i].Function_x, Graph[i].Function_y);
        }
    }
    clearTimeout(reSizeTimeout);
    reSizeTimeout = setTimeout(()=>{
        equation.style.fontSize = "4.5vh";
        let equationleft = equation.getBoundingClientRect().left;
        let equationright = equation.getBoundingClientRect().right;
        let equationwidth = equation.getBoundingClientRect().width;
        let equationycoord;
        let centerthings1 = document.querySelector(".centerthings");
        let undomobxcoord = undomob.getBoundingClientRect().left + undomob.getBoundingClientRect().width;
        let homemobxcoord = homebuttonmob.getBoundingClientRect().left;
        let homemobycoord = homebuttonmob.getBoundingClientRect().top;
        let alrTransformed = false;
        let undoxcoord;
        let darkxcoord;
        let submitwidth;
        let accuracywidth;
        let safety = 0;
        const replay = document.getElementById("replay");
        const giveupbutton = document.getElementById("giveup");
        const share = document.getElementById("share");
        const next = document.getElementById("next"); 
        const easteregg = document.getElementById("easteregg"); 
        if(window.matchMedia("(max-width: 768px)").matches){
            if(homemobxcoord <= equationright + 10 || undomobxcoord + 10 >= equationleft ){
                //centerthings1.style.transform = "translateY(100px)";
                centerthings1.style.marginTop = "calc(min(8vw, 47px) + 19px + 37px)";
                alrTransformed = true;
            }
        }
        let drawingplane = document.getElementById("drawingplane");
        let drawingplaneleft = drawingplane.getBoundingClientRect().left;
        let drawingplaneright = drawingplane.getBoundingClientRect().right;
        let drawingplanewidth = drawingplane.getBoundingClientRect().width;
        while((equationleft <= drawingplaneleft + 10 || equationright >= drawingplaneright + 10) && safety <= 300){
            let currentfontsize = parseFloat(equation.style.fontSize);
            equation.style.fontSize = (currentfontsize*0.95) + "vh";
            equationleft = equation.getBoundingClientRect().left;
            equationright = equation.getBoundingClientRect().right;
            drawingplaneleft = drawingplane.getBoundingClientRect().left;
            drawingplaneright = drawingplane.getBoundingClientRect().right;    
            safety += 1;
        }
        safety = 0;
        if(window.matchMedia("(min-width: 769px)").matches){
            equationleft = equation.getBoundingClientRect().left;
            equationright = equation.getBoundingClientRect().right;
            equationwidth = equation.getBoundingClientRect().width;
            undoxcoord = undo.getBoundingClientRect().left + undo.getBoundingClientRect().width;
            darkxcoord = dark.getBoundingClientRect().left;
            while((equationleft <= undoxcoord + 10 || equationleft + equationwidth >= darkxcoord - 10) && safety <= 300){
                let currentfontsize = parseFloat(equation.style.fontSize);
                equation.style.fontSize = (currentfontsize*0.95) + "vh";
                darkxcoord = dark.getBoundingClientRect().left;
                equationleft = equation.getBoundingClientRect().left;
                equationright = equation.getBoundingClientRect().right;
                equationwidth = equation.getBoundingClientRect().width;
                undoxcoord = undo.getBoundingClientRect().left + undo.getBoundingClientRect().width;
                safety += 1;
            }
        }
        if(!alrTransformed){
            equationycoord = equation.getBoundingClientRect().top;
            if(equationycoord <= 10){
                // centerthings1.style.marginTop = "calc(4px + min(4vw, 23px))";
                centerthings1.style.marginTop = "calc(41px + min(4vw, 23px))";
            }
        }
        safety = 0;
        equationwidth = equation.getBoundingClientRect().width;
        while((equationwidth > drawingplanewidth * 0.8) && safety <= 300){
            let currentfontsize = parseFloat(equation.style.fontSize) || 4.5;
            equation.style.fontSize = (currentfontsize * 0.95) + "vh";
            equationwidth = equation.getBoundingClientRect().width;
            safety += 1;
        }
        safety = 0;
        submitwidth = submit.getBoundingClientRect().width;
        submit.style.fontSize = "3vh";
        replay.style.fontSize = "3vh";
        giveupbutton.style.fontSize = "3vh";
        share.style.fontSize = "3vh";
        next.style.fontSize = "3vh";
        easteregg.style.fontSize = "3vh";
        submitwidth = submit.getBoundingClientRect().width;
        while(submitwidth > drawingplanewidth * 0.2 && safety <= 300){
            let currentfontsize = parseFloat(submit.style.fontSize);
            submit.style.fontSize = (currentfontsize*0.95) + "vh";
            submitwidth = submit.getBoundingClientRect().width;
            replay.style.fontSize = (currentfontsize*0.95) + "vh";
            share.style.fontSize = (currentfontsize*0.95) + "vh";
            giveupbutton.style.fontSize = (currentfontsize*0.95) + "vh";
            next.style.fontSize = (currentfontsize*0.95) + "vh";
            easteregg.style.fontSize = (currentfontsize*0.95) + "vh";
            safety += 1;
        }
        safety = 0;
        let accuracyfont = document.getElementById("accuracy");
        let best = document.getElementById("best");
        accuracyfont.style.fontSize = "4.5vh";
        accuracywidth = accuracyfont.getBoundingClientRect().width;
        while(100*accuracywidth > 35*drawingplanewidth && safety <= 300){
            let currentfontsize = parseFloat(accuracyfont.style.fontSize);
            accuracyfont.style.fontSize = (currentfontsize*0.95) + "vh";
            best.style.fontSize = (currentfontsize*0.95) + "vh";
            accuracywidth = accuracyfont.getBoundingClientRect().width;
            safety += 1;
        }
    }, 100);
});
window.addEventListener("load",()=>{
    if(history.scrollRestoration){
        history.scrollRestoration = "manual";
    }
    window.scrollTo(0,0);
});
InitializeError();

UserDrawing();
