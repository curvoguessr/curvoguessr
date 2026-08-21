const submitbutton = document.getElementById("submitbutton");      
const penbutton = document.getElementById("penbutton");
const eraserbutton = document.getElementById("eraserbutton");      
const undobutton = document.getElementById("undobutton"); 
const lightbutton = document.getElementById("lightbutton");        
const darkbutton = document.getElementById("darkbutton");
const penbuttonmob = document.getElementById("penbuttonmob");      
const eraserbuttonmob = document.getElementById("eraserbuttonmob");
const undobuttonmob = document.getElementById("undobuttonmob");    
const lightbuttonmob = document.getElementById("lightbuttonmob");  
const darkbuttonmob = document.getElementById("darkbuttonmob");    
const images = document.getElementById("drawingbutton");
const imagesmob = document.getElementById("drawingbuttonmob");
const tutorialbutton = document.getElementById("tutorialbutton");
const tutorialbuttonmob = document.getElementById("tutorialbuttonmob");
const tutorial = document.getElementById("tutorial");
const tutorialtab = document.getElementById("tutorialtab");
let is_submit = false;
let giveup = false;
const DrawingPlane = document.getElementById("drawingplane");
const context = DrawingPlane.getContext('2d');
const rect = DrawingPlane.getBoundingClientRect();
const centerthings = document.getElementsByClassName("centerthings")
let colourmode = "light";
let defaultcolour1 = "#d6d6d6";
let defaultcolour2 = "#121212";
let defaultcolour3 = "black";
let isTutorial = false;
// function invertcolor(canvas){
//     const context = canvas.getContext("2d");
//     const image = context.getImageData(0, 0, canvas.width, canvas.height);     
//     const imagecolor = image.data;
//     for(let i = 0; i < imagecolor.length; i+=4){
//         imagecolor[i] = 255-imagecolor[i];
//         imagecolor[i+1] = 255-imagecolor[i+1];
//         imagecolor[i+2] = 255-imagecolor[i+2];
//     }
//     context.putImageData(image, 0, 0)
// }'
function RedrawUser() {
    context.clearRect(0, 0, cw, ch);
    for (let i = 0; i < drawingHistory.length; i++) {
        const [points, strokeMode] = drawingHistory[i];
        const t = splinepointcount[i];
        if (points.length == 0) continue;
        context.beginPath();
        if (strokeMode == "pen") {
            context.globalCompositeOperation = "source-over";
            context.lineWidth = Math.sqrt(cw*cw+ch*ch)/penScale;
            context.strokeStyle = defaultcolour2;
        }
        else {
            context.globalCompositeOperation = "destination-out";
            context.lineWidth = Math.sqrt(cw*cw+ch*ch)/eraserScale;
        }
        context.lineCap = "round";
        context.lineJoin = "round";
        for (let j = 0; j < points.length; j++) {
            if (j < 3) {
                context.lineTo(points[j].x * cw / 1000, points[j].y * ch / 1000);
            }
            else {
                CatRomGraph(
                    denormalise(destandardize(points[j - 3])),
                    denormalise(destandardize(points[j - 2])),
                    denormalise(destandardize(points[j - 1])),
                    denormalise(destandardize(points[j])),
                    t,
                    context
                );
            }
            context.stroke();
        }
    }
}
function disable(button){
    button.style.transition = "opacity 0.2s ease, filter 0.2s ease";
    button.style.cursor = "not-allowed";
    button.style.opacity = "0.67";
    button.style.filter = "grayscale(33%)";
}
disable(penbutton);
disable(penbuttonmob);
function enable(button){
    button.style.transition = "opacity 0.2s ease, filter 0.2s ease";
    button.style.cursor = "pointer";
    button.style.opacity = "";
    button.style.filter = "";
}
lightbutton.addEventListener("click",() => {
    if(colourmode == "dark"){
        colourmode = "light";
        sessionStorage.setItem("colourmode", colourmode);
        defaultcolour1 = "#d6d6d6";
        defaultcolour2 = "#121212";
        defaultcolour3 = "black";
        document.body.style.backgroundColor = defaultcolour1;
        let Accuracy = document.getElementById("accuracy");
        Accuracy.style.color = defaultcolour2;
        if(mode == "pen"){
            DrawingPlane.style.cursor = "url('../../images/pencursorlight.png') 16 16, auto";
        }
        if(mode == "eraser"){
            DrawingPlane.style.cursor = "url('../../images/erasercursorlight.png') 16 16, auto";
        }
        DrawAxis(subxunit, xunit,cw,subyunit,yunit,ch);
        RedrawUser();
        setTimeout(()=>{
            disable(lightbutton);
            disable(lightbuttonmob);
            enable(darkbutton);
            enable(darkbuttonmob);}, 50);
        //UserDrawing();
    }
});
darkbutton.addEventListener("click",() => {
    if(colourmode == "light"){
        colourmode = "dark";
        sessionStorage.setItem("colourmode", colourmode);
        defaultcolour1 = "#121212";
        defaultcolour2 = "#d6d6d6";
        defaultcolour3 = "white";
        document.body.style.backgroundColor = defaultcolour1;
        let accuracy = document.getElementById("accuracy");
        accuracy.style.color = defaultcolour2;
        if(mode == "pen"){
            DrawingPlane.style.cursor = "url('../../images/pencursordark.png') 16 16, auto";
        }
        if(mode == "eraser"){
            DrawingPlane.style.cursor = "url('../../images/erasercursordark.png') 16 16, auto";
        }
        DrawAxis(subxunit,xunit,cw,subyunit,yunit,ch);
        RedrawUser();
        setTimeout(()=>{
            enable(lightbutton);
            enable(lightbuttonmob);
            disable(darkbutton);
            disable(darkbuttonmob);
        }, 50);
    }
});
lightbuttonmob.addEventListener("click",() => {
    if(colourmode == "dark"){
        colourmode = "light";
        sessionStorage.setItem("colourmode", colourmode);
        defaultcolour1 = "#d6d6d6";
        defaultcolour2 = "#121212";
        defaultcolour3 = "black";
        document.body.style.backgroundColor = defaultcolour1;
        let accuracy = document.getElementById("accuracy");
        accuracy.style.color = defaultcolour2;
        if(mode == "pen"){
            DrawingPlane.style.cursor = "url('../../images/pencursorlight.png') 16 16, auto";
        }
        if(mode == "eraser"){
            DrawingPlane.style.cursor = "url('../../images/erasercursorlight.png') 16 16, auto";
        }
        DrawAxis(subxunit,xunit,cw,subyunit,yunit,ch);
        RedrawUser();
        setTimeout(()=>{
            disable(lightbutton);
            disable(lightbuttonmob);
            enable(darkbutton);
            enable(darkbuttonmob);}, 50);
    }
});
darkbuttonmob.addEventListener("click",() => {
    if(colourmode == "light"){
        colourmode = "dark";
        sessionStorage.setItem("colourmode", colourmode);
        defaultcolour1 = "#121212";
        defaultcolour2 = "#d6d6d6";
        defaultcolour3 = "white";
        document.body.style.backgroundColor = defaultcolour1;
        let accuracy = document.getElementById("accuracy");
        accuracy.style.color = defaultcolour2;
        if(mode == "pen"){
                DrawingPlane.style.cursor = "url('../../images/pencursordark.png') 16 16, auto";
        }
        if(mode == "eraser"){
                DrawingPlane.style.cursor = "url('../../images/erasercursordark.png') 16 16, auto";
        }
        DrawAxis(subxunit,xunit,cw,subyunit,yunit,ch);
        RedrawUser();
        setTimeout(()=>{
            enable(lightbutton);
            enable(lightbuttonmob);
            disable(darkbutton);
            disable(darkbuttonmob);
        }, 50);
    }
});
const aftersubmitbutton = document.getElementsByClassName("aftersubmitbutton");   
if(!is_submit){
    for(let button of aftersubmitbutton){
        button.style.display = "none";
    }
}
submitbutton.addEventListener("click",() => {
    document.body.style.cursor = "default";
    mode = "none";
    if (mousecoord.length == 0) {
         is_submit = true;
        for(let button of aftersubmitbutton){
            button.style.display = "";
        }
        let Accuracy = document.getElementById("accuracy");
        Accuracy.style.color = defaultcolour2;
        Accuracy.innerHTML = "Accuracy: 0%";
        const replaybutton = document.getElementById("replaybutton");
        replaybutton.addEventListener("click",() => {
            location.reload();
        });
        const giveupbutton = document.getElementById("giveupbutton");
        giveupbutton.addEventListener("click", () => {
            giveup = true;
            for (let i = 0; i < Graph.length; i++) {
                DrawGraph(Graph[i].pRange.l, Graph[i].pRange.r, Graph[i].Function_x, Graph[i].Function_y);
            }
        });

        penbutton.disabled = true;
        eraserbutton.disabled = true;
        undobutton.disabled = true;
        penbuttonmob.disabled = true;
        eraserbuttonmob.disabled = true;
        undobuttonmob.disabled = true;
        disable(penbutton);
        disable(eraserbutton);
        disable(undobutton);
        disable(penbuttonmob);
        disable(eraserbuttonmob);
        disable(undobuttonmob);
    }
    else {
        is_submit = true;
        for(let button of aftersubmitbutton){
            button.style.display = "";
        }
        FindError(mousecoord, unflattened, defaultcolour2);
        const replaybutton = document.getElementById("replaybutton");
        replaybutton.addEventListener("click",() => {
            location.reload();
        });
        const giveupbutton = document.getElementById("giveupbutton");
        giveupbutton.addEventListener("click", () => {
            giveup = true;
            for (let i = 0; i < Graph.length; i++) {
                DrawGraph(Graph[i].pRange.l, Graph[i].pRange.r, Graph[i].Function_x, Graph[i].Function_y);
            }
        });

        penbutton.disabled = true;
        eraserbutton.disabled = true;
        undobutton.disabled = true;
        penbuttonmob.disabled = true;
        eraserbuttonmob.disabled = true;
        undobuttonmob.disabled = true;
        disable(penbutton);
        disable(eraserbutton);
        disable(undobutton);
        disable(penbuttonmob);
        disable(eraserbuttonmob);
        disable(undobuttonmob);
    }
});
penbutton.addEventListener("click",() => {
    if (is_submit == false) {
        if(mode == "eraser"){
            mode = "pen";
            if(colourmode == "light"){
                DrawingPlane.style.cursor = "url('../../images/pencursorlight.png') 16 16, auto";
            }
            if(colourmode == "dark"){
                DrawingPlane.style.cursor = "url('../../images/pencursordark.png') 16 16, auto"
            }
            enable(eraserbutton);
            enable(eraserbuttonmob);
            disable(penbutton);
            disable(penbuttonmob);
        }
    }
});
eraserbutton.addEventListener("click",() => {
    if (is_submit == false) {
        if(mode == "pen"){
            mode = "eraser";
            if(colourmode == "light"){
                DrawingPlane.style.cursor = "url('../../images/erasercursorlight.png') 16 16, auto";
            }
            else{
                DrawingPlane.style.cursor = "url('../../images/erasercursordark.png')16 16, auto";
            }
        }
        enable(penbutton);
        enable(penbuttonmob);
        disable(eraserbutton);
        disable(eraserbuttonmob);
    }
});
undobutton.addEventListener("click", ()=>{
    if (drawingHistory.length==0) return;
    drawingHistory.pop();
    mousecoord = [];
    unflattened = [];
    erasecoord = [];
    eraserunflattened = [];
    
    RedrawUser();
    mousecoord = unflattened.flat();
    erasecoord = eraserunflattened.flat();
    for (let i = 0; i < erasecoord.length; i++) {
        for (let j = 0; j < mousecoord.length; j++) {
            if(EuclideanDist(denormalise(destandardize(erasecoord[i])),denormalise(destandardize(mousecoord[j])))<=15){
                mousecoord.splice(j,1);
                deletepoint(unflattened, j);
                j--;
            }
        }
    }
});
penbuttonmob.addEventListener("click",() => {
    if (is_submit == false) {
        if(mode == "eraser"){
            mode = "pen";
            if(colourmode == "light"){
                DrawingPlane.style.cursor = "url('../../images/pencursorlight.png') 16 16, auto";
            }
            if(colourmode == "dark"){
                DrawingPlane.style.cursor = "url('../../images/pencursordark.png') 16 16, auto"
            }
            enable(eraserbutton);
            enable(eraserbuttonmob);
            disable(penbutton);
            disable(penbuttonmob);
        }
    }
});
eraserbuttonmob.addEventListener("click",() => {
    if (is_submit == false) {
        if(mode == "pen"){
            mode = "eraser";
            if(colourmode == "light"){
                DrawingPlane.style.cursor = "url('../../images/erasercursorlight.png') 16 16, auto";
            }
            else{
                DrawingPlane.style.cursor = "url('../../images/erasercursordark.png') 16 16, auto";
            }
            disable(eraserbutton);
            disable(eraserbuttonmob);
            enable(penbutton);
            enable(penbuttonmob);
        }
    }
});
undobuttonmob.addEventListener("click", ()=>{
    
        if (drawingHistory.length==0) return;
    drawingHistory.pop();
    mousecoord = [];
    unflattened = [];
    erasecoord = [];
    eraserunflattened = [];
    
    RedrawUser();
    
    mousecoord = unflattened.flat();
    erasecoord = eraserunflattened.flat();
    for (let i = 0; i < erasecoord.length; i++) {
        for (let j = 0; j < mousecoord.length; j++) {
            if(EuclideanDist(denormalise(destandardize(erasecoord[i])),denormalise(destandardize(mousecoord[j])))<=15){
                mousecoord.splice(j,1);
                deletepoint(unflattened, j);
                j--;
            }
        }
    }
});
tutorialbutton.addEventListener("click",()=>{
    if(isTutorial == false){
        isTutorial = true;
        tutorial.style.display = "flex";
    }
    else{
        isTutorial = false;
        tutorial.style.display = "none";
    }
})
tutorialbuttonmob.addEventListener("click",()=>{
     if(isTutorial == false){
        isTutorial = true;
        tutorialtab.style.display = "flex";
    }
    else{
        isTutorial = false;
        tutorialtab.style.display = "none";
    }
})
tutorialbutton.addEventListener("mouseleave",()=>{
    if(isTutorial == true){
        isTutorial = false;
        tutorialtab.style.display = "none";
        tutorial.style.display = "none";
    }
});
tutorialbuttonmob.addEventListener("mouseleave",()=>{
    if(isTutorial == true){
        isTutorial = false;
        tutorialtab.style.display = "none";
        tutorial.style.display = "none";
    }
});
window.addEventListener("touchstart",()=>{
    if(isTutorial == true){
        isTutorial = false;
        tutorialtab.style.display = "none";
        tutorial.style.display = "none";
    }
});
window.addEventListener("resize",()=>{
    if(isTutorial == true){
        isTutorial = false;
        tutorialtab.style.display = "none";
        tutorial.style.display = "none";
    }
});
window.addEventListener("scroll",()=>{
    if(isTutorial == true){
        isTutorial = false;
        tutorialtab.style.display = "none";
        tutorial.style.display = "none";
    }
});
document.addEventListener("keydown", (event) => {
    if(event.ctrlKey && event.key === "z"){
        event.preventDefault();
        if(window.matchMedia("max-width: 768px").matches){
            undobuttonmob.click();
        }
        else{
            undobutton.click();
        }
    }
});
