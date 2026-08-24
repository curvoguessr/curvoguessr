let cw, ch, xunit, yunit, accuracy;

function Convert(p) {
    return {
        x: (p.x - cw/2) / xunit,
        y: (ch/2 - p.y) / yunit
    };
}

function CatRom(a, b, c, d, t) {
    return {
        x: ((-a.x + 3*b.x - 3*c.x + d.x)*(t*t*t)/2
            + (a.x - 5*b.x/2 + 2*c.x - d.x/2)*(t*t)
            + ((c.x-a.x)/2)*t + b.x),

        y: ((-a.y + 3*b.y - 3*c.y + d.y)*(t*t*t)/2
            + (a.y - 5*b.y/2 + 2*c.y - d.y/2)*(t*t)
            + ((c.y-a.y)/2)*t + b.y)
    };
}

function EuclideanDist(p1, p2) {
    const xval = p1.x - p2.x;
    const yval = p1.y - p2.y;
    return Math.sqrt(xval*xval + yval*yval);
}

function destandardize(d) {
    return {
        x: d.x/1000,
        y: d.y/1000
    };
}

function denormalise(b) {
    return {
        x: b.x*cw,
        y: b.y*ch
    };
}

function getDense(mousecoord) {
        let points = mousecoord.map(
        p => denormalise(destandardize(p))
    );

    let dense = [];
    const steps = 100;

    for (let i = 3; i < points.length; i++) {
        for (let j = 0; j < steps; j++) {
            const t = j/steps;
            dense.push(CatRom(points[i-3], points[i-2], points[i-1], points[i], t));
        }
    }

    dense.push(points[points.length-1]);
    return dense;
}
function resample(dense, count) {
    if (count <= 1) {
        return [dense[0]];
    }

    let sum = [];
    sum.push(0);
    for (let i = 1; i < dense.length; i++) {
        sum[i] = sum[i-1] + EuclideanDist(dense[i-1],dense[i]);
    }
    let totalLen = sum[sum.length-1];
    let result = [];
    for (let i = 0; i < count; i++) {
        let target = i*totalLen/(count-1);

        let l = 1, r = sum.length - 1;
        while (l < r) {
            let m = Math.floor((l+r)/2);
            if (sum[m] < target) {
                l = m+1;
            }
            else {
                r = m;
            }
        }
        if (sum[l] == sum[l-1]) {
            result.push(dense[l]); continue;
        }
        let t = (target - sum[l-1])/(sum[l]-sum[l-1]);
        result.push({x: dense[l-1].x + t*(dense[l].x - dense[l-1].x), y: dense[l-1].y + t*(dense[l].y-dense[l-1].y)});
    }
    return result;
}


function KuhnMarkes(a, n, m) {
    //adapted from https://cp-algorithms.com/graph/hungarian-algorithm.html
    let u = new Array(n+1).fill(0);
    let v = new Array(m+1).fill(0);
    let p = new Array(m+1).fill(0);
    let way = new Array(m+1).fill(0);
    const INF = 30;
    for (let i = 1; i <= n; i++) {
        p[0]=i;
        let j0 = 0;
        let minv = new Array(m+1).fill(INF);
        let used = new Array(m+1).fill(false);
        do {
            used[j0] = true;
            let i0 = p[j0];
            let delta = INF;
            let j1 = 0;
            for (let j = 1; j <= m; ++j) {
                if (!used[j]) {
                    let cur = a[i0][j] - u[i0] - v[j];
                    if (cur < minv[j]) {
                        minv[j] = cur;
                        way[j] = j0;
                    }
                    if (minv[j] < delta) {
                        delta = minv[j];
                        j1 = j;
                    }
                }
            }
            for (let j = 0; j <= m; ++j) {
                if (used[j]) {
                    u[p[j]] += delta;
                    v[j] -= delta;
                }
                else {
                    minv[j] -= delta;
                }
            }
            j0 = j1;
        } while (p[j0] != 0);
        do {
            let j1 = way[j0];
            p[j0] = p[j1];
            j0 = j1;
        } while (j0 > 0);
    }
    let ans = 0;
    for (let i = 1; i <= m; i++) {
        ans += a[p[i]][i];
    }
    return ans;
}
self.onmessage = (event) => {
    cw = event.data.cw;
    ch = event.data.ch;
    xunit = event.data.xunit;
    yunit = event.data.yunit;

    const {
        unflattened,
        allActual,
        actuallen,
    } = event.data;
    let dense = [];
    let len = [];
    let nump = [];
    let remainder = [];
    let totalLen = 0;
    for (let i = 0; i < unflattened.length; i++) {
        dense.push(getDense(unflattened[i]));
        len.push(0);
        nump.push(0);
        remainder.push(0);
        for (let j = 1; j < dense[i].length; j++) {
            len[i] += EuclideanDist(dense[i][j-1], dense[i][j]);
        }
        totalLen += len[i];
    }
    let remaining = actuallen;
    let sortedbyr = [];
    for (let i = 0; i < dense.length; i++) {
        nump[i] = Math.floor(actuallen*len[i]/totalLen);
        remainder[i] = actuallen*len[i]/totalLen - nump[i];
        sortedbyr.push(i);
        remaining -= nump[i];
    }
    sortedbyr.sort((a,b)=>remainder[b]-remainder[a]);
    for (let i = 0; i < remaining; i++) {
        nump[sortedbyr[i]]++;
    }

    let user = [];
    for (let i = 0; i < unflattened.length; i++) {
        user.push(...resample(dense[i],nump[i]));
    }
    for (let i = 0; i < user.length; i++) {
        user[i] = Convert(user[i]);
    }
    let dists = new Array(actuallen+1);
    for (let i = 1; i <= actuallen; i++) {
        dists[i]=[0];
        for (let j = 1; j <= actuallen; j++) {
            dists[i].push(EuclideanDist(user[i-1], allActual[j-1]));
        }
    }
    let error = KuhnMarkes(dists, actuallen, actuallen);
    error /= actuallen;
    let accuracy = 100*Math.exp(-0.1*error);
    accuracy = Math.round(accuracy*100)/100
    self.postMessage(accuracy);
};
