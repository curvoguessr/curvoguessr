const submit = document.getElementById("submit");      
const pen = document.getElementById("pen");
const eraser = document.getElementById("eraser");      
const undo = document.getElementById("undo"); 
const light = document.getElementById("light");        
const dark = document.getElementById("dark");
const penmob = document.getElementById("penmob");      
const erasermob = document.getElementById("erasermob");
const undomob = document.getElementById("undomob");    
const lightmob = document.getElementById("lightmob");  
const darkmob = document.getElementById("darkmob");    
const images = document.getElementById("drawingbutton");
const imagesmob = document.getElementById("drawingbuttonmob");
const tutorialbutton = document.getElementById("tutorialbutton");
const tutorialbuttonmob = document.getElementById("tutorialbuttonmob");
const tutorial = document.getElementById("tutorial");
const tutorialtab = document.getElementById("tutorialtab");
let is_submit = false;
let giveup = false;
let isTutorial = false;
const DrawingPlane = document.getElementById("drawingplane");
const context = DrawingPlane.getContext('2d');
const rect = DrawingPlane.getBoundingClientRect();
const centerthings = document.getElementsByClassName("centerthings");
const home = document.getElementById("home");
const homebuttonmob = document.getElementById("homebuttonmob");
let colourmode = "light";
let defaultcolour1 = "#d6d6d6";
let defaultcolour2 = "#121212";
let defaultcolour3 = "black";

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
disable(pen);
disable(penmob);
function enable(button){
    button.style.transition = "opacity 0.2s ease, filter 0.2s ease";
    button.style.cursor = "pointer";
    button.style.opacity = "";
    button.style.filter = "";
}
light.addEventListener("click",() => {
    if(colourmode == "dark"){
        colourmode = "light";
        localStorage.setItem("colourmode", colourmode);
        defaultcolour1 = "#d6d6d6";
        defaultcolour2 = "#121212";
        defaultcolour3 = "black";
        document.body.style.backgroundColor = defaultcolour1;
        let Accuracy = document.getElementById("accuracy");
        Accuracy.style.color = defaultcolour2;
        let Best = document.getElementById("best");
        Best.style.color = defaultcolour2
        if(mode == "pen"){
            DrawingPlane.style.cursor = "url('../../images/pencursorlight.png') 16 16, auto";
        }
        if(mode == "eraser"){
            DrawingPlane.style.cursor = "url('../../images/erasercursorlight.png') 16 16, auto";
        }
        DrawAxis(subxunit, xunit,cw,subyunit,yunit,ch);
        RedrawUser();
        setTimeout(()=>{
            disable(light);
            disable(lightmob);
            enable(dark);
            enable(darkmob);}, 50);
    }
});
dark.addEventListener("click",() => {
    if(colourmode == "light"){
        colourmode = "dark";
        localStorage.setItem("colourmode", colourmode);
        defaultcolour1 = "#121212";
        defaultcolour2 = "#d6d6d6";
        defaultcolour3 = "white";
        document.body.style.backgroundColor = defaultcolour1;
        let accuracy = document.getElementById("accuracy");
        accuracy.style.color = defaultcolour2;
        let Best = document.getElementById("best");
        Best.style.color = defaultcolour2
        if(mode == "pen"){
            DrawingPlane.style.cursor = "url('../../images/pencursordark.png') 16 16, auto";
        }
        if(mode == "eraser"){
            DrawingPlane.style.cursor = "url('../../images/erasercursordark.png') 16 16, auto";
        }
        DrawAxis(subxunit,xunit,cw,subyunit,yunit,ch);
        RedrawUser();
        setTimeout(()=>{
            enable(light);
            enable(lightmob);
            disable(dark);
            disable(darkmob);
        }, 50);
    }
});
lightmob.addEventListener("click",() => {
    if(colourmode == "dark"){
        colourmode = "light";
        localStorage.setItem("colourmode", colourmode);
        defaultcolour1 = "#d6d6d6";
        defaultcolour2 = "#121212";
        defaultcolour3 = "black";
        document.body.style.backgroundColor = defaultcolour1;
        let accuracy = document.getElementById("accuracy");
        accuracy.style.color = defaultcolour2;
        let Best = document.getElementById("best");
        Best.style.color = defaultcolour2
        if(mode == "pen"){
            DrawingPlane.style.cursor = "url('../../images/pencursorlight.png') 16 16, auto";
        }
        if(mode == "eraser"){
            DrawingPlane.style.cursor = "url('../../images/erasercursorlight.png') 16 16, auto";
        }
        DrawAxis(subxunit,xunit,cw,subyunit,yunit,ch);
        RedrawUser();
        setTimeout(()=>{
            disable(light);
            disable(lightmob);
            enable(dark);
            enable(darkmob);}, 50);
    }
});
darkmob.addEventListener("click",() => {
    if(colourmode == "light"){
        colourmode = "dark";
        localStorage.setItem("colourmode", colourmode);
        defaultcolour1 = "#121212";
        defaultcolour2 = "#d6d6d6";
        defaultcolour3 = "white";
        document.body.style.backgroundColor = defaultcolour1;
        let accuracy = document.getElementById("accuracy");
        accuracy.style.color = defaultcolour2;
        let Best = document.getElementById("best");
        Best.style.color = defaultcolour2
        if(mode == "pen"){
                DrawingPlane.style.cursor = "url('../../images/pencursordark.png') 16 16, auto";
        }
        if(mode == "eraser"){
                DrawingPlane.style.cursor = "url('../../images/erasercursordark.png') 16 16, auto";
        }
        DrawAxis(subxunit,xunit,cw,subyunit,yunit,ch);
        RedrawUser();
        setTimeout(()=>{
            enable(light);
            enable(lightmob);
            disable(dark);
            disable(darkmob);
        }, 50);
    }
});
const aftersubmit = document.querySelector(".aftersubmit");   
if(!is_submit){
    const replay = document.getElementById("replay");
    const giveup = document.getElementById("giveup");
    const share = document.getElementById("share");
    const next = document.getElementById("next");
    replay.style.display = "none";
    giveup.style.display = "none";
    share.style.display = "none";
    next.style.display = "none";
}
submit.addEventListener("click",async() => {
    document.body.style.cursor = "default";
    mode = "none";
    if (mousecoord.length <= 1) {
        is_submit = true;
        pen.disabled = true;
        eraser.disabled = true;
        undo.disabled = true;
        penmob.disabled = true;
        erasermob.disabled = true;
        undomob.disabled = true;
        disable(pen);
        disable(eraser);
        disable(undo);
        disable(penmob);
        disable(erasermob);
        disable(undomob);
        DrawingPlane.style.cursor = "default";
        pen.style.cursor = "default";
        eraser.style.cursor = "default";
        undo.style.cursor = "default";
        penmob.style.cursor = "default";
        erasermob.style.cursor = "default";
        undomob.style.cursor = "default";
        const replay = document.getElementById("replay");
        const giveupbutton = document.getElementById("giveup");
        if(lvl !== 67){
            const share = document.getElementById("share");
        }
        const next = document.getElementById("next");
        replay.style.display = "inline-block";
        giveupbutton.style.display = "inline-block";
        if(share){
            share.style.display = "inline-block";
        }
        if(lvl !== 25){
            next.style.display = "inline-block";
        }
        let Accuracy = document.getElementById("accuracy");
        let Best = document.getElementById("best");
        Accuracy.style.color = defaultcolour2;
        Accuracy.textContent = "Accuracy: 0%";
        if (localStorage.getItem("lvl" + lvl)==null || localStorage.getItem("lvl" + lvl)==0) {
           localStorage.setItem("lvl" + lvl,0);
            Best.style.color = defaultcolour2;
            Best.textContent = "Best: 0%"
        }

        replay.addEventListener("click",() => {
            location.reload();
        });
        giveupbutton.addEventListener("click", () => {
            giveup = true;
            for (let i = 0; i < Graph.length; i++) {
                DrawGraph(Graph[i].pRange.l, Graph[i].pRange.r, Graph[i].Function_x, Graph[i].Function_y);
            }
        });
        if(share){
            share.addEventListener("click",async()=>{
            try{
                await navigator.clipboard.writeText("I was " + 0 + "% accurate in level " + lvl + ", can you do better? https://curvoguessr.github.io/curvoguessr/levels/level" + lvl + "/index.html");
                share.textContent = "Copied";

                setTimeout(()=>{
                    share.textContent = "Share";
                },1000);
            }
            catch{
                share.textContent = "Failed";
                setTimeout(()=>{
                    share.textContent = "Share";
                },1000);
            }
            });
        }
    }
    else {
        is_submit = true;
        pen.disabled = true;
        eraser.disabled = true;
        undo.disabled = true;
        penmob.disabled = true;
        erasermob.disabled = true;
        undomob.disabled = true;
        disable(pen);
        disable(eraser);
        disable(undo);
        disable(penmob);
        disable(erasermob);
        disable(undomob);
        DrawingPlane.style.cursor = "default";
        pen.style.cursor = "default";
        eraser.style.cursor = "default";
        undo.style.cursor = "default";
        penmob.style.cursor = "default";
        erasermob.style.cursor = "default";
        undomob.style.cursor = "default";
        const Accuracy = document.getElementById("accuracy");
        let Best = document.getElementById("best");
        Accuracy.style.color = defaultcolour2;
        let dots = 1;
        Accuracy.textContent = "Accuracy: .";
        const loading = setInterval(()=>{
            if(dots === 3){
                Accuracy.textContent = "Accuracy: ...";
                dots = 1;
            }
            else if(dots === 1){
                Accuracy.textContent = "  Accuracy: .";
                dots = 2;
            }
            else if(dots === 2){
                Accuracy.textContent = " Accuracy: ..";
                dots = 3;
            }
        }, 150);
        await FindError(mousecoord, unflattened, defaultcolour2);
        clearInterval(loading);
        Accuracy.style.color = defaultcolour2;
        Accuracy.textContent = "Accuracy: " + accuracy.toString() + "%";
        if (localStorage.getItem("lvl" + lvl)==null || localStorage.getItem("lvl" + lvl) < accuracy) {
           localStorage.setItem("lvl" + lvl,accuracy);
            Best.style.color = defaultcolour2;
            Best.textContent = "Best: " + + localStorage.getItem("lvl" + lvl).toString() + "%";
        }

        const replay = document.getElementById("replay");
        const giveupbutton = document.getElementById("giveup");
        if(lvl !== 67){
            const share = document.getElementById("share");
        }
        const next = document.getElementById("next");
        replay.style.display = "inline-block";
        giveupbutton.style.display = "inline-block";
        if(share){
            share.style.display = "inline-block";
        }
        if(lvl !== 25){
            next.style.display = "inline-block"
        }
        if(67 <= accuracy && accuracy < 68){
            const easteregg = document.getElementById("easteregg");
            easteregg.style.display = "inline-block";
        }
        replay.addEventListener("click",() => {
            location.reload();
        });
        giveupbutton.addEventListener("click", () => {
            giveup = true;
            for (let i = 0; i < Graph.length; i++) {
                DrawGraph(Graph[i].pRange.l, Graph[i].pRange.r, Graph[i].Function_x, Graph[i].Function_y);
            }
        });
        if(share)
            share.addEventListener("click",async()=>{
                try{
                    await navigator.clipboard.writeText("I was " + accuracy + "% accurate in level " + lvl + ", can you do better? https://curvoguessr.github.io/curvoguessr/levels/level" + lvl + "/index.html");
                    share.textContent = "Copied";
                    setTimeout(()=>{
                        share.textContent = "Share";
                    },1000);
                }
                catch{
                    share.textContent = "Failed";
                    setTimeout(()=>{
                        share.textContent = "Share";
                    },1000);
                }
            });
        }
    }
}, {once: true});
pen.addEventListener("click",() => {
    if (is_submit == false) {
        if(mode == "eraser"){
            mode = "pen";
            if(colourmode == "light"){
                DrawingPlane.style.cursor = "url('../../images/pencursorlight.png') 16 16, auto";
            }
            if(colourmode == "dark"){
                DrawingPlane.style.cursor = "url('../../images/pencursordark.png') 16 16, auto"
            }
            enable(eraser);
            enable(erasermob);
            disable(pen);
            disable(penmob);
        }
    }
});
eraser.addEventListener("click",() => {
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
        enable(pen);
        enable(penmob);
        disable(eraser);
        disable(erasermob);
    }
});
undo.addEventListener("click", ()=>{
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
penmob.addEventListener("click",() => {
    if (is_submit == false) {
        if(mode == "eraser"){
            mode = "pen";
            if(colourmode == "light"){
                DrawingPlane.style.cursor = "url('../../images/pencursorlight.png') 16 16, auto";
            }
            if(colourmode == "dark"){
                DrawingPlane.style.cursor = "url('../../images/pencursordark.png') 16 16, auto"
            }
            enable(eraser);
            enable(erasermob);
            disable(pen);
            disable(penmob);
        }
    }
});
erasermob.addEventListener("click",() => {
    if (is_submit == false) {
        if(mode == "pen"){
            mode = "eraser";
            if(colourmode == "light"){
                DrawingPlane.style.cursor = "url('../../images/erasercursorlight.png') 16 16, auto";
            }
            else{
                DrawingPlane.style.cursor = "url('../../images/erasercursordark.png') 16 16, auto";
            }
            disable(eraser);
            disable(erasermob);
            enable(pen);
            enable(penmob);
        }
    }
});
undomob.addEventListener("click", ()=>{
    
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
        tutorial.classList.add('show');
    }
    else{
        isTutorial = false;
        tutorial.classList.remove('show');
    }
})
tutorialbuttonmob.addEventListener("click",()=>{
     if(isTutorial == false){
        isTutorial = true;
        tutorialtab.classList.add('show');
    }
    else{
        isTutorial = false;
        tutorialtab.classList.remove('show');
    }
})
tutorial.addEventListener("mouseleave",()=>{
    if(isTutorial == true){
        isTutorial = false;
        tutorialtab.classList.remove('show');
        tutorial.classList.remove('show');
    }
});
tutorialbuttonmob.addEventListener("mouseleave",()=>{
    if(isTutorial == true){
        isTutorial = false;
        tutorialtab.classList.remove('show');
        tutorial.classList.remove('show');
    }
});
window.addEventListener("touchstart",()=>{
    if(isTutorial == true){
        isTutorial = false;
        tutorialtab.classList.remove('show');
        tutorial.classList.remove('show');
    }
});
window.addEventListener("resize",()=>{
    if(isTutorial == true){
        isTutorial = false;
        tutorialtab.classList.remove('show');
        tutorial.classList.remove('show');
    }
});
window.addEventListener("scroll",()=>{
    if(isTutorial == true){
        isTutorial = false;
        tutorialtab.classList.remove('show');
        tutorial.classList.remove('show');
    }
});
document.addEventListener("keydown", (event) => {
    if(event.ctrlKey && event.key === "z"){
        event.preventDefault();
        if(window.matchMedia("(max-width: 768px)").matches){
            undomob.click();
        }
        else{
            undo.click();
        }
    }
});
home.addEventListener("click",()=>{
    window.open("../../index.html", "_blank")
});
homebuttonmob.addEventListener("click",()=>{
    window.open("../../index.html", "_blank")
});
