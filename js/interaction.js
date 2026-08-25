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
class SpatialGrid{
    constructor(sizeX, sizeY){
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.cells = new Map();
    }
    key(point){
        return Math.floor(point.x/this.sizeX) + "," + Math.floor(point.y/this.sizeY);
    }
    add(point){
        let key = this.key(point);
        if(!this.cells.has(key)){
            this.cells.set(key, new Set());
        }
        this.cells.get(key).add(point);
    }
    delete(point){
        let key = this.key(point);
        let cell = this.cells.get(key);
        if(cell){
            if(cell.size === 1){
                this.cells.delete(key);
            }
            else{
            cell.delete(point);
            }
        }
    }
    nearbytargets(point, radiiX, radiiY){
        let [keyx, keyy] = this.key(point).split(",").map(Number);
        let CellX = Math.ceil(radiiX / this.sizeX);
        let CellY = Math.ceil(radiiY / this.sizeY);
        let targetpoint = [];
        for(let cellsx = -CellX; cellsx <= CellX; cellsx += 1){
            for(let cellsy = -CellY; cellsy <= CellY; cellsy += 1){
                let key = (keyx + cellsx) + "," + (keyy + cellsy);
                let targetcell = this.cells.get(key);
                if(targetcell){
                    for(const p of targetcell){
                        targetpoint.push(p);
                    }
                }
            }
        }
        return targetpoint;
    }
    deletecell(point){
        let key = this.key(point);
        let cell = this.cells.get(key);
        if(cell){
            this.cells.delete(key);
        }
    }
}
let mode = "pen";
let mousecoord = [];
let erasecoord = [];
let unflattened = [];
let eraserunflattened = [];
let drawingHistory = [];
let drawIndex = 0;
let coalevents;
let splinepointcount = [];
let t;
function rebuilderasergrid(){
    const drawingplane = document.getElementById("drawingplane");
    const cw = drawingplane.width;
    const ch = drawingplane.height;
    eraserradius = Math.sqrt(cw*cw+ch*ch)/(2*eraserScale);
    SizeX = (eraserradius*1000)/cw;
    SizeY = (eraserradius*1000)/ch;
    erasergrid = new SpatialGrid(SizeX, SizeY);
    for(const point of mousecoord){
        erasergrid.add(point);
    }
}      
function UserDrawing() {
    const DrawingPlane = document.getElementById("drawingplane");
    const context = DrawingPlane.getContext('2d');
    rebuilderasergrid();
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
    function endDrawing(event){
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
            splinepointcount.push(t);
            drawIndex++;
            //RedrawUser();
        }
        if (DrawingPlane.hasPointerCapture(event.pointerId)) {
            DrawingPlane.releasePointerCapture(event.pointerId);
        }
    }
    let oldsize = 0;
    DrawingPlane.addEventListener('pointerdown',(event) => {
            const event2 = standardize(normalise(getCoordinates(event)));
            if(is_submit){
                return;
            }
            DrawingPlane.setPointerCapture(event.pointerId);
            context.beginPath();
            if(mode == "pen"){
                context.globalCompositeOperation = "source-over";
                context.lineWidth = Math.sqrt(cw*cw+ch*ch)/penScale;
                context.strokeStyle = defaultcolour2;
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
                erasergrid.add(event2);
            }
            if(mode == "eraser"){
                erasecoord.push(event2);
                eraserunflattened.push([]);
                eraserunflattened[eraserunflattened.length-1].push(event2);
                let nearbytargets = erasergrid.nearbytargets(event2, SizeX, SizeY);
                for(const points of nearbytargets){
                    if(EuclideanDist(denormalise(destandardize(points)), denormalise(destandardize(event2)))<= eraserradius){
                        erasergrid.delete(points);
                        let i = mousecoord.indexOf(points);
                        mousecoord.splice(i,1);
                        deletepoint(unflattened,i);
                    }
                }
            }
            brush={x : event2.x, y : event2.y};
            lastPoint = {x: brush.x*cw/1000, y: brush.y*ch/1000};
            context.moveTo(lastPoint.x,lastPoint.y);
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
                if(event.getCoalescedEvents){
                    coalevents = event.getCoalescedEvents();
                    t = 0.01;
                }
                else{
                    coalevents = [event];
                    t = 0.008;
                }
                if(mode == "eraser"){
                    t *= 10;
                }
                context.beginPath();
                context.moveTo(lastPoint.x,lastPoint.y);
                let newPoint;
                for(const events of coalevents){
                    if(mode == "pen"){
                        if(event.pointerType == "touch"){
                            lazybrush(3,events);
                        }
                        else{
                            lazybrush(7,events);
                        }
                        let brushpoint = {x: brush.x, y: brush.y};
                        mousecoord.push(brushpoint);
                        unflattened[unflattened.length - 1].push(brushpoint);
                        erasergrid.add(brushpoint);
                    }
                    if(mode == "eraser"){
                        let brushpoint = standardize(normalise(getCoordinates(events)));
                        erasecoord.push(brushpoint);
                        eraserunflattened[eraserunflattened.length - 1].push(brushpoint);
                        let nearbytargets = erasergrid.nearbytargets(brushpoint, SizeX, SizeY);
                        for(const points of nearbytargets){
                            if(EuclideanDist(denormalise(destandardize(points)), denormalise(destandardize({x : brushpoint.x,y : brushpoint.y})))<= eraserradius){
                                erasergrid.delete(points);
                                let i = mousecoord.indexOf(points);
                                mousecoord.splice(i,1);
                                deletepoint(unflattened,i);
                            }
                        }
                    }
                    if(mode == "pen"){
                        if(mousecoord.length-oldsize>=4){
                            CatRomGraph(denormalise(destandardize(mousecoord[mousecoord.length-4])),denormalise(destandardize(mousecoord[mousecoord.length-3])),denormalise(destandardize(mousecoord[mousecoord.length-2])),denormalise(destandardize(mousecoord[mousecoord.length-1])),t,context);
                            newPoint = denormalise(destandardize(mousecoord[mousecoord.length-1]));
                        }
                        else{
                            context.lineTo(brush.x*cw/1000, brush.y*ch/1000);
                            newPoint = {x : brush.x*cw/1000,y : brush.y*ch/1000};
                        }
                    }
                    if(mode == "eraser"){
                        if(erasecoord.length-oldsize>=4){
                            CatRomGraph(denormalise(destandardize(erasecoord[erasecoord.length-4])),denormalise(destandardize(erasecoord[erasecoord.length-3])),denormalise(destandardize(erasecoord[erasecoord.length-2])),denormalise(destandardize(erasecoord[erasecoord.length-1])),t,context);
                            newPoint = denormalise(destandardize(erasecoord[erasecoord.length-1]));
                        }
                        else{
                            context.lineTo(brush.x*cw/1000,brush.y*ch/1000);
                            newPoint = {x : brush.x*cw/1000,y : brush.y*ch/1000};
                        }
                    }
                }
                if (inRange) {
                    context.stroke();
                }
                if(newPoint){
                    lastPoint = newPoint;
                }
            }
    });
    DrawingPlane.addEventListener('pointerup', (event) => {
        endDrawing(event);
    });
    DrawingPlane.addEventListener("pointercancel",(event)=>{
        endDrawing(event);
    });
    window.addEventListener("blur",(event)=>{
        endDrawing(event);
    })
    window.addEventListener("keydown",(event)=>{
        endDrawing(event);
    });
}