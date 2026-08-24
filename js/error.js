function GetEquidistantPoints(Function_x, Function_y, tl, tr, spacing, dt = 0.001) {
    const points = [];
    let t = tl;
    let prev = {
        x: Function_x(t),
        y: Function_y(t)
    };
    points.push(prev);
    let accum = 0;
    while (t < tr) {
        const nextT = Math.min(t + dt, tr);

        const next = {
            x: Function_x(nextT),
            y: Function_y(nextT)
        };

        const dx = next.x - prev.x;
        const dy = next.y - prev.y;
        const d = EuclideanDist(prev, next);

        if (accum + d >= spacing) {
            const f = (spacing - accum) / d;

            const point = {
                x: prev.x + f * dx,
                y: prev.y + f * dy
            };

            points.push(point);

            prev = point;
            accum = 0;

            t -= dt * (1 - f);
        } else {
            accum += d;
            prev = next;
            t = nextT;
        }
    }
    const end = {
        x: Function_x(tr),
        y: Function_y(tr)
    };

    if (points.length === 0 || EuclideanDist(end, points[points.length-1]) > spacing * 0.5) {
        points.push(end);
    }

    return points;
}
let accuracy;
let actuallen = 0;
let allActual = [];
let actualUnflattened = [];
function InitializeError() {
    for (let i = 0; i < Graph.length; i++) {

        let actual = GetEquidistantPoints(Graph[i].Function_x, Graph[i].Function_y, Graph[i].pRange.l, Graph[i].pRange.r, graphLen/500);
        allActual.push(...actual);
    }
    actuallen = allActual.length;
}

const worker = new Worker("../../js/worker1.js");
function FindError(mousecoord, unflattened, colour) {
    return new Promise((resolve) => {
        worker.onmessage = (event) => {
            accuracy = event.data;
            
            resolve();
        };

        worker.postMessage({
            unflattened,
            allActual,
            actuallen,
            cw,
            ch,
            xunit,
            yunit
        });
    });
}function GetEquidistantPoints(Function_x, Function_y, tl, tr, spacing, dt = 0.001) {
    const points = [];
    let t = tl;
    let prev = {
        x: Function_x(t),
        y: Function_y(t)
    };
    points.push(prev);
    let accum = 0;
    while (t < tr) {
        const nextT = Math.min(t + dt, tr);

        const next = {
            x: Function_x(nextT),
            y: Function_y(nextT)
        };

        const dx = next.x - prev.x;
        const dy = next.y - prev.y;
        const d = EuclideanDist(prev, next);

        if (accum + d >= spacing) {
            const f = (spacing - accum) / d;

            const point = {
                x: prev.x + f * dx,
                y: prev.y + f * dy
            };

            points.push(point);

            prev = point;
            accum = 0;

            t -= dt * (1 - f);
        } else {
            accum += d;
            prev = next;
            t = nextT;
        }
    }
    const end = {
        x: Function_x(tr),
        y: Function_y(tr)
    };

    if (points.length === 0 || EuclideanDist(end, points[points.length-1]) > spacing * 0.5) {
        points.push(end);
    }

    return points;
}
let accuracy;
let actuallen = 0;
let allActual = [];
let actualUnflattened = [];
function InitializeError() {
    for (let i = 0; i < Graph.length; i++) {

        let actual = GetEquidistantPoints(Graph[i].Function_x, Graph[i].Function_y, Graph[i].pRange.l, Graph[i].pRange.r, graphLen/500);
        allActual.push(...actual);
    }
    actuallen = allActual.length;
}

const worker = new Worker("../../js/worker.js");
function FindError(mousecoord, unflattened, colour) {
    return new Promise((resolve) => {
        worker.onmessage = (event) => {
            accuracy = event.data;
            
            resolve();
        };

        worker.postMessage({
            unflattened,
            allActual,
            actuallen,
            cw,
            ch,
            xunit,
            yunit
        });
    });
}
