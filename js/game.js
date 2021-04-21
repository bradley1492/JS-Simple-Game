// 1. Create the canvas

var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width= 512;
canvas.height= 480;
document.body.appendChild(canvas);

// 2. Include Images
// background image

var bgready = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgready = true;
};
bgImage.src = "images/background_space.png";

// Hero image

var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/spaceship.png";

// Monster image

var monsterReady = false;
var monsterImage = new Image ();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/enemy_six.png";

// 3. Define Game Objects
// movement in px per seconds

var hero = {
  speed: 256, 
	x : 0,
	y : 0
};

var monster = {
	x : 0,
	y : 0
};

var monstersCaught = 0;

// 4. Player Input
// handle keyboard controls

var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);
								 
// 5. Game Reset-Function

var reset = function (){
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;
	
// Throw the monster somewhere on the screen randomly

	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
};

// 6. Updating Objects

var update = function (modifier) {
	if (38 in keysDown) { // Player holding the up arrow-btn
	hero.y -= hero.speed * modifier;
	}
	if (40 in keysDown) { // Player holding the down-btn
	hero.y += hero.speed * modifier;
	}
	if (37 in keysDown) { // Player holding the left-btn
	hero.x -= hero.speed * modifier;
	} 
	if (39 in keysDown) { // Player holding the right-btn
	hero.x += hero.speed * modifier;
	}
	
	// Update Loop --> Looks to update if player and monster are touching eachother

	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	) {
		++monstersCaught;
		reset();
	}
};

// 7. Render Objects
// Draw all the stuff to the screen

var render = function () {
	if (bgready) {
		ctx.drawImage(bgImage, 0, 0);
	}
	
	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}
	
	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}

	// The score system

	ctx.fillStyle = 'white';

	ctx.font = "20px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Astronauts: " + monstersCaught, 48, 48);
};

// 8. Main Game Loop

var main = function() {
	var now = Date.now();
	var delta = now - then;
	
	update(delta / 1000);
	render();
	
	then = now;
	
	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main(); 
