const penbutton = document.getElementById("penbutton") //done
const eraserbutton = document.getElementById("eraserbutton"); //not done
const undobutton = document.getElementById("undobutton"); //done
const clearbutton = document.getElementById("clearbutton"); //done
const submitbutton = document.getElementById("submitbutton"); //done
const lightbutton = document.getElementById("lightbutton");
const darkbutton = document.getElementById("darkbutton");
let is_submit = false;
let defaultcolour1 = "white";
let defaultcolour2 = "black";
const DrawingPlane = document.getElementById("drawingplane");
const context = DrawingPlane.getContext('2d');
const rect = DrawingPlane.getBoundingClientRect();
lightbutton.addEventListener("click",() => {
    defaultcolour1 = "white";
    defaultcolour2 = "black";
    DrawAxis;
});
darkbutton.addEventListener("click",() => {
    defaultcolour1 = "black";
    defaultcolour2 = "white";
    DrawAxis;
});
submitbutton.addEventListener("click",() => {
    document.body.style.cursor = "default";
    mode = "none";
    if (mousecoord.length == 0) {
        SendError("Draw something to submit!");   
    }
    else {
        FindError(mousecoord);
        is_submit = true;
        const replaybutton = document.createElement("button");
        replaybutton.textContent = "Replay";
        document.body.appendChild(replaybutton);
        replaybutton.addEventListener("click",() => {
            //const canvas = document.getElementById("drawingplane");
            //const context = canvas.getContext('2d');
            //context.clearRect(0,0,canvas.width,canvas.height);
            //mousecoord = [];
            //FindError(mousecoord);
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
        mode = "pen";
        DrawingPlane.style.cursor = "url('images/pencursor.png') 15 15, auto";
    }
});
eraserbutton.addEventListener("click",() => {
    if (is_submit == false) {
        mode = "eraser";
        DrawingPlane.style.cursor = "url('images/erasercursor.png') 15 15, auto";
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
