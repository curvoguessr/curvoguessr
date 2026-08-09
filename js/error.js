class KD {
    constructor(point, axis) {
        this.point = point;
        this.axis = axis;
        this.left = null;
        this.right = null;
    }
    static Build(points, depth = 0) {
        if (points.length == 0) {
            return null;
        }
        let axis = depth%2;
        let mid = Math.floor(points.length/2);
        points.sort((a, b) => axis == 0 ? a.x-b.x : a.y - b.y);
        const node = new KD(points[mid], axis);
        node.left = KD.Build(points.slice(0, mid), depth+1);
        node.right = KD.Build(points.slice(mid+1), depth+1);
        return node;
    }
    static Nearest(cur, query, best) {
        if (cur == null) return;
        let d = EuclideanDist(query, cur.point);
        if (best.dist > d) {
            best.dist = d;
            best.point = cur.point;
        }
        let near, far;
        if (cur.axis == 0) {
            if (cur.point.x >= query.x) {
                near = cur.left;
                far = cur.right;
            }
            else {
                near = cur.right;
                far = cur.left;
            }
        }
        else {
            if (cur.point.y >= query.y) {
                near = cur.left;
                far = cur.right;
            }
            else {
                near = cur.right;
                far = cur.left;
            }
        }
        KD.Nearest(near, query, best);
        let delta = cur.axis == 0 ? query.x - cur.point.x : query.y - cur.point.y;
        if (Math.abs(delta) < best.dist) {
            KD.Nearest(far, query, best);
        }
    }
};
let rootActual = null;
let rootUser = null;
let actuallen = 0;
let allActual = [];
let distActual = 0;
function InitializeError() {
    for (let i = 0; i < Graph.length; i++) {
        let prev = {x: -11, y: -11};
        for (let t = Graph[i].pRange.l; t <= Graph[i].pRange.r; t += 0.005) {
            let p = {x: Graph[i].Function_x(t), y: Graph[i].Function_y(t)};
            if (p.x >= range.xl && p.x <= range.xr && p.y >= range.yl && p.y <= range.yr) {
                allActual.push(p);
                if (prev.x != -11) {
                    distActual += EuclideanDist(prev, p);
                }
                prev = p;
            }
        }
    }
    
    actuallen = allActual.length;
    rootActual = KD.Build(allActual);
}
function resampleCatRom(mousecoord, spacing) {
    if (mousecoord.length < 2) {
        return mousecoord.map(p => denormalise(destandardize(p)));
    }
    let points = mousecoord.map(p => denormalise(destandardize(p)));

    let dense = [];
    const steps = 100;
    for (let i = 3; i < points.length; i++) {
        for (let j = 0; j < steps; j++) {
            const t = j/steps;
            dense.push(CatRom(points[i-3],points[i-2],points[i-1],points[i],t));
        }
    }
    dense.push(points[points.length-1]);
    let user = [dense[0]];
    let acc = 0;
    for (let i = 1; i < dense.length; i++) {
        acc += EuclideanDist(dense[i-1],dense[i]);
        if (acc >= spacing) {
            user.push(dense[i]);
            acc = 0;
        }
    }
    if (user[user.length-1] != dense[dense.length-1]) user.push(dense[dense.length-1]);
    for (let i = 0; i < user.length; i++) {
        user[i]=Convert(user[i]);
    }
    return user;
}
function FindError(mousecoord, unflattened, colour) {
    let distUser = 0;
    for (let i = 0; i < unflattened.length; i++) {
        for (let j = 1; j < unflattened[i][0].length; j++) {
            let p1 = Convert(denormalise(destandardize(unflattened[i][0][j])));
            let p2 = Convert(denormalise(destandardize(unflattened[i][0][j-1])));
            distUser += EuclideanDist(p1,p2);
        }
    }
    let user = resampleCatRom(mousecoord, 0.1);
    let errorUser = 0, errorActual = 0;
    const len = user.length;
    for (let i = 0; i < len; i++) {
        let best = {dist: Infinity, point: null};
        KD.Nearest(rootActual, user[i], best);
        errorUser += best.dist;
    }
    rootUser = KD.Build(user);
    for (let i = 0; i < allActual.length; i++) {
        let best = {dist: Infinity, point: null};
        KD.Nearest(rootUser, allActual[i], best);
        errorActual += best.dist;
    }
    errorUser /= len;
    errorActual /= actuallen;
    let error = (errorUser + errorActual)/2;
    let errorDist = Math.max(distActual/distUser, distUser/distActual);
    error *= errorDist;
    error *= 10;
    error = Math.round(error*100)/100;
    let Error = document.getElementById("error");
    Error.style.color = colour;
    Error.innerHTML = "Error: " + error.toString();
}
