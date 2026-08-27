let cw, ch, xunit, yunit, accuracy;
function Convert(p) {
    return {
        x : (p.x-cw/2)/xunit,
        y : (ch/2-p.y)/yunit
    }
}

function CatRom(a, b, c, d, t){
    return{x: ((-a.x+3*(b.x)-3*(c.x)+(d.x))*(t*t*t)/2+(a.x-((5*b.x)/(2))+2*c.x-((d.x)/(2)))*(t*t)+((c.x-a.x)/2)*t+(b.x)), y: ((-a.y+3*(b.y)-3*(c.y)+(d.y))*(t*t*t)/2+(a.y-((5*b.y)/(2))+2*c.y-((d.y)/(2)))*(t*t)+((c.y-a.y)/2)*t+(b.y))};
}
function EuclideanDist(p1, p2) {
    const xval = (p1.x-p2.x)*(p1.x-p2.x);
    const yval = (p1.y-p2.y)*(p1.y-p2.y);
    return Math.sqrt(xval+yval);
}

function destandardize(d){
    return{x : d.x/1000, y: d.y/1000};
}
function denormalise(b){
    return{ x: b.x*cw, y: b.y*ch};
}
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
            acc -= spacing;
        }
    }
    const last = dense[dense.length-1];
    if (user[user.length-1].x !== last.x || user[user.length-1].y !== last.y) {
        user.push(last);
    }
    for (let i = 0; i < user.length; i++) {
        user[i]=Convert(user[i]);
    }
    return user;
}
function ErrorNear(user, rootActual, allActual) {
    let errorUser = 0, errorActual = 0;
    const len = user.length;
    for (let i = 0; i < len; i++) {
        let best = {dist: Infinity, point: null};
        KD.Nearest(rootActual, user[i], best);
        errorUser += best.dist;
    }
    let rootUser = KD.Build(user);
    for (let i = 0; i < allActual.length; i++) {
        let best = {dist: Infinity, point: null};
        KD.Nearest(rootUser, allActual[i], best);
        errorActual += best.dist;
    }
    errorUser /= len;
    errorActual /= allActual.length;
    let error = (errorUser + errorActual)/2;
    return error;
}
function ErrorDist(unflattened, distActual) {
    let distUser = 0;
    for (let i = 0; i < unflattened.length; i++) {
        for (let j = 1; j < unflattened[i].length; j++) {
            let p1 = Convert(denormalise(destandardize(unflattened[i][j])));
            let p2 = Convert(denormalise(destandardize(unflattened[i][j-1])));
            distUser += EuclideanDist(p1,p2);
        }
    }
    return Math.max(distActual/distUser, distUser/distActual);
}
self.onmessage = (event) => {
    cw = event.data.cw;
    ch = event.data.ch;
    xunit = event.data.xunit;
    yunit = event.data.yunit;
    const { unflattened, allActual, distActual, rootActual} = event.data;

    let user = [];
    for (let i = 0; i < unflattened.length; i++) {
        user.push(resampleCatRom(unflattened[i],0.1));
    }
    user = user.flat();
    let error = ErrorNear(user, rootActual, allActual)*ErrorDist(unflattened, distActual);

    let accFactor = 0.2;
    accuracy = 100*Math.exp(-accFactor*error);
    accuracy = Math.round(accuracy*100)/100;
    self.postMessage(accuracy);
}