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
    const steps = 10000;
    for (let i = 3; i < points.length; i++) {
        for (let j = 0; j < steps; j++) {
            const t = j/steps;
            dense.push(CatRom(points[i-3],points[i-2],points[i-1],points[i],t));
        }
    }
    dense.push(points[points.length-1]);
    let user = [dense[0]];
    let accum = 0;
    for (let i = 1; i < dense.length; i++) {
        let prev = dense[i-1];
        let next = dense[i];
        let dist = EuclideanDist(prev, next);
        while (accum + dist >= spacing) {
            let ratio = (spacing - accum)/dist;
            let add = {
                x: prev.x + ratio*(next.x-prev.x),
                y: prev.y + ratio*(next.y-prev.y)
            };
            user.push(add);
            dist -= spacing-accum;
            prev = add;
            accum = 0;
        }
        accum += dist;
        prev = next;
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
function FindAngles(unflattened, all) {
    function CalcAngle(A, B, C) {
        let angleA = Math.atan2(A.y - B.y, A.x - B.x);
        let angleC = Math.atan2(C.y - B.y, C.x - B.x);
        let angle = angleC - angleA;
        angle += 2*Math.PI; angle %= 2*Math.PI;
        return angle;
    }
    let flatIndex = 0;
    for (let i = 0; i < unflattened.length; i++) {
        let stroke = unflattened[i];
        for (let j = 0; j < stroke.length; j++) {
            if (j == 0) {
                all[flatIndex].angle = Math.PI;
            }
            else if (j == stroke.length-1) {
                all[flatIndex].angle = Math.PI;
            }
            else {
                all[flatIndex].angle = CalcAngle(stroke[j-1], stroke[j], stroke[j+1]);
            }
            flatIndex++;
        }
    }
}
function ErrorNear(allUser, allActual, userUnflattened, actualUnflattened) {
    let errorUser = 0, errorActual = 0;
    const len = allUser.length;
    FindAngles(userUnflattened, allUser);
    FindAngles(actualUnflattened, allActual);
    let rootActual = KD.Build([...allActual]);
    for (let i = 0; i < len; i++) {
        let best = {dist: Infinity, point: null};
        KD.Nearest(rootActual, allUser[i], best);
        let angleDiff =  best.point.angle-allUser[i].angle+2*Math.PI;
        angleDiff %= 2*Math.PI;
        angleDiff = Math.min(angleDiff,2*Math.PI-angleDiff);
        let angleFactor = 2/3-(1/3)*Math.cos(angleDiff);
        errorUser += best.dist * angleFactor;
    }
    let rootUser = KD.Build([...allUser]);
    for (let i = 0; i < allActual.length; i++) {
        let best = {dist: Infinity, point: null};
        KD.Nearest(rootUser, allActual[i], best);
        let angleDiff =  best.point.angle-allActual[i].angle+2*Math.PI;
        angleDiff %= 2*Math.PI;
        angleDiff = Math.min(angleDiff,2*Math.PI-angleDiff);
        let angleFactor = 2/3-(1/3)*Math.cos(angleDiff);
        errorActual += best.dist * angleFactor;
    }
    errorUser /= len;
    errorActual /= allActual.length;
    let error = {near: (errorUser + errorActual)/2};
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
    const {unflattened, actualUnflattened, allActual, distActual} = event.data;

    let userUnflattened = [];
    for (let i = 0; i < unflattened.length; i++) {
        userUnflattened.push(resampleCatRom(unflattened[i],0.05));
    }
    let allUser = userUnflattened.flat();
    console.log(allUser.length);
    let errorv = ErrorNear(allUser, allActual, userUnflattened, actualUnflattened);
    let error = errorv.near*ErrorDist(unflattened, distActual);
    console.log(error);
    accuracy = 100*Math.exp(-0.9*error);
    console.log("accuracy: ", accuracy);
    base = Math.exp(-0.9*error);
    // const addConst = 5;
    // const powerConst = 2;
    // if(accuracy<25){
    //     accuracy -= 2*addConst*Math.pow((accuracy)/25,powerConst);
    // }
    // else if(50 > accuracy && accuracy >= 25){
    //     accuracy -= 5+2*addConst*Math.pow((accuracy-25)/25,powerConst*3/4);
    // }
    // else if(accuracy >= 50 && accuracy < 80){
    //     accuracy -= (8/9)*addConst*Math.pow((80-accuracy)/20,powerConst*3/2);
    // }
    // else{
    //     let delta = (accuracy-80)/20;
    //     accuracy += 4.8*Math.pow(delta,5)-150.5*Math.pow(delta,4)+319.8*Math.pow(delta,3)-235*Math.pow(delta,2)+60.9*delta;
    // }
    accuracy = 24.64167*base + 1087.38819*base*base - 10171.49497 * base * base * base + 46892.92335 * base * base * base * base - 139196.99594 * base * base * base * base * base + 292049.26751 * base * base * base * base * base * base - 226355.16618 * base * base * base * base * base * base * base - 1011036.83967 * base * base* base * base* base * base* base * base + 4186559.66729 * base * base* base * base* base * base* base * base * base - 7822875.93087 * base * base* base * base* base * base* base * base* base * base + 8814233.38887 * base * base* base * base* base * base* base * base* base * base * base - 6308700.04446 * base * base* base * base* base * base* base * base* base * base* base * base + 2806197.25176* base * base* base * base* base * base* base * base* base * base* base * base * base - 703372.26795 * base * base* base * base* base * base* base * base* base * base* base * base* base * base + 74764.21140 * base * base* base * base* base * base* base * base* base * base* base * base* base * base * base;
    accuracy = Math.round(accuracy*100)/100;
    self.postMessage(accuracy);
}