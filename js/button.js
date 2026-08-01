const penbutton = document.getElementById("penbutton");
const eraserbutton = document.getElementById("eraserbutton");
const undobutton = document.getElementById("undobutton");
const clearbutton = document.getElementById("clearbutton");
const submitbutton = document.getElementById("submitbutton"); 
const lightbutton = document.getElementById("lightbutton");
const darkbutton = document.getElementById("darkbutton");
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
        document.body.style.backgroundColor = defaultcolour1;
        let Error = document.getElementById("error");
        Error.style.color = defaultcolour2;
        if(mode == "pen"){
            DrawingPlane.style.cursor = "url('images/pencursorlight.png') 16 16, auto";
        }
        if(mode == "eraser"){
            DrawingPlane.style.cursor = "url('images/erasercursorlight.png') 16 16, auto";
        }
        context.clearRect(0,0,DrawingPlane.width,DrawingPlane.height);
        DrawAxis();
        context.globalCompositeOperation = "source-over";
        context.lineWidth = 3;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.strokeStyle = defaultcolour2;
        for(let i = 0; i < unflattened.length; i++){
            context.beginPath();
            for(let j = 0; j < unflattened[i].length; j++){
                if(j == 0){
                    context.moveTo(unflattened[i][0].x,unflattened[i][0].y);
                }
                if(1<=j && j<2){
                    context.lineTo(unflattened[i][j].x, unflattened[i][j].y);
                }
                if(j>=3){
                    CatRomGraph(unflattened[i][j-3],unflattened[i][j-2],unflattened[i][j-1],unflattened[i][j],0.05,context);
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
                    context.moveTo(eraserunflattened[i][0].x,eraserunflattened[i][0].y);
                }
                if(1<=j && j<2){
                    context.lineTo(eraserunflattened[i][j].x, eraserunflattened[i][j].y);
                }
                if(j>=3){
                    CatRomGraph(eraserunflattened[i][j-3],eraserunflattened[i][j-2],eraserunflattened[i][j-1],eraserunflattened[i][j],0.05,context);
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
        if(is_submit){
            FindError(mousecoord, defaultcolour2);
        }
        else{
            let Error = document.getElementById("error");
            Error.style.color = defaultcolour2;
            Error.innerHTML = "Error: "
            if(mode == "pen"){
                DrawingPlane.style.cursor = "url('images/pencursordark.png') 16 16, auto";
            }
            if(mode == "eraser"){
                DrawingPlane.style.cursor = "url('images/erasercursordark.png') 16 16, auto";
            }
        }
        //invertcolor(DrawingPlane);
        context.clearRect(0,0,DrawingPlane.width,DrawingPlane.height);
        DrawAxis();
        context.globalCompositeOperation = "source-over";
        context.lineWidth = 3;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.strokeStyle = defaultcolour2;
        for(let i = 0; i < unflattened.length; i++){
            context.beginPath();
            for(let j = 0; j < unflattened[i].length; j++){
                if(j == 0){
                    context.moveTo(unflattened[i][0].x, unflattened[i][0].y);
                }
                if(1<=j && j<2){
                    context.lineTo(unflattened[i][j].x, unflattened[i][j].y);
                }
                if(j>=3){
                    CatRomGraph(unflattened[i][j-3],unflattened[i][j-2],unflattened[i][j-1],unflattened[i][j],0.05,context);
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
                    context.moveTo(eraserunflattened[i][0].x,eraserunflattened[i][0].y);
                }
                if(1<=j && j<2){
                    context.lineTo(eraserunflattened[i][j].x, eraserunflattened[i][j].y);
                }
                if(j>=3){
                    CatRomGraph(eraserunflattened[i][j-3],eraserunflattened[i][j-2],eraserunflattened[i][j-1],eraserunflattened[i][j],0.05,context);
                }
            }
            context.stroke();
        }
        //UserDrawing();
    }
});
submitbutton.addEventListener("click",() => {
    document.body.style.cursor = "default";
    mode = "none";
    if (mousecoord.length == 0) {
        SendError("Draw something to submit!");   
    }
    else {
        is_submit = true;
        FindError(mousecoord, defaultcolour2);
        const replaybutton = document.createElement("button");
        replaybutton.textContent = "Replay";
        document.body.appendChild(replaybutton);
        replaybutton.addEventListener("click",() => {
            location.reload();
        });
        const giveupbutton = document.createElement("button");
        giveupbutton.textContent = "Give up";
        document.body.appendChild(giveupbutton);
        let giveup = false;
        giveupbutton.addEventListener("click", () => {
            giveup = true;
            DrawGraph(0, 1,Function_x, Function_y);
        });
        const nextlevelbutton = document.createElement("button");
        nextlevelbutton.textContent = "Next Level";
        document.body.appendChild(nextlevelbutton);
        nextlevelbutton.addEventListener("click", ()=> {
            //edit later
        });
        
        penbutton.disabled = true;
        eraserbutton.disabled = true;
        clearbutton.disabled = true;
        undobutton.disabled = true;
    }
});
penbutton.addEventListener("click",() => {
    if (is_submit == false) {
        if(mode == "eraser"){
            mode = "pen";
            if(colourmode == "light"){
                DrawingPlane.style.cursor = "url('images/pencursorlight.png') 16 16, auto";
            }
            if(colourmode == "dark"){
                DrawingPlane.style.cursor = "url('images/pencursordark.png') 16 16, auto"
            }
        }
    }
});
eraserbutton.addEventListener("click",() => {
    if (is_submit == false) {
        if(mode == "pen"){
            mode = "eraser";
            if(colourmode == "light"){
                DrawingPlane.style.cursor = "url('images/erasercursorlight.png') 16 16, auto";
            }
            else{
                DrawingPlane.style.cursor = "url('images/erasercursordark.png')16 16, auto";
            }
        }
    }
});
clearbutton.addEventListener("click",() => {
    if (!is_submit) {
        const canvas = document.getElementById("drawingplane");
        const context = canvas.getContext('2d');
        context.clearRect(0,0,canvas.width,canvas.height);
        mousecoord = [];
        unflattened.push([]);
        history.push(context.getImageData(0, 0, cw, ch));
    }
});

undobutton.addEventListener("click", ()=>{
    if (history.length > 1) {
        history.pop();
        const removed = unflattened.pop();
        if (removed.length > 0) {
            for (let i = 0; i < removed.length; i++) {
                mousecoord.pop();
            }
        }
        else {
            mousecoord = unflattened.flat();
        }
        const canvas = document.getElementById("drawingplane");
        const context = canvas.getContext('2d');
        context.putImageData(history[history.length-1], 0, 0);
    }
});
