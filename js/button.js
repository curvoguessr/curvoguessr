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
let is_submit = false;
let giveup = false;
const DrawingPlane = document.getElementById("drawingplane");
const context = DrawingPlane.getContext('2d');
const rect = DrawingPlane.getBoundingClientRect();
let colourmode = "light";
let defaultcolour1 = "#d6d6d6";
let defaultcolour2 = "#121212";
let defaultcolour3 = "black";

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
// }
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
        context.clearRect(0,0,DrawingPlane.width,DrawingPlane.height);
        DrawAxis(subxunit, xunit,cw,subyunit,yunit,ch);
        context.globalCompositeOperation = "source-over";
        context.lineWidth = 3;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.strokeStyle = defaultcolour2;
        for(let i = 0; i < unflattened.length; i++){
            context.beginPath();
            for(let j = 0; j < unflattened[i].length; j++){
                if(j == 0){
                    context.moveTo(denormalise(destandardize(unflattened[i][0])).x,denormalise(destandardize(unflattened[i][0])).y);
                }
                if(1<=j && j<2){
                    context.lineTo(denormalise(destandardize(unflattened[i][j])).x, denormalise(destandardize(unflattened[i][j])).y);
                }
                if(j>=3){
                    CatRomGraph(denormalise(destandardize(unflattened[i][j-3])),denormalise(destandardize(unflattened[i][j-2])),denormalise(destandardize(unflattened[i][j-1])),denormalise(destandardize(unflattened[i][j])),0.005,context);
                }
            }
            context.stroke();
        }
        context.globalCompositeOperation = "destination-out";
        context.lineWidth = 30;
        context.lineCap = "round";
        context.lineJoin = "round";
        for(let i = 0; i < eraserunflattened.length; i++){
            context.beginPath();
            for(let j = 0; j < eraserunflattened[i].length; j++){
                if(j == 0){
                    context.moveTo(denormalise(destandardize(eraserunflattened[i][0])).x,denormalise(destandardize(eraserunflattened[i][0])).y);
                }
                if(1<=j && j<2){
                    context.lineTo(denormalise(destandardize(eraserunflattened[i][j])).x, denormalise(destandardize(eraserunflattened[i][j])).y);
                }
                if(j>=3){
                    CatRomGraph(denormalise(destandardize(eraserunflattened[i][j-3])),denormalise(destandardize(eraserunflattened[i][j-2])),denormalise(destandardize(eraserunflattened[i][j-1])),denormalise(destandardize(eraserunflattened[i][j])),0.005,context);
                }
            }
            context.stroke();
        }
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
        context.clearRect(0,0,DrawingPlane.width,DrawingPlane.height);
        DrawAxis(subxunit,xunit,cw,subyunit,yunit,ch);
        context.globalCompositeOperation = "source-over";
        context.lineWidth = 3;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.strokeStyle = defaultcolour2;
        for(let i = 0; i < unflattened.length; i++){
            context.beginPath();
            for(let j = 0; j < unflattened[i].length; j++){
                if(j == 0){
                    context.moveTo(denormalise(destandardize(unflattened[i][0])).x,denormalise(destandardize(unflattened[i][0])).y);
                }
                if(1<=j && j<2){
                    context.lineTo(denormalise(destandardize(unflattened[i][j])).x, denormalise(destandardize(unflattened[i][j])).y);
                }
                if(j>=3){
                    CatRomGraph(denormalise(destandardize(unflattened[i][j-3])),denormalise(destandardize(unflattened[i][j-2])),denormalise(destandardize(unflattened[i][j-1])),denormalise(destandardize(unflattened[i][j])),0.005,context);
                }
            }
            context.stroke();
        }
        context.globalCompositeOperation = "destination-out";
        context.lineWidth = 30;
        context.lineCap = "round";
        context.lineJoin = "round";
        for(let i = 0; i < eraserunflattened.length; i++){
            context.beginPath();
            for(let j = 0; j < eraserunflattened[i].length; j++){
                if(j == 0){
                    context.moveTo(denormalise(destandardize(eraserunflattened[i][0])).x,denormalise(destandardize(eraserunflattened[i][0])).y);
                }
                if(1<=j && j<2){
                    context.lineTo(denormalise(destandardize(eraserunflattened[i][j])).x, denormalise(destandardize(eraserunflattened[i][j])).y);
                }
                if(j>=3){
                    CatRomGraph(denormalise(destandardize(eraserunflattened[i][j-3])),denormalise(destandardize(eraserunflattened[i][j-2])),denormalise(destandardize(eraserunflattened[i][j-1])),denormalise(destandardize(eraserunflattened[i][j])),0.005,context);
                }
            }
            context.stroke();
        }
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
        context.clearRect(0,0,DrawingPlane.width,DrawingPlane.height);
        DrawAxis(subxunit,xunit,cw,subyunit,yunit,ch);
        context.globalCompositeOperation = "source-over";
        context.lineWidth = 3;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.strokeStyle = defaultcolour2;
        for(let i = 0; i < unflattened.length; i++){
            context.beginPath();
            for(let j = 0; j < unflattened[i].length; j++){
                if(j == 0){
                    context.moveTo(denormalise(destandardize(unflattened[i][0])).x,denormalise(destandardize(unflattened[i][0])).y);
                }
                if(1<=j && j<2){
                    context.lineTo(denormalise(destandardize(unflattened[i][j])).x, denormalise(destandardize(unflattened[i][j])).y);
                }
                if(j>=3){
                    CatRomGraph(denormalise(destandardize(unflattened[i][j-3])),denormalise(destandardize(unflattened[i][j-2])),denormalise(destandardize(unflattened[i][j-1])),denormalise(destandardize(unflattened[i][j])),0.005,context);
                }
            }
            context.stroke();
        }
        context.globalCompositeOperation = "destination-out";
        context.lineWidth = 30;
        context.lineCap = "round";
        context.lineJoin = "round";
        for(let i = 0; i < eraserunflattened.length; i++){
            context.beginPath();
            for(let j = 0; j < eraserunflattened[i].length; j++){
                if(j == 0){
                    context.moveTo(denormalise(destandardize(eraserunflattened[i][0])).x,denormalise(destandardize(eraserunflattened[i][0])).y);
                }
                if(1<=j && j<2){
                    context.lineTo(denormalise(destandardize(eraserunflattened[i][j])).x, denormalise(destandardize(eraserunflattened[i][j])).y);
                }
                if(j>=3){
                    CatRomGraph(denormalise(destandardize(eraserunflattened[i][j-3])),denormalise(destandardize(eraserunflattened[i][j-2])),denormalise(destandardize(eraserunflattened[i][j-1])),denormalise(destandardize(eraserunflattened[i][j])),0.005,context);
                }
            }
            context.stroke();
        }
        //UserDrawing();
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
        context.clearRect(0,0,DrawingPlane.width,DrawingPlane.height);
        DrawAxis(subxunit,xunit,cw,subyunit,yunit,ch);
        context.globalCompositeOperation = "source-over";
        context.lineWidth = 3;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.strokeStyle = defaultcolour2;
        for(let i = 0; i < unflattened.length; i++){
            context.beginPath();
            for(let j = 0; j < unflattened[i].length; j++){
                if(j == 0){
                    context.moveTo(denormalise(destandardize(unflattened[i][0])).x,denormalise(destandardize(unflattened[i][0])).y);
                }
                if(1<=j && j<2){
                    context.lineTo(denormalise(destandardize(unflattened[i][j])).x, denormalise(destandardize(unflattened[i][j])).y);
                }
                if(j>=3){
                    CatRomGraph(denormalise(destandardize(unflattened[i][j-3])),denormalise(destandardize(unflattened[i][j-2])),denormalise(destandardize(unflattened[i][j-1])),denormalise(destandardize(unflattened[i][j])),0.005,context);
                }
            }
            context.stroke();
        }
        context.globalCompositeOperation = "destination-out";
        context.lineWidth = 30;
        context.lineCap = "round";
        context.lineJoin = "round";
        for(let i = 0; i < eraserunflattened.length; i++){
            context.beginPath();
            for(let j = 0; j < eraserunflattened[i].length; j++){
                if(j == 0){
                    context.moveTo(denormalise(destandardize(eraserunflattened[i][0])).x,denormalise(destandardize(eraserunflattened[i][0])).y);
                }
                if(1<=j && j<2){
                    context.lineTo(denormalise(destandardize(eraserunflattened[i][j])).x, denormalise(destandardize(eraserunflattened[i][j])).y);
                }
                if(j>=3){
                    CatRomGraph(denormalise(destandardize(eraserunflattened[i][j-3])),denormalise(destandardize(eraserunflattened[i][j-2])),denormalise(destandardize(eraserunflattened[i][j-1])),denormalise(destandardize(eraserunflattened[i][j])),0.005,context);
                }
            }
            context.stroke();
        }
        //UserDrawing();
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
        penbutton.style.cursor = "default";
        penbutton.style.opacity = "0.7";
        penbuttonmob.style.cursor = "default";
        penbuttonmob.style.opacity = "0.7";
        eraserbutton.style.cursor = "default";
        eraserbutton.style.opacity = "0.7";
        eraserbuttonmob.style.cursor = "default";
        eraserbuttonmob.style.opacity = "0.7";
        undobutton.style.cursor = "default";
        undobutton.style.opacity = "0.7";
        undobuttonmob.style.cursor = "default";
        undobuttonmob.style.opacity = "0.7";
        images.style.filter = "brightness(80%)";
        imagesmob.style.filter = "brightness(80%)";
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
        penbutton.style.cursor = "default";
        penbutton.style.opacity = "0.7";
        penbuttonmob.style.cursor = "default";
        penbuttonmob.style.opacity = "0.7";
        eraserbutton.style.cursor = "default";
        eraserbutton.style.opacity = "0.7";
        eraserbuttonmob.style.cursor = "default";
        eraserbuttonmob.style.opacity = "0.7";
        undobutton.style.cursor = "default";
        undobutton.style.opacity = "0.7";
        undobuttonmob.style.cursor = "default";
        undobuttonmob.style.opacity = "0.7";
        images.style.filter = "brightness(80%)";
        imagesmob.style.filter = "brightness(80%)";
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
    }
});
undobutton.addEventListener("click", ()=>{
    if (drawingHistory.length==0) return;
    drawingHistory.pop();
    mousecoord = [];
    unflattened = [];
    erasecoord = [];
    eraserunflattened = [];
    context.clearRect(0, 0, DrawingPlane.width, DrawingPlane.height);
    for (let i = 0; i < drawingHistory.length; i++) {
        if (drawingHistory[i][0].length==0) continue;
        if (drawingHistory[i][1]=="pen") {
            context.beginPath();
            context.globalCompositeOperation = "source-over";
            context.lineWidth = 3;
            context.lineCap = "round";
            context.lineJoin = "round";
            context.strokeStyle = defaultcolour2;
            unflattened.push(drawingHistory[i][0]);
        }
        else {
            context.beginPath();
            context.globalCompositeOperation = "destination-out";
            context.lineWidth = 30;
            context.lineCap = "round";
            context.lineJoin = "round";
            context.strokeStyle = defaultcolour2;
            eraserunflattened.push(drawingHistory[i][0]);
        }
        context.moveTo(denormalise(destandardize(drawingHistory[i][0][0])).x,denormalise(destandardize(drawingHistory[i][0][0])).y);
        for (let j = 1; j < drawingHistory[i][0].length; j++) {
            if (j <= 2) {
                context.lineTo(denormalise(destandardize(drawingHistory[i][0][j])).x,denormalise(destandardize(drawingHistory[i][0][j])).y);
            }
            else {
                CatRomGraph(denormalise(destandardize(drawingHistory[i][0][j-3])),denormalise(destandardize(drawingHistory[i][0][j-2])), denormalise(destandardize(drawingHistory[i][0][j-1])), denormalise(destandardize(drawingHistory[i][0][j])), 0.005, context);
            }
        }
        context.stroke();
    }
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
    context.clearRect(0, 0, DrawingPlane.width, DrawingPlane.height);
    for (let i = 0; i < drawingHistory.length; i++) {
        if (drawingHistory[i][0].length==0) continue;
        if (drawingHistory[i][1]=="pen") {
            context.beginPath();
            context.globalCompositeOperation = "source-over";
            context.lineWidth = 3;
            context.lineCap = "round";
            context.lineJoin = "round";
            context.strokeStyle = defaultcolour2;
            unflattened.push(drawingHistory[i][0]);
        }
        else {
            context.beginPath();
            context.globalCompositeOperation = "destination-out";
            context.lineWidth = 30;
            context.lineCap = "round";
            context.lineJoin = "round";
            context.strokeStyle = defaultcolour2;
            eraserunflattened.push(drawingHistory[i][0]);
        }
        context.moveTo(denormalise(destandardize(drawingHistory[i][0][0])).x,denormalise(destandardize(drawingHistory[i][0][0])).y);
        for (let j = 1; j < drawingHistory[i][0].length; j++) {
            if (j <= 2) {
                context.lineTo(denormalise(destandardize(drawingHistory[i][0][j])).x,denormalise(destandardize(drawingHistory[i][0][j])).y);
            }
            else {
                CatRomGraph(denormalise(destandardize(drawingHistory[i][0][j-3])),denormalise(destandardize(drawingHistory[i][0][j-2])), denormalise(destandardize(drawingHistory[i][0][j-1])), denormalise(destandardize(drawingHistory[i][0][j])), 0.005, context);
            }
        }
        context.stroke();
    }
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