if (sessionStorage.getItem("colourmode")==null) {
    sessionStorage.setItem("colourmode",colourmode);
}
colourmode = sessionStorage.getItem("colourmode");
if(colourmode == "dark"){
    defaultcolour1 = "#121212";
    defaultcolour2 = "#d6d6d6";
    defaultcolour3 = "white";
    document.body.style.backgroundColor = defaultcolour1;
    let Error = document.getElementById("error");
    Error.style.color = defaultcolour2;
    Error.innerHTML = "Error: "
    if(mode == "pen"){
        DrawingPlane.style.cursor = "url('images/pencursordark.png') 16 16, auto";
    }
    if(mode == "eraser"){
        DrawingPlane.style.cursor = "url('images/erasercursordark.png') 16 16 auto";
    }
    DrawAxis();
}
else {
    defaultcolour1 = "#d6d6d6";
    defaultcolour2 = "#121212";
    defaultcolour3 = "black";
    document.body.style.backgroundColor = defaultcolour1;
    let Error = document.getElementById("error");
    Error.style.color = defaultcolour2;
    Error.innerHTML = "Error: "
    if(mode == "pen"){
        DrawingPlane.style.cursor = "url('images/pencursorlight.png') 16 16, auto";
    }
    if(mode == "eraser"){
        DrawingPlane.style.cursor = "url('images/erasercursorlight.png') 16 16 auto";
    }
    DrawAxis();
}
InitializeError();

UserDrawing();
