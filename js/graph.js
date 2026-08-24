function DrawAxis(subxunit,xunit,cw,subyunit,yunit,ch){
    const canvas = document.getElementById('plane');
    const context = canvas.getContext('2d');
    TransformCanvas(context, cw, ch);
    context.clearRect(-cw/2,-ch/2,cw,ch);
    if(colourmode == "light"){
       canvas.style.outline = `${Math.min(cw,ch)/borderScale}px solid #121212`;
    }
    if(colourmode == "dark"){
        canvas.style.outline = `${Math.min(cw,ch)/borderScale}px solid #d6d6d6`;
    }
    context.beginPath();
    context.strokeStyle = defaultcolour2;
    context.lineWidth = Math.min(cw,ch)/minorGridlineScale;
    let x=0;
    for (let i = -(ch/2)+subyunit; i <= (ch/2)+subyunit; i+=yunit) {
        context.moveTo(-(cw/2),i);
        context.lineTo((cw/2),i);
        x++;
    }
   // context.stroke();
    for (let i = -cw/2+subxunit; i <= cw/2+subxunit; i+=xunit) {
        context.moveTo(i,-(ch/2));
        context.lineTo(i,(ch/2));
    }
    context.stroke();

    context.beginPath();
    context.strokeStyle = defaultcolour2;
    context.lineWidth = Math.min(cw,ch)/gridlineScale;
    for (let i = -ch/2; i <= ch/2; i += yunit) {
        context.moveTo(-(cw/2),i);
        context.lineTo((cw/2),i);
    }
    for (let i = -cw/2; i <= cw/2; i += xunit) {
        context.moveTo(i,-(ch/2));
        context.lineTo(i,(ch/2));
    }
    context.stroke();
    
    context.beginPath();
    context.strokeStyle = defaultcolour2;
    context.lineWidth = Math.min(cw,ch)/axisScale;
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
    context.resetTransform();
    const fontsz = (cw+ch)/60;
    context.font = `${fontsz}px BreeSerif`;
    context.fillStyle = defaultcolour2;
    context.textBaseline = "top";
    context.textAlign = "center";
    let half = cw/(2*xunit);
    half = Math.round(half);
    for (let i = -half+1; i < 0; i++) {
        context.fillText(i, (i+half)*xunit, ch/2 + subyunit/8);
    }
    context.textAlign = "left";
    for (let i = 1; i < half; i++) {
        context.fillText(i, (i+half)*xunit, ch/2 + subyunit/8);
    }
    context.fillText("0", half*xunit + subxunit/8, ch/2 + subyunit/8);
    context.textBaseline = "middle";
    context.textAlign = "right";
    for (let i = -half+1; i < 0; i++) {
        context.fillText(i, cw/2 - subxunit/4, (-i+half)*yunit + subyunit/4);
    }
    for (let i = 1; i < half; i++) {
        context.fillText(i, cw/2 - subxunit/4, (-i+half)*yunit + subyunit/4);
    }
}
function DrawGraphSegment(t_1, t_2, Function_x, Function_y, mxerr, context, depth=0){
    const MAX_DEPTH = 30;
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
    if (!isFinite(p_1.x) || !isFinite(p_1.y) || !isFinite(p_2.x) || !isFinite(p_2.y)) {
        return;
    }
    if (!isFinite(p_m.x) || !isFinite(p_m.y)) {
        return;
    }
    const mid = {
        x: (p_1.x + p_2.x)/2,
        y: (p_1.y + p_2.y)/2
    }
    const dx = (p_m.x-mid.x);
    const dy = (p_m.y-mid.y);
    const error = Math.sqrt(dx*dx+dy*dy);
    const BOUND = 50;
    const outside =
    (p_1.y > BOUND && p_m.y > BOUND && p_2.y > BOUND) ||
    (p_1.y < -BOUND && p_m.y < -BOUND && p_2.y < -BOUND);
    if (outside) {
        return;
    }
    if (error < mxerr) {
        context.moveTo(xunit * p_1.x, yunit * p_1.y);
        context.lineTo(xunit * p_2.x, yunit * p_2.y);
    }
    else if (depth == MAX_DEPTH) {
        context.moveTo(xunit * p_1.x, yunit * p_1.y);
        context.lineTo(xunit * p_2.x, yunit * p_2.y);
    }
    else {
        DrawGraphSegment(t_1, t_m, Function_x, Function_y, mxerr, context, depth+1);
        DrawGraphSegment(t_m, t_2, Function_x, Function_y, mxerr, context, depth+1);
    }
}
function DrawGraph(t_1, t_2, Function_x, Function_y){
    const canvas = document.getElementById('plane');
    const context = canvas.getContext('2d');
    
    TransformCanvas(context,cw,ch);
    context.beginPath();
    context.strokeStyle = "Red";
    context.lineWidth = (cw+ch)/borderScale;

    DrawGraphSegment(t_1,t_2,Function_x, Function_y, 0.001, context);
    context.stroke();
}
