// Define variables
const canvas = document.getElementById("canvas");
const canvasWidth = canvas.clientWidth;
const canvasHeight = canvas.clientHeight;
const bingus = document.getElementById("bingus");
const step = 10;
const music = new Audio("./assets/music.m4a");
const start = document.getElementById("start");
var musicEnabled = false;

var bingusPos = {
    "top": 0,
    "left": 0,
}
if (localStorage.getItem("points") === null) {
    localStorage.setItem("points", 0)
}else{
    document.getElementById("points").textContent = "Tuna: " + localStorage.getItem("points")
}

// Event listeners
document.addEventListener("keydown", movement);
document.addEventListener("mousedown", ()=>{
    var click = new Audio("./assets/click.m4a");
    click.play();
    delete click;})
start.addEventListener("click", startGame);

// Functions
function startGame(){
    requestAnimationFrame(update);
    if(musicEnabled == false){
        music.loop = true
        music.play();
        musicEnabled = true;
    }
    start.style.display = "none";
    document.getElementById("arrow").style.display = "none";
}

function movement(e){
    e.preventDefault();
    if(e.which == 40){
        bingusPos.top += step;
    }else if(e.which == 38){
        bingusPos.top -= step;
    }else if(e.which == 39){
        bingusPos.left += step;
    }else if(e.which == 37){
        bingusPos.left -= step;
    }
}

function checkCollision() {
    if (bingusPos.left < 0) {
        bingusPos.left = 0;
    }
    if (bingusPos.top < 0) {
        bingusPos.top = 0;
    }
    if (bingusPos.left + bingus.clientWidth > canvasWidth) {
        bingusPos.left = canvasWidth - bingus.clientWidth;
    }
    if (bingusPos.top + bingus.clientHeight > canvasHeight) {
        bingusPos.top = canvasHeight - bingus.clientHeight;
    }
}

// Function to check collision with other elements
function checkElementCollision() {
    const elements = document.querySelectorAll('.element'); // Assuming other elements have a class 'element'
    elements.forEach(element => {
        const elementRect = element.getBoundingClientRect();
        const bingusRect = bingus.getBoundingClientRect();
        
        if (
            bingusRect.top < elementRect.bottom &&
            bingusRect.bottom > elementRect.top &&
            bingusRect.left < elementRect.right &&
            bingusRect.right > elementRect.left
        ) {
            element.style.top = Math.floor(Math.random() * 501);
            element.style.left = Math.floor(Math.random() * 501);
            localStorage.setItem("points", parseInt(localStorage.getItem("points"))+1)
        }
    });
}

function update(){
    checkCollision();
    checkElementCollision();
    bingus.style.top = bingusPos.top + "px";
    bingus.style.left = bingusPos.left + "px";
    document.getElementById("points").textContent = "Tuna: " + localStorage.getItem("points")
    requestAnimationFrame(update);
}

