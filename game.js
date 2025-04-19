// Get a reference to the canvas
// Leave it as a global
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// This removes a delay in wav playback
// I don't know why
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

// Load a wav
const zapSound = new Audio('laser.wav');
zapSound.load();

// Load a sprite
const testSprite = new Image();
testSprite.src = "testSprite.png";

// Set up a function to check if a key is down
var keys = {};

window.addEventListener("keydown", (event) => {
    keys[event.code] = true;
});

window.addEventListener("keyup", (event) => {
    keys[event.code] = false;
});

function isKeyPressed(keyCode) {
    return !!keys[keyCode]; // Convert undefined to false
}

// Set up some globals, mx and my, that always contain the mouse location within the canvas
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

var mx = 0;
var my = 0;

canvas.addEventListener('mousemove', function (evt) {
    var mousePos = getMousePos(canvas, evt);
    mx = mousePos.x;
    my = mousePos.y;
}, false);


// Keep a list of sprite locations
var sprites = [];

// Main game Loop
function animate() {
    // Clear the background
    ctx.clearRect(0, 0, 640, 480);

    // Draw a circle at the mouse
    ctx.beginPath();
    ctx.arc(mx, my, 4, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();

    // Press space, create a sprite
    if (isKeyPressed("Space")) {
        sprites.push({x:mx, y:my});
        zapSound.play();
    }

    // Draw all the sprites
    sprites.forEach(function (s) {
        ctx.drawImage(testSprite,s.x,s.y);
    });

    // Next frame
    requestAnimationFrame(animate);
}
animate();
