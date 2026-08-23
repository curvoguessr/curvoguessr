if (sessionStorage.getItem("colourmode")==null) {
    sessionStorage.setItem("colourmode",colourmode);
}
colourmode = sessionStorage.getItem("colourmode");
if(colourmode == "dark"){
    defaultcolour1 = "#121212";
    defaultcolour2 = "#d6d6d6";
    defaultcolour3 = "white";
    document.body.style.backgroundColor = defaultcolour1;
    let Accuracy = document.getElementById("accuracy");
    Accuracy.style.color = defaultcolour2;
    Accuracy.innerHTML = "Accuracy: "
    if(mode == "pen"){
        DrawingPlane.style.cursor = "url('../../images/pencursordark.png') 16 16, auto";
    }
    if(mode == "eraser"){
        DrawingPlane.style.cursor = "url('../../images/erasercursordark.png') 16 16, auto";
    }
    const fontsz = (cw+ch)/60;
    document.fonts.load(`${fontsz}px BreeSerif`).then(() => {
        DrawAxis(subxunit,xunit,cw,subyunit,yunit,ch);
    });
    disable(darkbutton);
    disable(darkbuttonmob);
    enable(lightbutton);
    enable(lightbuttonmob);
}
else {
    defaultcolour1 = "#d6d6d6";
    defaultcolour2 = "#121212";
    defaultcolour3 = "black";
    document.body.style.backgroundColor = defaultcolour1;
    let Accuracy = document.getElementById("accuracy");
    Accuracy.style.color = defaultcolour2;
    Accuracy.innerHTML = "Accuracy: "
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
    disable(lightbutton);
    disable(lightbuttonmob);
    enable(darkbutton);
    enable(darkbuttonmob);
}
// function overlap(){
//     const plane = document.getElementById("plane");
//     const drawingplane = document.getElementById("drawingplane");
//     const rect = plane.getBoundingClientRect();
//     drawingplane.style.position = "fixed";
//     drawingplane.style.top = rect.top + "px";
//     drawingplane.style.left = rect.left + "px";
//     drawingplane.width = rect.width;
//     drawingplane.height = rect.height;
// }
// window.addEventListener("load",()=>{
//     overlap();
// });
let equation1 = document.getElementById("equation");
let equationleft = equation1.getBoundingClientRect().left;
let equationright = equation1.getBoundingClientRect().right;
let centerthings1 = document.querySelector(".centerthings");
let undobuttonmob1 = document.getElementById("undobuttonmob");
let undobuttonmobxcoord = undobuttonmob1.getBoundingClientRect().left + undobuttonmob.getBoundingClientRect().width;
let tutorialbuttonmob1 = document.getElementById("tutorialbuttonmob");
let tutotiralbuttonmobxcoord = tutorialbuttonmob1.getBoundingClientRect().left;
if(window.matchMedia("(max-width: 768px)").matches){
    if(tutotiralbuttonmobxcoord <= equationright + 10 || undobuttonmobxcoord + 10 >= equationleft ){
        //centerthings1.style.transform = "translateY(100px)";
        centerthings1.style.transform = "translateY(calc(min(8vw, 47px) + 9px + min(4.8vw,66.64px) + 10px))";
    }
}
window.addEventListener("resize",()=>{
    const canvas = document.getElementById('canvas');
    const plane = document.getElementById('plane');
    const drawingplane = document.getElementById('drawingplane');
    const context1 = plane.getContext("2d");
    const context = drawingplane.getContext("2d");
    let equation1 = document.getElementById("equation");
    let equationleft = equation1.getBoundingClientRect().left;
    let equationright = equation1.getBoundingClientRect().right;
    let centerthings1 = document.querySelector(".centerthings");
    let undobuttonmob1 = document.getElementById("undobuttonmob");
    let undobuttonmobxcoord = undobuttonmob1.getBoundingClientRect().left + undobuttonmob.getBoundingClientRect().width;
    let tutorialbuttonmob1 = document.getElementById("tutorialbuttonmob");
    let tutotiralbuttonmobxcoord = tutorialbuttonmob1.getBoundingClientRect().left;
    
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
    //overlap();
    // TransformCanvas(context,cw,ch);
    DrawAxis(subxunit,xunit,cw,subyunit,yunit,ch);
    RedrawUser();
    if (giveup) {
        for (let i = 0; i < Graph.length; i++) {
            DrawGraph(Graph[i].pRange.l, Graph[i].pRange.r, Graph[i].Function_x, Graph[i].Function_y);
        }
    }
    if(window.matchMedia("(max-width: 768px)").matches){
        if(tutotiralbuttonmobxcoord <= equationright + 10 || undobuttonmobxcoord + 10 >= equationleft ){
            //centerthings1.style.transform = "translateY(100px)";
            centerthings1.style.transform = "translateY(calc(min(8vw, 47px) + 9px + min(4.8vw,66.64px) + 10px))";
        }
    }
});
window.addEventListener("load",()=>{
    if(history.scrollRestoration){
        history.scrollRestoration = "manual";
    }
    window.scrollTo(0,0);
});
InitializeError();

UserDrawing();