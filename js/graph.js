function DrawAxis(subxunit,xunit,cw,subyunit,yunit,ch){
    const canvas = document.getElementById('plane');
    const context = canvas.getContext('2d');
    TransformCanvas(context, cw, ch);
    context.clearRect(-cw/2,-ch/2,cw,ch);
    if(colourmode == "light"){
        canvas.style.outline = '2px solid black';
    }
    if(colourmode == "dark"){
        canvas.style.outline = '2px solid white';
    }
    context.beginPath();
    context.strokeStyle = defaultcolour2;
    context.lineWidth = 0.2;
    for (let i = -Math.floor((ch/2)/yunit)*yunit+subyunit; i <= Math.floor((ch/2)/yunit)*yunit-subyunit; i+=yunit) {
        context.moveTo(-(cw/2),i);
        context.lineTo((cw/2),i);
    }
    for (let i = -Math.floor((cw/2)/xunit)*xunit+subxunit; i <= Math.floor((cw/2)/xunit)*xunit+subxunit; i+=xunit) {
        context.moveTo(i,-(ch/2));
        context.lineTo(i,(ch/2));
    }
    context.stroke();

    context.beginPath();
    context.strokeStyle = defaultcolour2;
    context.lineWidth = 1;
    for (let i = -Math.floor((ch/2)/yunit)*yunit; i <= Math.floor((ch/2)/yunit)*yunit; i += yunit) {
        context.moveTo(-(cw/2),i);
        context.lineTo((cw/2),i);
    }
    for (let i = -Math.floor((cw/2)/xunit)*xunit; i <= Math.floor((cw/2)/xunit)*xunit; i += xunit) {
        context.moveTo(i,-(ch/2));
        context.lineTo(i,(ch/2));
    }
    context.stroke();
    
    context.beginPath();
    context.strokeStyle = defaultcolour2;
    context.lineWidth = (cw+ch)/220;
    
    context.moveTo(-cw/2+(subxunit/2),0);
    context.lineTo(cw/2-(subxunit/2),0);
    context.moveTo(0,-ch/2+(subyunit/2));
    context.lineTo(0,ch/2-(subyunit)/2);
    context.stroke();

    context.beginPath();
    context.strokeStyle = defaultcolour2;
    context.lineWidth = 1;
    
    context.moveTo(-cw/2,0);
    context.lineTo(-cw/2+(2*subxunit/3),(2*subyunit/3));
    context.lineTo(-cw/2+(2*subxunit/3),-(2*subyunit/3));
    context.closePath();
    context.fillStyle = defaultcolour2;
    context.fill();

    context.beginPath();
    context.strokeStyle = defaultcolour2;
    context.lineWidth = 1;
    
    context.moveTo(cw/2,0);
    context.lineTo(cw/2-(2*subxunit/3),(2*subyunit/3));
    context.lineTo(cw/2-(2*subxunit/3),-(2*subyunit/3));
    context.closePath();
    context.fillStyle = defaultcolour2;
    context.fill();
    
    context.beginPath();
    context.strokeStyle = defaultcolour2;
    context.lineWidth = 1;
    context.moveTo(0,-ch/2);
    context.lineTo((2*subxunit/3),-ch/2+(2*subyunit/3));
    context.lineTo(-(2*subxunit/3),-ch/2+(2*subyunit/3));
    context.closePath();
    context.fillStyle = defaultcolour2;
    context.fill();

    context.beginPath();
    context.strokeStyle = defaultcolour2;
    context.lineWidth = 1;
    context.moveTo(0,ch/2);
    context.lineTo((2*subxunit/3),ch/2-(2*subyunit/3));
    context.lineTo(-(2*subxunit/3),ch/2-(2*subyunit/3));
    context.closePath();
    context.fillStyle = defaultcolour2;
    context.fill();
}
function DrawGraphSegment(t_1, t_2, Function_x, Function_y, mxerr, context){
    const t_m = (t_1 + t_2)/2;
    const p_1 = {
        x: Function_x(t_1),
        y: Function_y(t_1)
    }
    const p_m = {
        x: Function_x(t_m),
        y: Function_y(t_m)
    }
    const p_2 = {
        x: Function_x(t_2),
        y: Function_y(t_2)
    }
    const mid = {
        x: (p_1.x + p_2.x)/2,
        y: (p_1.y + p_2.y)/2
    }
    const dx = (p_m.x-mid.x);
    const dy = (p_m.y-mid.y);
    const error = Math.sqrt(dx*dx+dy*dy);
    if (error < mxerr) {
        context.moveTo(xunit*p_1.x, yunit*p_1.y);
        context.lineTo(xunit*p_2.x, yunit*p_2.y);
    }
    else {
        DrawGraphSegment(t_1, t_m, Function_x, Function_y, mxerr, context);
        DrawGraphSegment(t_m, t_2, Function_x, Function_y, mxerr, context);
    }
}
function DrawGraph(t_1, t_2, Function_x, Function_y){
    const canvas = document.getElementById('plane');
    const context = canvas.getContext('2d');
    const ch = canvas.height;
    const cw = canvas.width;
    
    TransformCanvas(context,cw,ch);
    context.beginPath();
    context.strokeStyle = "Red";
    context.lineWidth = 4;

    DrawGraphSegment(t_1,t_2,Function_x, Function_y, 0.001, context);
    context.stroke();
}
