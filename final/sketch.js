let state = "menu";
let waitTime = 0;
let startTime;
let reactionTimes = [];
let maxTries = 5;
let tries = 0;
let readyToPress = false;

let showStartButton = true;
let showRestartButton = false;

function setup() {
createCanvas(600, 400);
textAlign(CENTER, CENTER);
textSize(24);
}

function draw() {
background(220);

if (state === "menu") {
fill(0);
text("Reaction Time Test", width / 2, height / 2 - 60);
text("Click START to begin", width / 2, height / 2 - 20);

drawButton("START", width / 2 - 70, height / 2 + 20, 140, 50);

drawButton("Tries: " + maxTries, width / 2 - 70, height / 2 + 90, 140, 40);
}

else if (state === "waiting") {
fill(0);
text("Wait for green...", width / 2, height / 2);
if (millis() > waitTime) {
state = "go";
startTime = millis();
readyToPress = true;
}
}

else if (state === "go") {
background(0, 255, 0);
fill(0);
text("PRESS!", width / 2, height / 2);
}

else if (state === "results") {
fill(0);
text("Average reaction time:", width / 2, height / 2 - 40);
let sum = reactionTimes.reduce((a, b) => a + b, 0);
let avg = nf(sum / reactionTimes.length, 1, 2);
text(`${avg} ms`, width / 2, height / 2);
text("Tries: " + reactionTimes.map(t => nf(t, 1, 0)).join(", "), width / 2, height / 2 + 50);

drawButton("RESTART", width / 2 - 70, height / 2 + 100, 140, 50);
}
}

function drawButton(label, x, y, w, h) {
fill(180);
rect(x, y, w, h, 10);
fill(0);
text(label, x + w / 2, y + h / 2);
}

function mousePressed() {
if (state === "menu") {
// Start button
if (mouseInside(width / 2 - 70, height / 2 + 20, 140, 50)) {
startGame();
}
// Toggle tries
if (mouseInside(width / 2 - 70, height / 2 + 90, 140, 40)) {
maxTries = maxTries === 5 ? 10 : 5;
}
}

if (state === "results") {
if (mouseInside(width / 2 - 70, height / 2 + 100, 140, 50)) {
resetGame();
}
}
}

function mouseInside(x, y, w, h) {
return mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
}

function keyPressed() {
if (state === "go" && readyToPress) {
let reaction = millis() - startTime;
reactionTimes.push(reaction);
tries++;
if (tries >= maxTries) {
state = "results";
} else {
nextTry();
}
} else if (state === "waiting") {
alert("Too soon! Wait for green!");
resetGame();
}
}

function startGame() {
tries = 0;
reactionTimes = [];
nextTry();
}

function nextTry() {
state = "waiting";
waitTime = millis() + random(1000, 3000);
readyToPress = false;
}

function resetGame() {
state = "menu";
tries = 0;
reactionTimes = [];
}