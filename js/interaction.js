function deletepoint(a, i){
    for(let j = 0; j < a.length; j++){
        if(i < a[j].length){
            let first = a[j].slice(0,i);
            let second = a[j].slice(i+1);
            a[j]=first;
            a.splice(j+1,0,second);
            return;
        }
        i -= a[j].length;
    }
}
function normalise(a){
    const drawingplane = document.getElementById('drawingplane');
    let cw = drawingplane.width;
    let ch = drawingplane.height;
    return{ x: a.x/(cw), y: a.y/(ch)};
}
function denormalise(b){
    const drawingplane = document.getElementById('drawingplane');
    let cw = drawingplane.width;
    let ch = drawingplane.height;
    return{ x: b.x*cw, y: b.y*ch};
}
function standardize(c){
    return{x : c.x*1000,y : c.y*1000};
}
function destandardize(d){
    return{x : d.x/1000, y: d.y/1000};
}
let mode = "pen";
let mousecoord = [];
let erasecoord = [];
let unflattened = [];
let eraserunflattened = [];
let drawingHistory = [];
let drawIndex = 0;
let coalevents;
let t;       
function UserDrawing() {
    const DrawingPlane = document.getElementById("drawingplane");
    const context = DrawingPlane.getContext('2d');
    let brush = {x:67,y:67};
    let CurrentlyDrawing = false;
    function lazybrush(lazyradi,event){
        const event2 = standardize(normalise(getCoordinates(event)));
        const dist = EuclideanDist(event2,brush);
        if(dist <= lazyradi) {
            return;
        }
        else {
            brush.x = event2.x-((event2.x-brush.x)*lazyradi)/dist;
            brush.y = event2.y-((event2.y-brush.y)*lazyradi)/dist;
        }
    }
    function endDrawing(){
        if(is_submit){
            return;
        }
        if (CurrentlyDrawing) {
            CurrentlyDrawing = false;
            if (mode == "pen") {
                drawingHistory.push([structuredClone(unflattened[unflattened.length-1]),"pen"]);
            }
            else {
                drawingHistory.push([structuredClone(eraserunflattened[eraserunflattened.length-1]),"eraser"]);
            }
            drawIndex++;
            RedrawUser();
        }
        DrawingPlane.releasePointerCapture(event.pointerId);
    }
    let oldsize = 0;
    DrawingPlane.addEventListener('pointerdown',(event) => {
            const event2 = standardize(normalise(getCoordinates(event)));
            if(is_submit){
                return;
            }
            DrawingPlane.setPointerCapture(event.pointerId);
            context.beginPath();
            context.strokeStyle = defaultcolour3;
            if(mode == "pen"){
                context.globalCompositeOperation = "source-over";
                context.lineWidth = Math.sqrt(cw*cw+ch*ch)/penScale;
            }
            if(mode == "eraser"){
                context.globalCompositeOperation = "destination-out";
                context.lineWidth = Math.sqrt(cw*cw+ch*ch)/eraserScale;
            }
            context.lineCap = "round";
            context.lineJoin = "round";
            CurrentlyDrawing=true;
            if(mode == "pen"){
                oldsize = mousecoord.length;
            }
            if(mode == "eraser"){
                oldsize = erasecoord.length;
            }
            if(mode == "pen"){
                mousecoord.push(event2);
                unflattened.push([]);
                unflattened[unflattened.length-1].push(event2);
            }
            if(mode == "eraser"){
                erasecoord.push(event2);
                eraserunflattened.push([]);
                eraserunflattened[eraserunflattened.length-1].push(event2);
                for(let i = 0; i < mousecoord.length; i++){
                    if(EuclideanDist(denormalise(destandardize(mousecoord[i])),denormalise(destandardize(event2)))<=15){
                        mousecoord.splice(i,1);
                        deletepoint(unflattened, i);
                        i--;
                    }
                }
            }
            brush={x : event2.x, y : event2.y};
    });
    DrawingPlane.addEventListener('touchstart', (event) => {
        if(is_submit){
            return;
        }
        if(event.touches.length==1){
            CurrentlyDrawing = true;
        }
        if(event.touches.length > 1){
            CurrentlyDrawing = false;
        }
    });
    DrawingPlane.addEventListener('pointermove', (event) => {
        if(is_submit){
            return;
        }
        let inRange = true;
            if (CurrentlyDrawing) {
                inRange = true;
                // const coalevents = (typeof event.getCoalescedEvents === 'function') ? event.getCoalescedEvents() : [event];
                if(event.getCoalescedEvents){
                    coalevents = event.getCoalescedEvents();
                    t = 0.005;
                }
                else{
                    coalevents = [event];
                    t = 0.0025;
                }
                for(const events of coalevents){
                    lazybrush(9,events);
                    if(mode == "pen"){
                        mousecoord.push({x:brush.x,y:brush.y});
                        unflattened[unflattened.length - 1].push({x:brush.x,y:brush.y});
                    }
                    if(mode == "eraser"){
                        erasecoord.push({x:brush.x,y:brush.y});
                        eraserunflattened[eraserunflattened.length - 1].push({x : brush.x, y : brush.y});
                        for(let i = 0; i < mousecoord.length; i++){
                            if(EuclideanDist(denormalise(destandardize(mousecoord[i])),denormalise(destandardize(brush)))<=15){
                                mousecoord.splice(i,1);
                                deletepoint(unflattened, i);
                                i--;
                            }
                        }
                    }
                    if(mode == "pen"){
                        if(mousecoord.length-oldsize>=4){
                            CatRomGraph(denormalise(destandardize(mousecoord[mousecoord.length-4])),denormalise(destandardize(mousecoord[mousecoord.length-3])),denormalise(destandardize(mousecoord[mousecoord.length-2])),denormalise(destandardize(mousecoord[mousecoord.length-1])),t,context);
                        }
                        else{
                            context.lineTo(brush.x*cw/1000, brush.y*ch/1000);
                        }
                    }
                    if(mode == "eraser"){
                        if(erasecoord.length-oldsize>=4){
                            CatRomGraph(denormalise(destandardize(erasecoord[erasecoord.length-4])),denormalise(destandardize(erasecoord[erasecoord.length-3])),denormalise(destandardize(erasecoord[erasecoord.length-2])),denormalise(destandardize(erasecoord[erasecoord.length-1])),10*t,context);
                        }
                        else{
                            context.lineTo(brush.x*cw/1000,brush.y*ch/1000);
                        }
                    }
                }
                if (inRange) {
                    context.stroke();
                }
            }
    });
    DrawingPlane.addEventListener('pointerup', (event) => {
        endDrawing();
    });
    DrawingPlane.addEventListener("pointercancel",(event)=>{
        endDrawing();
    });
    window.addEventListener("blur",(event)=>{
        endDrawing();
    })
    window.addEventListener("keydown",(event)=>{
        endDrawing();
    });
}
