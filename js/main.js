if (sessionStorage.getItem("colourmode")==null) {
    sessionStorage.setItem("colourmode",colourmode);
}
colourmode = sessionStorage.getItem("colourmode");
if(colourmode == "dark"){
    defaultcolour1 = "#121212";
    defaultcolour2 = "#d6d6d6";
    defaultcolour3 = "white";
    document.body.style.backgroundColor = defaultcolour1;
    let Error = document.getElementById("error");
    Error.style.color = defaultcolour2;
    Error.innerHTML = "Error: "
    if(mode == "pen"){
        DrawingPlane.style.cursor = "url('images/pencursordark.png') 16 16, auto";
    }
    if(mode == "eraser"){
        DrawingPlane.style.cursor = "url('images/erasercursordark.png') 16 16 auto";
    }
    DrawAxis(subxunit,xunit,cw,subyunit,yunit,ch);
}
else {
    defaultcolour1 = "#d6d6d6";
    defaultcolour2 = "#121212";
    defaultcolour3 = "black";
    document.body.style.backgroundColor = defaultcolour1;
    let Error = document.getElementById("error");
    Error.style.color = defaultcolour2;
    Error.innerHTML = "Error: "
    if(mode == "pen"){
        DrawingPlane.style.cursor = "url('images/pencursorlight.png') 16 16, auto";
    }
    if(mode == "eraser"){
        DrawingPlane.style.cursor = "url('images/erasercursorlight.png') 16 16 auto";
    }
    DrawAxis(subxunit,xunit,cw,subyunit,yunit,ch);
}
function overlap(){
    const plane = document.getElementById("plane");
    const drawingplane = document.getElementById("drawingplane");
    const rect = plane.getBoundingClientRect();
    drawingplane.style.position = "absolute";
    drawingplane.style.top = rect.top + "px";
    drawingplane.style.left = rect.left + "px";
}
window.addEventListener("load",()=>{
    overlap();
});

window.addEventListener("resize",()=>{
    const plane = document.getElementById('plane');
    const drawingplane = document.getElementById('drawingplane');
    const context1 = plane.getContext("2d");
    const context = drawingplane.getContext("2d");
    context1.resetTransform();
    context.resetTransform();
    context.clearRect(0,0,plane.width,plane.height);

    vw = window.innerWidth/100;
    vh = window.innerHeight/100;
    if(vw>1.238*vh){
       vw = 1.238*vh;
    }
    subxunit = 2*vw;
    subyunit = 2*vh;

    xunit = 2*subxunit;
    yunit = 2*subyunit;

    cw = 80*vw;
    ch = 80*vh;
    origin = {
        x: cw/2,
        y: ch/2
    }
    plane.width = cw;
    drawingplane.width = cw;
    plane.height = ch;
    drawingplane.height = ch;
    overlap();
    // TransformCanvas(context,cw,ch);
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
});

InitializeError();

UserDrawing();
