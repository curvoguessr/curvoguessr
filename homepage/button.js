// const tutorialbutton = document.getElementById("tutorialbutton");
// const lightbutton = document.getElementById("lightbutton");
// const darkbutton = document.getElementById("darkbutton");
// const tutorialbuttontab = document.getElementById("tutorialbuttontab");
// const lightbuttontab = document.getElementById("lightbuttontab");
// const darkbuttontab = document.getElementById("darkbuttontab");
// const welcometext = document.getElementById("welcometext");
// const welcometexttopborder = document.getElementById("welcometexttopborder");
// const welcometextbottomborder = document.getElementById("welcometextbottomborder");
// const tutorial = document.getElementById("tutorial");
// const tutorialtab = document.getElementById("tutorialtab");
// const lvl1button = document.getElementById("lvl1button");
// const lvl2button = document.getElementById("lvl2button");
// const lvl3button = document.getElementById("lvl3button");
// const lvl4button = document.getElementById("lvl4button");
// const lvl5button = document.getElementById("lvl5button");
// const lvl6button = document.getElementById("lvl6button");
// const lvl7button = document.getElementById("lvl7button");
// const lvl8button = document.getElementById("lvl8button");
// const lvl9button = document.getElementById("lvl9button");
// const lvl10button = document.getElementById("lvl10button");
// const lvl11button = document.getElementById("lvl11button");
// const lvl12button = document.getElementById("lvl12button");
// const lvl13button = document.getElementById("lvl13button");
// const lvl14button = document.getElementById("lvl14button");
// const lvl15button = document.getElementById("lvl15button");
// const lvl16button = document.getElementById("lvl16button");
// const lvl17button = document.getElementById("lvl17button");
// const lvl18button = document.getElementById("lvl18button");
// const lvl19button = document.getElementById("lvl19button");
// const lvl20button = document.getElementById("lvl20button");
// const lvl21button = document.getElementById("lvl21button");
// const lvl22button = document.getElementById("lvl22button");
// const lvl23button = document.getElementById("lvl23button");
// const lvl24button = document.getElementById("lvl24button");
// const lvl25button = document.getElementById("lvl25button");
// let colourmode = "light";
// let defaultcolour1 = "#d6d6d6";
// let defaultcolour2 = "#121212";
// let isTutorial = false;
// function disable(button){
//     button.style.transition = "opacity 0.2s ease, filter 0.2s ease";
//     button.style.cursor = "not-allowed";
//     button.style.opacity = "0.67";
//     button.style.filter = "grayscale(33%)";
// }
// function enable(button){
//     button.style.transition = "opacity 0.2s ease, filter 0.2s ease";
//     button.style.cursor = "pointer";
//     button.style.opacity = "";
//     button.style.filter = "";
// }

// if (sessionStorage.getItem("colourmode")==null) {
//     sessionStorage.setItem("colourmode",colourmode);
// }
// colourmode = sessionStorage.getItem("colourmode");
// if(colourmode == "dark"){
//     sessionStorage.setItem("colourmode", colourmode);
//     defaultcolour1 = "#121212";
//     defaultcolour2 = "#d6d6d6";
//     document.body.style.backgroundColor = defaultcolour1;     
//     welcometext.style.color = defaultcolour2;
//     welcometexttopborder.style.backgroundColor = defaultcolour2;
//     welcometextbottomborder.style.backgroundColor = defaultcolour2;
//     disable(darkbutton);
//     disable(darkbuttontab);
//     enable(lightbuttontab);
//     enable(lightbutton);
// }
// else {
//     colourmode = "light";
//     sessionStorage.setItem("colourmode", colourmode);
//     defaultcolour1 = "#d6d6d6";
//     defaultcolour2 = "#121212";
//     document.body.style.backgroundColor = defaultcolour1;
//     welcometext.style.color = defaultcolour2;
//     welcometexttopborder.style.backgroundColor = defaultcolour2;
//     welcometextbottomborder.style.backgroundColor = defaultcolour2;
//     disable(lightbutton);
//     disable(lightbuttontab);
//     enable(darkbutton);
//     enable(darkbuttontab);
// }
// tutorialbutton.addEventListener("click",() => {
//     if(isTutorial == false){
//         isTutorial = true;
//         tutorial.style.display = "flex";
//     }
//     else{
//         isTutorial = false;
//         tutorial.style.display = "none";
//     }
//     // tutorial.style.position = "absolute";
// });
// tutorialbuttontab.addEventListener("click",() => {
//     if(isTutorial == false){
//         isTutorial = true;
//         tutorialtab .style.display = "flex";
//     }
//     else{
//         isTutorial = false;
//         tutorialtab.style.display = "none";
//     }
// });
// tutorialbutton.addEventListener("mouseleave",()=>{
//     if(isTutorial == true){
//         isTutorial = false;
//         tutorialtab.style.display = "none";
//         tutorial.style.display = "none";
//     }
// });
// tutorialbuttontab.addEventListener("mouseleave",()=>{
//     if(isTutorial == true){
//         isTutorial = false;
//         tutorialtab.style.display = "none";
//         tutorial.style.display = "none";
//     }
// });
// window.addEventListener("scroll",()=>{
//     if(isTutorial == true){
//         isTutorial = false;
//         tutorialtab.style.display = "none";
//         tutorial.style.display = "none";
//     }
// });
// window.addEventListener("touchstart",()=>{
//     if(isTutorial == true){
//         isTutorial = false;
//         tutorialtab.style.display = "none";
//         tutorial.style.display = "none";
//     }
// });
// window.addEventListener("resize",()=>{
//     if(isTutorial == true){
//         isTutorial = false;
//         tutorialtab.style.display = "none";
//         tutorial.style.display = "none";
//     }
// });
// lightbutton.addEventListener("click",() => {
//     if(colourmode == "dark"){
//         colourmode = "light";
//         sessionStorage.setItem("colourmode", colourmode);
//         defaultcolour1 = "#d6d6d6";
//         defaultcolour2 = "#121212";
//         document.body.style.backgroundColor = defaultcolour1;
//         welcometext.style.color = defaultcolour2;
//         welcometexttopborder.style.backgroundColor = defaultcolour2;
//         welcometextbottomborder.style.backgroundColor = defaultcolour2;
//         enable(darkbutton);
//         enable(darkbuttontab);
//         disable(lightbutton);
//         disable(lightbuttontab);
//     }
// });
// lightbuttontab.addEventListener("click",() => {
//     if(colourmode == "dark"){
//         colourmode = "light";
//         sessionStorage.setItem("colourmode", colourmode);
//         defaultcolour1 = "#d6d6d6";
//         defaultcolour2 = "#121212";
//         document.body.style.backgroundColor = defaultcolour1;
//         welcometext.style.color = defaultcolour2;
//         welcometexttopborder.style.backgroundColor = defaultcolour2;
//         welcometextbottomborder.style.backgroundColor = defaultcolour2;
//         enable(darkbutton);
//         enable(darkbuttontab);
//         disable(lightbutton);
//         disable(lightbuttontab);
//     }
// });
// darkbutton.addEventListener("click",() => {
//     if(colourmode == "light"){
//         colourmode = "dark";
//         sessionStorage.setItem("colourmode", colourmode);
//         defaultcolour1 = "#121212";
//         defaultcolour2 = "#d6d6d6";
//         document.body.style.backgroundColor = defaultcolour1;     
//         welcometext.style.color = defaultcolour2;
//         welcometexttopborder.style.backgroundColor = defaultcolour2;
//         welcometextbottomborder.style.backgroundColor = defaultcolour2;
//         disable(darkbutton);
//         disable(darkbuttontab);
//         enable(lightbuttontab);
//         enable(lightbutton);
//     }
// });
// darkbuttontab.addEventListener("click",() => {
//     if(colourmode == "light"){
//         colourmode = "dark";
//         sessionStorage.setItem("colourmode", colourmode);
//         defaultcolour1 = "#121212";
//         defaultcolour2 = "#d6d6d6";
//         document.body.style.backgroundColor = defaultcolour1;     
//         welcometext.style.color = defaultcolour2;
//         welcometexttopborder.style.backgroundColor = defaultcolour2;
//         welcometextbottomborder.style.backgroundColor = defaultcolour2;
//         disable(darkbutton);
//         disable(darkbuttontab);
//         enable(lightbuttontab);
//         enable(lightbutton);  
//     }
// });
// lvl1button.addEventListener("click",()=>{
//     window.open("levels/level1/index.html", "_blank");
// });
// lvl2button.addEventListener("click",()=>{
//     window.open("levels/level2/index.html", "_blank");
// });
// lvl3button.addEventListener("click",()=>{
//     window.open("levels/level3/index.html", "_blank");
// });
// lvl4button.addEventListener("click",()=>{
//     window.open("levels/level4/index.html", "_blank");
// });
// lvl5button.addEventListener("click",()=>{
//     window.open("levels/level5/index.html", "_blank");
// });
// lvl6button.addEventListener("click",()=>{
//     window.open("levels/level6/index.html", "_blank");
// });
// lvl7button.addEventListener("click",()=>{
//     window.open("levels/level7/index.html", "_blank");
// });
// lvl8button.addEventListener("click",()=>{
//     window.open("levels/level8/index.html", "_blank");
// });
// lvl9button.addEventListener("click",()=>{
//     window.open("levels/level9/index.html", "_blank");
// });
// lvl10button.addEventListener("click",()=>{
//     window.open("levels/level10/index.html", "_blank");
// });
// lvl11button.addEventListener("click",()=>{
//     window.open("levels/level11/index.html", "_blank");
// });
// lvl12button.addEventListener("click",()=>{
//     window.open("levels/level12/index.html", "_blank");
// });
// lvl13button.addEventListener("click",()=>{
//     window.open("levels/level13/index.html", "_blank");
// });
// lvl14button.addEventListener("click",()=>{
//     window.open("levels/level14/index.html", "_blank");
// });
// lvl15button.addEventListener("click",()=>{
//     window.open("levels/level15/index.html", "_blank");
// });
// lvl16button.addEventListener("click",()=>{
//     window.open("levels/level16/index.html", "_blank");
// });
// lvl17button.addEventListener("click",()=>{
//     window.open("levels/level17/index.html", "_blank");
// });
// lvl18button.addEventListener("click",()=>{
//     window.open("levels/level18/index.html", "_blank");
// });
// lvl19button.addEventListener("click",()=>{
//     window.open("levels/level19/index.html", "_blank");
// });
// lvl20button.addEventListener("click",()=>{
//     window.open("levels/level20/index.html", "_blank");
// });
// lvl21button.addEventListener("click",()=>{
//     window.open("levels/level21/index.html", "_blank");
// });
// lvl22button.addEventListener("click",()=>{
//     window.open("levels/level22/index.html", "_blank");
// });
// lvl23button.addEventListener("click",()=>{
//     window.open("levels/level23/index.html", "_blank");
// });
// lvl24button.addEventListener("click",()=>{
//     window.open("levels/level24/index.html", "_blank");
// });
// lvl25button.addEventListener("click",()=>{
//     window.open("levels/level25/index.html", "_blank");
// });
const tutorialbutton = document.getElementById("tutorialbutton");
const lightbutton = document.getElementById("lightbutton");
const darkbutton = document.getElementById("darkbutton");
const tutorialbuttontab = document.getElementById("tutorialbuttontab");
const lightbuttontab = document.getElementById("lightbuttontab");
const darkbuttontab = document.getElementById("darkbuttontab");
const welcometext = document.getElementById("welcometext");
const welcometexttopborder = document.getElementById("welcometexttopborder");
const welcometextbottomborder = document.getElementById("welcometextbottomborder");
const tutorial = document.getElementById("tutorial");
const tutorialtab = document.getElementById("tutorialtab");
const lvl1button = document.getElementById("lvl1button");
const lvl2button = document.getElementById("lvl2button");
const lvl3button = document.getElementById("lvl3button");
const lvl4button = document.getElementById("lvl4button");
const lvl5button = document.getElementById("lvl5button");
const lvl6button = document.getElementById("lvl6button");
const lvl7button = document.getElementById("lvl7button");
const lvl8button = document.getElementById("lvl8button");
const lvl9button = document.getElementById("lvl9button");
const lvl10button = document.getElementById("lvl10button");
const lvl11button = document.getElementById("lvl11button");
const lvl12button = document.getElementById("lvl12button");
const lvl13button = document.getElementById("lvl13button");
const lvl14button = document.getElementById("lvl14button");
const lvl15button = document.getElementById("lvl15button");
const lvl16button = document.getElementById("lvl16button");
const lvl17button = document.getElementById("lvl17button");
const lvl18button = document.getElementById("lvl18button");
const lvl19button = document.getElementById("lvl19button");
const lvl20button = document.getElementById("lvl20button");
const lvl21button = document.getElementById("lvl21button");
const lvl22button = document.getElementById("lvl22button");
const lvl23button = document.getElementById("lvl23button");
const lvl24button = document.getElementById("lvl24button");
const lvl25button = document.getElementById("lvl25button");
let colourmode = "light";
let defaultcolour1 = "#d6d6d6";
let defaultcolour2 = "#121212";
let isTutorial = false;
function disable(button){
    button.style.transition = "opacity 0.2s ease, filter 0.2s ease";
    button.style.cursor = "not-allowed";
    button.style.opacity = "0.67";
    button.style.filter = "grayscale(33%)";
}
function enable(button){
    button.style.transition = "opacity 0.2s ease, filter 0.2s ease";
    button.style.cursor = "pointer";
    button.style.opacity = "";
    button.style.filter = "";
}

if (sessionStorage.getItem("colourmode")==null) {
    sessionStorage.setItem("colourmode",colourmode);
}
colourmode = sessionStorage.getItem("colourmode");
if(colourmode == "dark"){
    sessionStorage.setItem("colourmode", colourmode);
    defaultcolour1 = "#121212";
    defaultcolour2 = "#d6d6d6";
    document.body.style.backgroundColor = defaultcolour1;     
    welcometext.style.color = defaultcolour2;
    welcometexttopborder.style.backgroundColor = defaultcolour2;
    welcometextbottomborder.style.backgroundColor = defaultcolour2;
    disable(darkbutton);
    disable(darkbuttontab);
    enable(lightbuttontab);
    enable(lightbutton);
}
else {
    colourmode = "light";
    sessionStorage.setItem("colourmode", colourmode);
    defaultcolour1 = "#d6d6d6";
    defaultcolour2 = "#121212";
    document.body.style.backgroundColor = defaultcolour1;
    welcometext.style.color = defaultcolour2;
    welcometexttopborder.style.backgroundColor = defaultcolour2;
    welcometextbottomborder.style.backgroundColor = defaultcolour2;
    disable(lightbutton);
    disable(lightbuttontab);
    enable(darkbutton);
    enable(darkbuttontab);
}
tutorialbutton.addEventListener("click",() => {
    if(isTutorial == false){
        isTutorial = true;
        tutorial.style.display = "flex";
    }
    else{
        isTutorial = false;

        tutorialtab.style.display = "none";
        tutorial.style.display = "none";
    }
    // tutorial.style.position = "absolute";
});
tutorialbuttontab.addEventListener("click",() => {
    if(isTutorial == false){
        isTutorial = true;
        tutorialtab .style.display = "flex";
    }
    else{
        isTutorial = false;
        tutorial.style.display = "none";
        tutorialtab.style.display = "none";
    }
});
tutorialbutton.addEventListener("mouseleave",()=>{
    if(isTutorial == true){
        isTutorial = false;
        tutorialtab.style.display = "none";
        tutorial.style.display = "none";
    }
});
tutorialbuttontab.addEventListener("mouseleave",()=>{
    if(isTutorial == true){
        isTutorial = false;
        tutorialtab.style.display = "none";
        tutorial.style.display = "none";
    }
});
window.addEventListener("scroll",()=>{
    if(isTutorial == true){
        isTutorial = false;
        tutorialtab.style.display = "none";
        tutorial.style.display = "none";
    }
});
tutorialbutton.addEventListener("touchstart",(event)=>{
    event.stopPropagation();
});
tutorialbuttontab.addEventListener("touchstart",(event)=>{
    event.stopPropagation();
});
window.addEventListener("touchstart",(event)=>{
    if(isTutorial == true){
        isTutorial = false;
        tutorialtab.style.display = "none";
        tutorial.style.display = "none";
    }
});
window.addEventListener("resize",()=>{
    if(isTutorial == true){
        isTutorial = false;
        tutorialtab.style.display = "none";
        tutorial.style.display = "none";
    }
});
lightbutton.addEventListener("click",() => {
    if(colourmode == "dark"){
        colourmode = "light";
        sessionStorage.setItem("colourmode", colourmode);
        defaultcolour1 = "#d6d6d6";
        defaultcolour2 = "#121212";
        document.body.style.backgroundColor = defaultcolour1;
        welcometext.style.color = defaultcolour2;
        welcometexttopborder.style.backgroundColor = defaultcolour2;
        welcometextbottomborder.style.backgroundColor = defaultcolour2;
        setTimeout(()=>{
            enable(darkbutton);
            enable(darkbuttontab);
            disable(lightbutton);
            disable(lightbuttontab);
        }, 50);
    }
});
lightbuttontab.addEventListener("click",() => {
    if(colourmode == "dark"){
        colourmode = "light";
        sessionStorage.setItem("colourmode", colourmode);
        defaultcolour1 = "#d6d6d6";
        defaultcolour2 = "#121212";
        document.body.style.backgroundColor = defaultcolour1;
        welcometext.style.color = defaultcolour2;
        welcometexttopborder.style.backgroundColor = defaultcolour2;
        welcometextbottomborder.style.backgroundColor = defaultcolour2;
        enable(darkbutton);
        enable(darkbuttontab);
        disable(lightbutton);
        disable(lightbuttontab);
    }
});
darkbutton.addEventListener("click",() => {
    if(colourmode == "light"){
        colourmode = "dark";
        sessionStorage.setItem("colourmode", colourmode);
        defaultcolour1 = "#121212";
        defaultcolour2 = "#d6d6d6";
        document.body.style.backgroundColor = defaultcolour1;     
        welcometext.style.color = defaultcolour2;
        welcometexttopborder.style.backgroundColor = defaultcolour2;
        welcometextbottomborder.style.backgroundColor = defaultcolour2;
        setTimeout(() => {
            disable(darkbutton);
            disable(darkbuttontab);
            enable(lightbuttontab);
            enable(lightbutton);
        }, 50);
    }
});
darkbuttontab.addEventListener("click",() => {
    if(colourmode == "light"){
        colourmode = "dark";
        sessionStorage.setItem("colourmode", colourmode);
        defaultcolour1 = "#121212";
        defaultcolour2 = "#d6d6d6";
        document.body.style.backgroundColor = defaultcolour1;     
        welcometext.style.color = defaultcolour2;
        welcometexttopborder.style.backgroundColor = defaultcolour2;
        welcometextbottomborder.style.backgroundColor = defaultcolour2;
        disable(darkbutton);
        disable(darkbuttontab);
        enable(lightbuttontab);
        enable(lightbutton);  
    }
});
lvl1button.addEventListener("click",()=>{
    window.open("levels/level1/index.html", "_blank");
});
lvl2button.addEventListener("click",()=>{
    window.open("levels/level2/index.html", "_blank");
});
lvl3button.addEventListener("click",()=>{
    window.open("levels/level3/index.html", "_blank");
});
lvl4button.addEventListener("click",()=>{
    window.open("levels/level4/index.html", "_blank");
});
lvl5button.addEventListener("click",()=>{
    window.open("levels/level5/index.html", "_blank");
});
lvl6button.addEventListener("click",()=>{
    window.open("levels/level6/index.html", "_blank");
});
lvl7button.addEventListener("click",()=>{
    window.open("levels/level7/index.html", "_blank");
});
lvl8button.addEventListener("click",()=>{
    window.open("levels/level8/index.html", "_blank");
});
lvl9button.addEventListener("click",()=>{
    window.open("levels/level9/index.html", "_blank");
});
lvl10button.addEventListener("click",()=>{
    window.open("levels/level10/index.html", "_blank");
});
lvl11button.addEventListener("click",()=>{
    window.open("levels/level11/index.html", "_blank");
});
lvl12button.addEventListener("click",()=>{
    window.open("levels/level12/index.html", "_blank");
});
lvl13button.addEventListener("click",()=>{
    window.open("levels/level13/index.html", "_blank");
});
lvl14button.addEventListener("click",()=>{
    window.open("levels/level14/index.html", "_blank");
});
lvl15button.addEventListener("click",()=>{
    window.open("levels/level15/index.html", "_blank");
});
lvl16button.addEventListener("click",()=>{
    window.open("levels/level16/index.html", "_blank");
});
lvl17button.addEventListener("click",()=>{
    window.open("levels/level17/index.html", "_blank");
});
lvl18button.addEventListener("click",()=>{
    window.open("levels/level18/index.html", "_blank");
});
lvl19button.addEventListener("click",()=>{
    window.open("levels/level19/index.html", "_blank");
});
lvl20button.addEventListener("click",()=>{
    window.open("levels/level20/index.html", "_blank");
});
lvl21button.addEventListener("click",()=>{
    window.open("levels/level21/index.html", "_blank");
});
lvl22button.addEventListener("click",()=>{
    window.open("levels/level22/index.html", "_blank");
});
lvl23button.addEventListener("click",()=>{
    window.open("levels/level23/index.html", "_blank");
});
lvl24button.addEventListener("click",()=>{
    window.open("levels/level24/index.html", "_blank");
});
lvl25button.addEventListener("click",()=>{
    window.open("levels/level25/index.html", "_blank");
});
