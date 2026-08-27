let accuracy;
let rootActual = null;
let rootUser = null;
let allActual = [];
let actualUnflattened = [];
let distActual = 0;
function InitializeError() {
    let spacing = 0.05;
    for (let i = 0; i < Graph.length; i++) {
        let prev = {x: Graph[i].Function_x(Graph[i].pRange.l), y: Graph[i].Function_y(Graph[i].pRange.l)};
        let accum = 0;
        let Segment = [prev];
        for (let t = Graph[i].pRange.l; t <= Graph[i].pRange.r; t += 0.001) {
            let next = {
                x : Graph[i].Function_x(t),
                y : Graph[i].Function_y(t)
            }
            let dist = EuclideanDist(prev, next);
            distActual += dist;
            while (accum + dist >= spacing) {
                let ratio = (spacing - accum)/dist;
                let add = {
                    x : prev.x + ratio*(next.x-prev.x),
                    y : prev.y + ratio*(next.y-prev.y)
                }
                dist -= (spacing - accum);
                Segment.push(add);
                accum = 0;
                prev = add;
            }
            accum += dist;
            prev = next;
        }
        actualUnflattened.push([...Segment]);
        allActual.push(...Segment);
    }
}
const worker = new Worker("../../js/worker.js");
function FindError(unflattened) {
    return new Promise((resolve)=>{
        worker.onmessage = (event) => {
            accuracy = event.data;
            resolve();
        };
        InitializeError();
        worker.postMessage({unflattened, allActual, distActual, rootActual, cw, ch, xunit, yunit});
    });
}