let errorTimeout = null;
function SendError(error) {
    let box = document.getElementById("error-box");
    box.textContent = error;
    box.style.display = "block";
    box.style.opacity = "1";
    clearTimeout(errorTimeout);
    errorTimeout = setTimeout(() => {
        box.style.opacity = "0";
        setTimeout(() => {
            box.style.display = "none";
        }, 300);
    }, 3000)
}
function deletepoint(a, i){
    for(let j = 0; j < a.length; j++){
        if(i < a[j].length){
            a[j].splice(i, 1);
            return;
        }
        i -= a[j].length;
    }
}
let mode = "pen";
let mousecoord = [];
let erasecoord = [];
let unflattened = [];
let history = [];
function UserDrawing() {
    const DrawingPlane = document.getElementById("drawingplane");
    DrawingPlane.style.cursor = "url('images/pencursor.png') 15 15, auto";
    const context = DrawingPlane.getContext('2d');
    const rect = DrawingPlane.getBoundingClientRect();
    let brush = {x:67,y:67};
    let CurrentlyDrawing = false;
    history.push(context.getImageData(0, 0, cw, ch));
    function lazybrush(lazyradi,event){
    const dist = Math.sqrt((event.clientX-rect.left-brush.x)*(event.clientX-rect.left-brush.x)+(event.clientY-rect.top-brush.y)*(event.clientY-rect.top-brush.y));
    if(dist <= lazyradi){
        return;
    }
    else{
        brush.x = (event.clientX-rect.left)-((event.clientX-rect.left-brush.x)*lazyradi)/dist;
        brush.y = (event.clientY-rect.top)-((event.clientY-rect.top-brush.y)*lazyradi)/dist;
        }
    }
    let oldsize = 0;
    DrawingPlane.addEventListener('pointerdown',(event) => {
            if(is_submit){
                return;
            }
            context.beginPath();
            if(mode == "pen"){
                context.globalCompositeOperation = "source-over";
                context.lineWidth = 2;
            }
            if(mode == "eraser"){
                context.globalCompositeOperation = "destination-out";
                context.lineWidth = 10;
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
            unflattened.push([]);
            if(mode == "pen"){
                mousecoord.push({x:event.clientX-rect.left,y:event.clientY-rect.top});
                mousecoord.push({x:event.clientX-rect.left,y:event.clientY-rect.top});
                unflattened[unflattened.length-1].push({x:event.clientX-rect.left,y:event.clientY-rect.top});
            }
            if(mode == "eraser"){
                erasecoord.push({x:event.clientX-rect.left, y:event.clientY-rect.top});
                erasecoord.push({x:event.clientX-rect.left, y:event.clientY-rect.top});
                for(let i = 0; i < mousecoord.length; i++){
                    if(EuclideanDist(mousecoord[i],{x:event.clientX-rect.left,y:event.clientY-rect.top})<=50){
                        mousecoord.splice(i,1);
                        deletepoint(unflattened, i);
                    }
                }
            }
            //unflattened[unflattened.length-1].push({x:event.clientX-rect.left,y:event.clientY-rect.top});
            brush.x=event.clientX-rect.left;
            brush.y=event.clientY-rect.top;
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
                const coalevents = event.getCoalescedEvents();
                for(const events of coalevents){
                    lazybrush(2,events);
                    let brushCheck = Convert(brush);
                    if (brushCheck.x < range.xl || brushCheck.x > range.xr || brushCheck.y < range.yl || brushCheck.y > range.yr) {
                        SendError("Drawing out of range!");
                        inRange = false;
                        break;
                    }
                    if(mode == "pen"){
                        mousecoord.push({x:brush.x,y:brush.y});
                        unflattened[unflattened.length - 1].push({x:brush.x,y:brush.y});
                    }
                    if(mode == "eraser"){
                        erasecoord.push({x:brush.x,y:brush.y});
                        for(let i = 0; i < mousecoord.length; i++){
                            if(EuclideanDist(mousecoord[i],{x:event.clientX-rect.left,y:event.clientY-rect.top})<=50){
                                mousecoord.splice(i,1);
                                deletepoint(unflattened, i);
                            }
                        }
                    }
                        
                    }
                    if(mode == "pen"){
                        if(mousecoord.length-oldsize>=4){
                            CatRomGraph(mousecoord[mousecoord.length-4],mousecoord[mousecoord.length-3],mousecoord[mousecoord.length-2],mousecoord[mousecoord.length-1],0.005,context);
                        }
                        else{
                            context.lineTo(brush.x, brush.y);
                        }
                    }
                    if(mode == "eraser"){
                        if(erasecoord.length-oldsize>=4){
                            CatRomGraph(erasecoord[erasecoord.length-4],erasecoord[erasecoord.length-3],erasecoord[erasecoord.length-2],erasecoord[erasecoord.length-1],0.05,context);
                        }
                        else{
                            context.lineTo(brush.x,brush.y);
                        }
                    }
                if (inRange) {
                    context.stroke();
                }
            }
    });
    DrawingPlane.addEventListener('pointerup', (event) => {
        if(is_submit){
            return;
        }
        if (CurrentlyDrawing) {
            CurrentlyDrawing = false;
            history.push(context.getImageData(0, 0, cw, ch));
        }
    });
}
