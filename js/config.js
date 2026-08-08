const subxunit = 20;
const subyunit = 20;

const xunit = 2*subxunit;
const yunit = 2*subyunit;

const cw = 800;
const ch = 1000;

const origin = {
    x: cw/2,
    y: ch/2
}

const Graph = [
    {
        Function_x: function(t) {
            return t;
        },
        Function_y: function(t) {
            return t;
        },
        range: {
            xl: -20,
            xr: 20,
            yl: -20,
            yr: 20
        },
        pRange: {
            l: 0,
            r: 1
        }
    }
]