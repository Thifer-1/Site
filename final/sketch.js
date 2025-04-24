let state = "menu";
let waitTime = 0;
let startTime;
let reactionTimes = [];
let maxTries = 5;
let tries = 0;
let showResult = false;
let readyToPress = false;

let startButton, restartButton, triesSelector;

function setup() {
createCanvas(600, 400);
textAlign(CENTER, CENTER);
textSize(24);

// Start button
startButton = createButton('Start Game');
startButton.position(20, height + 10);
startButton.mousePressed(startGame);

// Restart button
restartButton = createButton('Restart');
restartButton.position(140, height + 10);
restartButton.mousePressed(resetGame);
restartButton.hide();

// Selector: 5 or 10 tries
triesSelector = createSelect();
triesSelector.position(260, height + 10);
triesSelector.option('5 tries');
triesSelector.option('10 tries');
triesSelector.changed(() => {
maxTries = triesSelector.value() === '5 tries' ? 5 : 10;
});
}

function draw() {
background(220);

if (state === "menu") {
fill(0);
text("Reaction Time Test", width/2, height/2 - 40);
text("Press 'Start Game' to begin", width/2, height/2);
}

else if (state === "waiting") {
fill(0);
text("Wait for green...", width/2, height/2);
if (millis() > waitTime) {
state = "go";
startTime = millis();
background(0, 255, 0);
text("PRESS!", width/2, height/2);
readyToPress = true;
}
}

else if (state === "go") {
background(0, 255, 0);
fill(0);
text("PRESS!", width/2, height/2);
}

else if (state === "results") {
fill(0);
text("Average reaction time:", width/2, height/2 - 40);
let sum = reactionTimes.reduce((a, b) => a + b, 0);
let avg = nf(sum / reactionTimes.length, 1, 2);
text(`${avg} ms`, width/2, height/2);

text("All tries: " + reactionTimes.map(t => nf(t, 1, 0)).join(", "), width/2, height/2 + 60);
}
}

function startGame() {
reactionTimes = [];
tries = 0;
showResult = false;
startButton.hide();
triesSelector.hide();
restartButton.hide();
nextTry();
}

function nextTry() {
state = "waiting";
readyToPress = false;
waitTime = millis() + random(1000, 3000); // 1 to 3 sec
}

function keyPressed() {
if (state === "go" && readyToPress) {
let reaction = millis() - startTime;
reactionTimes.push(reaction);
tries++;
if (tries >= maxTries) {
state = "results";
restartButton.show();
} else {
nextTry();
}
}

// Якщо натиснув занадто рано
else if (state === "waiting") {
state = "menu";
startButton.show();
triesSelector.show();
restartButton.hide();
alert("Too soon! Don't press before green.");
}
}

function resetGame() {
state = "menu";
reactionTimes = [];
tries = 0;
startButton.show();
triesSelector.show();
restartButton.hide();
}