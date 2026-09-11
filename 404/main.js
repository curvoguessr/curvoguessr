let colourmode = "light";
if (localStorage.getItem("colourmode")==null) {
    localStorage.setItem("colourmode",colourmode);
}
colourmode = localStorage.getItem("colourmode");
const imglight = document.getElementById("fofimagelight");
const imgdark = document.getElementById("fofimagedark");
const foftext = document.getElementById("fof");
const notfoundtext = document.getElementById("notfound");
const text = document.getElementById("text");
const button = document.getElementById("homebutton");
if(colourmode == "light"){
    document.body.style.backgroundColor = "#D6F4FF";
    imglight.style.display = "block";
    imgdark.style.display = "none";
    foftext.style.background = "linear-gradient(90deg, #5a9ae5, #542aae)";
    foftext.style.backgroundClip = "text";
    foftext.style.webkitBackgroundClip = "text";
    foftext.style.color = "transparent";
    foftext.style.webkitTextFillColor = "transparent";
    button.style.color = "#ffffff";
    button.style.background = "radial-gradient(circle at 50% 50%, #5a9ae5, #542aae)";
    notfoundtext.style.color = "#000000";
    text.style.color = "#000000";
}
else{
    document.body.style.backgroundColor = "#120052";
    imglight.style.display = "none";
    imgdark.style.display = "block";
    foftext.style.background = "linear-gradient(90deg, #542aae, #5a9ae5)";
    foftext.style.backgroundClip = "text";
    foftext.style.webkitBackgroundClip = "text";
    foftext.style.color = "transparent";
    button.style.color = "#ffffff";
    button.style.background = "radial-gradient(circle at 50% 50%, #5a9ae5, #542aae)";
    notfoundtext.style.color = "#ffffff";
    text.style.color = "#ffffff";
}
window.addEventListener("storage",()=>{
    if(colourmode !== localStorage.getItem("colourmode")){
        location.reload();
    }
});
button.addEventListener("click",()=>{
    window.location.href = "index.html";
});