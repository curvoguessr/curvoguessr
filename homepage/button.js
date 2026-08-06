const tutorialbutton = document.getElementById("tutorialbutton")
const lightbutton = document.getElementById("lightbutton");
const darkbutton = document.getElementById("darkbutton");
const tutorialbuttontab = document.getElementById("tutorialbuttontab")
const lightbuttontab = document.getElementById("lightbuttontab");
const darkbuttontab = document.getElementById("darkbuttontab");
const welcometext = document.getElementById("welcometext");
const welcometexttopborder = document.getElementById("welcometexttopborder");
const welcometextbottomborder = document.getElementById("welcometextbottomborder");
let colourmode = "light";
let defaultcolour1 = "white";
let defaultcolour2 = "black";
if (sessionStorage.getItem("colourmode")==null) {
    sessionStorage.setItem("colourmode",colourmode);
}
colourmode = sessionStorage.getItem("colourmode");
if(colourmode == "dark"){
    sessionStorage.setItem("colourmode", colourmode);
    defaultcolour1 = "black";
    defaultcolour2 = "white";
    document.body.style.backgroundColor = defaultcolour1;     
    welcometext.style.color = defaultcolour2;
    welcometexttopborder.style.backgroundColor = defaultcolour2;
    welcometextbottomborder.style.backgroundColor = defaultcolour2;
}
else {
    colourmode = "light";
    sessionStorage.setItem("colourmode", colourmode);
    defaultcolour1 = "white";
    defaultcolour2 = "black";
    document.body.style.backgroundColor = defaultcolour1;
    welcometext.style.color = defaultcolour2;
    welcometexttopborder.style.backgroundColor = defaultcolour2;
    welcometextbottomborder.style.backgroundColor = defaultcolour2;
}
tutorialbutton.addEventListener("click",() => {

});

lightbutton.addEventListener("click",() => {
    if(colourmode == "dark"){
        colourmode = "light";
        sessionStorage.setItem("colourmode", colourmode);
        defaultcolour1 = "white";
        defaultcolour2 = "black";
        document.body.style.backgroundColor = defaultcolour1;
        welcometext.style.color = defaultcolour2;
        welcometexttopborder.style.backgroundColor = defaultcolour2;
        welcometextbottomborder.style.backgroundColor = defaultcolour2;
    }
});
lightbuttontab.addEventListener("click",() => {
    if(colourmode == "dark"){
        colourmode = "light";
        sessionStorage.setItem("colourmode", colourmode);
        defaultcolour1 = "white";
        defaultcolour2 = "black";
        document.body.style.backgroundColor = defaultcolour1;
        welcometext.style.color = defaultcolour2;
        welcometexttopborder.style.backgroundColor = defaultcolour2;
        welcometextbottomborder.style.backgroundColor = defaultcolour2;
    }
});
darkbutton.addEventListener("click",() => {
    if(colourmode == "light"){
        colourmode = "dark";
        sessionStorage.setItem("colourmode", colourmode);
        defaultcolour1 = "black";
        defaultcolour2 = "white";
        document.body.style.backgroundColor = defaultcolour1;     
        welcometext.style.color = defaultcolour2;
        welcometexttopborder.style.backgroundColor = defaultcolour2;
        welcometextbottomborder.style.backgroundColor = defaultcolour2;    
    }
});
darkbuttontab.addEventListener("click",() => {
    if(colourmode == "light"){
        colourmode = "dark";
        sessionStorage.setItem("colourmode", colourmode);
        defaultcolour1 = "black";
        defaultcolour2 = "white";
        document.body.style.backgroundColor = defaultcolour1;     
        welcometext.style.color = defaultcolour2;
        welcometexttopborder.style.backgroundColor = defaultcolour2;
        welcometextbottomborder.style.backgroundColor = defaultcolour2;    
    }
});
