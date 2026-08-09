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
        const browsertablogo = document.getElementById("browsertablogo");
        browsertablogo.href = "../../images/logolight.png";
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
        DrawAxis(subxunit,xunit,cw,subyunit,yunit,ch);
        context.globalCompositeOperation = "source-over";
        context.lineWidth = 3;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.strokeStyle = defaultcolour2;
        for(let i = 0; i < unflattened.length; i++){
            context.beginPath();
            for(let j = 0; j < unflattened[i][0].length; j++){
                if(j == 0){
                    context.moveTo(denormalise(destandardize(unflattened[i][0][0])).x,denormalise(destandardize(unflattened[i][0][0])).y);
                }
                if(1<=j && j<2){
                    context.lineTo(denormalise(destandardize(unflattened[i][0][j])).x, denormalise(destandardize(unflattened[i][0][j])).y);
                }
                if(j>=3){
                    CatRomGraph(denormalise(destandardize(unflattened[i][0][j-3])),denormalise(destandardize(unflattened[i][0][j-2])),denormalise(destandardize(unflattened[i][0][j-1])),denormalise(destandardize(unflattened[i][0][j])),0.05,context);
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
            for(let j = 0; j < eraserunflattened[i][0].length; j++){
                if(j == 0){
                    context.moveTo(denormalise(destandardize(eraserunflattened[i][0][0])).x,denormalise(destandardize(eraserunflattened[i][0][0])).y);
                }
                if(1<=j && j<2){
                    context.lineTo(denormalise(destandardize(eraserunflattened[i][0][j])).x, denormalise(destandardize(eraserunflattened[i][0][j])).y);
                }
                if(j>=3){
                    CatRomGraph(denormalise(destandardize(eraserunflattened[i][0][j-3])),denormalise(destandardize(eraserunflattened[i][0][j-2])),denormalise(destandardize(eraserunflattened[i][0][j-1])),denormalise(destandardize(eraserunflattened[i][0][j])),0.05,context);
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
        const browsertablogo = document.getElementById("browsertablogo");
        browsertablogo.href = "../../images/logodark.png";
        document.body.style.backgroundColor = defaultcolour1;
        if(is_submit){
            FindError(mousecoord, defaultcolour2);
        }
        else{
            let Accuracy = document.getElementById("accuracy");
            Accuracy.style.color = defaultcolour2;
            Accuracy.innerHTML = "Accuracy: "
            if(mode == "pen"){
                DrawingPlane.style.cursor = "url('../../images/pencursordark.png') 16 16, auto";
            }
            if(mode == "eraser"){
                DrawingPlane.style.cursor = "url('../../images/erasercursordark.png') 16 16, auto";
            }
        }
        //invertcolor(DrawingPlane);
        context.clearRect(0,0,DrawingPlane.width,DrawingPlane.height);
        DrawAxis(subxunit,xunit,cw,subyunit,yunit,ch);
        context.globalCompositeOperation = "source-over";
        context.lineWidth = 3;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.strokeStyle = defaultcolour2;
        for(let i = 0; i < unflattened.length; i++){
            context.beginPath();
            for(let j = 0; j < unflattened[i][0].length; j++){
                if(j == 0){
                    context.moveTo(denormalise(destandardize(unflattened[i][0][0])).x, denormalise(destandardize(unflattened[i][0][0])).y);
                }
                if(1<=j && j<2){
                    context.lineTo(denormalise(destandardize(unflattened[i][0][j])).x, denormalise(destandardize(unflattened[i][0][j])).y);
                }
                if(j>=3){
                    CatRomGraph(denormalise(destandardize(unflattened[i][0][j-3])),denormalise(destandardize(unflattened[i][0][j-2])),denormalise(destandardize(unflattened[i][0][j-1])),denormalise(destandardize(unflattened[i][0][j])),0.05,context);
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
            for(let j = 0; j < eraserunflattened[i][0].length; j++){
                if(j == 0){
                    context.moveTo(denormalise(destandardize(eraserunflattened[i][0][0])).x,denormalise(destandardize(eraserunflattened[i][0][0])).y);
                }
                if(1<=j && j<2){
                    context.lineTo(denormalise(destandardize(eraserunflattened[i][0][j])).x, denormalise(destandardize(eraserunflattened[i][0][j])).y);
                }
                if(j>=3){
                    CatRomGraph(denormalise(destandardize(eraserunflattened[i][0][j-3])),denormalise(destandardize(eraserunflattened[i][0][j-2])),denormalise(destandardize(eraserunflattened[i][0][j-1])),denormalise(destandardize(eraserunflattened[i][0][j])),0.05,context);
                }
            }
            context.stroke();
        }
        //UserDrawing();
    }
});
lightbuttonmob.addEventListener("click",() => {
    if(colourmode == "dark"){
        colourmode = "light";
        sessionStorage.setItem("colourmode", colourmode);
        defaultcolour1 = "#d6d6d6";
        defaultcolour2 = "#121212";
        defaultcolour3 = "black";
        const browsertablogo = document.getElementById("browsertablogo");
        browsertablogo.href = "../../images/logolight.png";
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
        DrawAxis(subxunit,xunit,cw,subyunit,yunit,ch);
        context.globalCompositeOperation = "source-over";
        context.lineWidth = 3;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.strokeStyle = defaultcolour2;
        for(let i = 0; i < unflattened.length; i++){
            context.beginPath();
            for(let j = 0; j < unflattened[i][0].length; j++){
                if(j == 0){
                    context.moveTo(denormalise(destandardize(unflattened[i][0][0])).x,denormalise(destandardize(unflattened[i][0][0])).y);
                }
                if(1<=j && j<2){
                    context.lineTo(denormalise(destandardize(unflattened[i][0][j])).x, denormalise(destandardize(unflattened[i][0][j])).y);
                }
                if(j>=3){
                    CatRomGraph(denormalise(destandardize(unflattened[i][0][j-3])),denormalise(destandardize(unflattened[i][0][j-2])),denormalise(destandardize(unflattened[i][0][j-1])),denormalise(destandardize(unflattened[i][0][j])),0.05,context);
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
            for(let j = 0; j < eraserunflattened[i][0].length; j++){
                if(j == 0){
                    context.moveTo(denormalise(destandardize(eraserunflattened[i][0][0])).x,denormalise(destandardize(eraserunflattened[i][0][0])).y);
                }
                if(1<=j && j<2){
                    context.lineTo(denormalise(destandardize(eraserunflattened[i][0][j])).x, denormalise(destandardize(eraserunflattened[i][0][j])).y);
                }
                if(j>=3){
                    CatRomGraph(denormalise(destandardize(eraserunflattened[i][0][j-3])),denormalise(destandardize(eraserunflattened[i][0][j-2])),denormalise(destandardize(eraserunflattened[i][0][j-1])),denormalise(destandardize(eraserunflattened[i][0][j])),0.05,context);
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
        const browsertablogo = document.getElementById("browsertablogo");
        browsertablogo.href = "../images/logodark.png";
        document.body.style.backgroundColor = defaultcolour1;
        if(is_submit){
            FindError(mousecoord, defaultcolour2);
        }
        else{
            let Accuracy = document.getElementById("accuracy");
            Accuracy.style.color = defaultcolour2;
            Accuracy.innerHTML = "Accuracy: "
            if(mode == "pen"){
                DrawingPlane.style.cursor = "url('../../images/pencursordark.png') 16 16, auto";
            }
            if(mode == "eraser"){
                DrawingPlane.style.cursor = "url('../../images/erasercursordark.png') 16 16, auto";
            }
        }
        //invertcolor(DrawingPlane);
        context.clearRect(0,0,DrawingPlane.width,DrawingPlane.height);
        DrawAxis(subxunit,xunit,cw,subyunit,yunit,ch);
        context.globalCompositeOperation = "source-over";
        context.lineWidth = 3;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.strokeStyle = defaultcolour2;
        for(let i = 0; i < unflattened.length; i++){
            context.beginPath();
            for(let j = 0; j < unflattened[i][0].length; j++){
                if(j == 0){
                    context.moveTo(denormalise(destandardize(unflattened[i][0][0])).x, denormalise(destandardize(unflattened[i][0][0])).y);
                }
                if(1<=j && j<2){
                    context.lineTo(denormalise(destandardize(unflattened[i][0][j])).x, denormalise(destandardize(unflattened[i][0][j])).y);
                }
                if(j>=3){
                    CatRomGraph(denormalise(destandardize(unflattened[i][0][j-3])),denormalise(destandardize(unflattened[i][0][j-2])),denormalise(destandardize(unflattened[i][0][j-1])),denormalise(destandardize(unflattened[i][0][j])),0.05,context);
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
            for(let j = 0; j < eraserunflattened[i][0].length; j++){
                if(j == 0){
                    context.moveTo(denormalise(destandardize(eraserunflattened[i][0][0])).x,denormalise(destandardize(eraserunflattened[i][0][0])).y);
                }
                if(1<=j && j<2){
                    context.lineTo(denormalise(destandardize(eraserunflattened[i][0][j])).x, denormalise(destandardize(eraserunflattened[i][0][j])).y);
                }
                if(j>=3){
                    CatRomGraph(denormalise(destandardize(eraserunflattened[i][0][j-3])),denormalise(destandardize(eraserunflattened[i][0][j-2])),denormalise(destandardize(eraserunflattened[i][0][j-1])),denormalise(destandardize(eraserunflattened[i][0][j])),0.05,context);
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
        SendError("Draw something to submit!");   
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
        let giveup = false;
        giveupbutton.addEventListener("click", () => {
            giveup = true;
            for (let i = 0; i < Graph.length; i++) {
                DrawGraph(Graph[i].pRange.l, Graph[i].pRange.r, Graph[i].Function_x, Graph[i].Function_y);
            }
        });
        const nextlevelbutton = document.getElementById("button");
        nextlevelbutton.addEventListener("click", ()=> {
            //edit later
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
    let mx = 0;
    for (let i = 0; i < unflattened.length; i++) {
        mx=Math.max(mx,unflattened[i][1]);
    }
    for (let i = 0; i < eraserunflattened.length; i++) {
        mx=Math.max(mx,eraserunflattened[i][1]);
    }
    for (let i = 0; i < unflattened.length; i++) {
        if (unflattened[i][1]==mx) {
            unflattened.splice(i, 1);
            i--;
        }
    }
    for (let i = 0; i < eraserunflattened.length; i++) {
        if (eraserunflattened[i][1]==mx) {
            eraserunflattened.splice(i,1);
            i--;
        }
    }
    mousecoord = [];
    erasecoord = [];
    for (let i = 0; i < unflattened.length; i++) {
        for (let j = 0; j < unflattened[i][0].length; j++) {
            mousecoord.push(unflattened[i][0][j]);
        }
    }
    for (let i = 0; i < eraserunflattened.length; i++) {
        for (let j = 0; j < eraserunflattened[i][0].length; j++) {
            erasecoord.push(eraserunflattened[i][0][j]);
        }
    }
    context.clearRect(0,0,DrawingPlane.width,DrawingPlane.height);
    let i = 0;
    let j = 0;
    while (i < unflattened.length || j < eraserunflattened.length) {
        if (j == eraserunflattened.length || (j < eraserunflattened.length && i < unflattened.length && unflattened[i][1]<eraserunflattened[j][1])) {
            context.beginPath();
            context.globalCompositeOperation = "source-over";
            context.lineWidth = 3;
            context.lineCap = "round";
            context.lineJoin = "round";
            context.strokeStyle = defaultcolour2;
            context.moveTo(denormalise(destandardize(unflattened[i][0][0])).x,denormalise(destandardize(unflattened[i][0][0])).y);
            for (let k = 1; k < unflattened[i][0].length; k++) {
                if (k == 1) {
                    context.lineTo(denormalise(destandardize(unflattened[i][0][k])).x,denormalise(destandardize(unflattened[i][0][k])).y);
                }
                else if (k>=3){
                    CatRomGraph(denormalise(destandardize(unflattened[i][0][k-3])),denormalise(destandardize(unflattened[i][0][k-2])), denormalise(destandardize(unflattened[i][0][k-1])), denormalise(destandardize(unflattened[i][0][k])), 0.05, context);
                }
            }

            context.stroke();
            i++;
        }
        else {
            context.beginPath();
            context.globalCompositeOperation = "destination-out";
            context.lineWidth = 30;
            context.lineCap = "round";
            context.lineJoin = "round";
            context.moveTo(denormalise(destandardize(eraserunflattened[j][0][0])).x,denormalise(destandardize(unflattened[j][0][0])).y);
            for (let k = 1; k < eraserunflattened[j][0].length; k++) {
                if (k == 1) {
                    context.lineTo(denormalise(destandardize(eraserunflattened[j][0][k])).x,denormalise(destandardize(eraserunflattened[j][0][k])).y);
                }
                else if (k>=3){
                    CatRomGraph(denormalise(destandardize(eraserunflattened[j][0][k-3])),denormalise(destandardize(eraserunflattened[j][0][k-2])), denormalise(destandardize(eraserunflattened[j][0][k-1])), denormalise(destandardize(eraserunflattened[j][0][k])), 0.05, context);
                }
            }

            context.stroke();
            j++;
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
    let mx = 0;
    for (let i = 0; i < unflattened.length; i++) {
        mx=Math.max(mx,unflattened[i][1]);
    }
    for (let i = 0; i < eraserunflattened.length; i++) {
        mx=Math.max(mx,eraserunflattened[i][1]);
    }
    for (let i = 0; i < unflattened.length; i++) {
        if (unflattened[i][1]==mx) {
            unflattened.splice(i, 1);
            i--;
        }
    }
    for (let i = 0; i < eraserunflattened.length; i++) {
        if (eraserunflattened[i][1]==mx) {
            eraserunflattened.splice(i,1);
            i--;
        }
    }
    mousecoord = [];
    erasecoord = [];
    for (let i = 0; i < unflattened.length; i++) {
        for (let j = 0; j < unflattened[i][0].length; j++) {
            mousecoord.push(unflattened[i][0][j]);
        }
    }
    for (let i = 0; i < eraserunflattened.length; i++) {
        for (let j = 0; j < eraserunflattened[i][0].length; j++) {
            erasecoord.push(eraserunflattened[i][0][j]);
        }
    }
    context.clearRect(0,0,DrawingPlane.width,DrawingPlane.height);
    let i = 0;
    let j = 0;
    while (i < unflattened.length || j < eraserunflattened.length) {
        if (j == eraserunflattened.length || (j < eraserunflattened.length && i < unflattened.length && unflattened[i][1]<eraserunflattened[j][1])) {
            context.beginPath();
            context.globalCompositeOperation = "source-over";
            context.lineWidth = 3;
            context.lineCap = "round";
            context.lineJoin = "round";
            context.strokeStyle = defaultcolour2;
            context.moveTo(denormalise(destandardize(unflattened[i][0][0])).x,denormalise(destandardize(unflattened[i][0][0])).y);
            for (let k = 1; k < unflattened[i][0].length; k++) {
                if (k == 1) {
                    context.lineTo(denormalise(destandardize(unflattened[i][0][k])).x,denormalise(destandardize(unflattened[i][0][k])).y);
                }
                else if (k>=3){
                    CatRomGraph(denormalise(destandardize(unflattened[i][0][k-3])),denormalise(destandardize(unflattened[i][0][k-2])), denormalise(destandardize(unflattened[i][0][k-1])), denormalise(destandardize(unflattened[i][0][k])), 0.05, context);
                }
            }

            context.stroke();
            i++;
        }
        else {
            context.beginPath();
            context.globalCompositeOperation = "destination-out";
            context.lineWidth = 30;
            context.lineCap = "round";
            context.lineJoin = "round";
            context.moveTo(denormalise(destandardize(eraserunflattened[j][0][0])).x,denormalise(destandardize(unflattened[j][0][0])).y);
            for (let k = 1; k < eraserunflattened[j][0].length; k++) {
                if (k == 1) {
                    context.lineTo(denormalise(destandardize(eraserunflattened[j][0][k])).x,denormalise(destandardize(eraserunflattened[j][0][k])).y);
                }
                else if (k>=3){
                    CatRomGraph(denormalise(destandardize(eraserunflattened[j][0][k-3])),denormalise(destandardize(eraserunflattened[j][0][k-2])), denormalise(destandardize(eraserunflattened[j][0][k-1])), denormalise(destandardize(eraserunflattened[j][0][k])), 0.05, context);
                }
            }

            context.stroke();
            j++;
        }
    }
});
document.addEventListener("keydown", (event) => {
    if(event.ctrlKey && event.key === "z"){
        event.preventDefault();
        if(window.matchMedia("max-width: 768px")){
            undobuttonmob.click();
        }
        else{
            undobutton.click();
        }
    }
});