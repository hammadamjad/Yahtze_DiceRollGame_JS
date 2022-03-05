/*

	Yahtze Lite Program
	Allow player to roll 5 dice 3 times to get a large straight, which is
	1,2,3,4,5 or 2,3,4,5,6 
	Before each roll, the player can keep some die and roll only the rest.
	
	
*/

// variables used in program
var numberDice = 5;
var keeper = new Array(numberDice);
var dieValue = new Array(numberDice);

// current number of rolls by player
var rollNumber = 0;

// variables used to refer to page elements
var dieImages = new Array(numberDice);    // roll die img  
var messages;                             // "messages" paragraph
var gameOverMessage;                      // "gameOverMessage" paragraph
var playButton;                           // Play button
var rollButton;                           // Roll button
var diceRollingAudio 					   // audio clip for dice




// TO DO: complete this function
// ================================= 
// starts a new game when click Play
function startGame() {
	console.log("Entered startGame()");

	// initialize number of rolls; incremented in rollDice
	rollNumber = 0
	// prepare the GUI

	// roll the dice to start the game
	rollDice()

	// disabling play button and enabling roll button.
	document.getElementById("playButton").disabled = true;
	//removing hover effect
	document.getElementById("playButton").classList.remove("Hover")
	document.getElementById("rollButton").disabled = false;
	//enabling hover
	document.getElementById("rollButton").classList.add("Hover")

} // end function startGame


// TO DO: complete this function
// ==========================================================
// roll the dice
// this is called by startGame and it is the Roll button event listener
function rollDice() {
	console.log("rollDice: entered");

	// increment the number times dice rolled
	rollNumber += 1

	// roll the dice
	showDice()

	// set each die with dieValue[ i ] = Math.floor(1 + Math.random() * 6);
	for (var i = 0; i < 5; i++) {
		// only change value for those dices whose keeper value is false.
		if (keeper[i].disabled === false) {
			dieValue[i] = Math.floor(Math.random() * (5 - 1 + 1)) + 1
		}
	}

	// play dice rolling sound 
	diceRollingAudio.play(); 

	// modify the messages innerHTML based on the results
	// there are 3 options: win, lose, keep rolling
	// AND take appropriate action

	if (rollNumber === 10) {
		// enabling play button so the game can be replayed again.
		document.getElementById("playButton").disabled = false;
		document.getElementById("playButton").classList.add("Hover")
		document.getElementById("rollButton").disabled = true;
		document.getElementById("rollButton").classList.remove("Hover")
		// calling gameover() function as all chances are availed.
		gameOver()
		// checking if straight dices or not.
		if (checkLargeStraight() === false) {
			gameOverMessage.innerHTML = "You Lose!!!"
		} else if (checkLargeStraight() === true) {
			gameOverMessage.innerHTML = "You Won!!!"
		}
	}
	//if chances left, then keep rolling.
	else {
		messages.innerHTML = "Keep Playing, "+(10-rollNumber)+" chances are left";
	}

} // end function rollDice


// TO DO: complete this function
// =========================== 
// check for a large straight
// 1,2,3,4,5  and ss2 to 2,3,4,5,6
// Use sort array method 
// Tip: don't rearrange the dice!

function checkLargeStraight() {

	console.log("checkLargeStraight: entered");

	// variables for 2 possible large straights all initialized to true
	// ss1 corresponds to 1,2,3,4,5  and ss2 to 2,3,4,5,6
	var ss1 = [1, 2, 3, 4, 5]
	var ss2 = [2, 3, 4, 5, 6]

	// copy values so original not changed
	var D_values = dieValue

	// sort die values
	D_values = D_values.sort()

	// check if there is a small straight
	// values are 1,2,3,4,5 or 2,3,4,5,6
	var isMatch
	if (D_values === ss1 || D_values === ss2) {
		isMatch = true
	}
	else {
		isMatch = false
	}

	// return result
	// true is winner and false is not winner (lose or continue)
	return isMatch
}

// TO DO: complete this function
// ====================================
// send game over message using a special font and/or color
// reset the Play and Roll buttons
// (no need to reset the keepers; player might want to see current state)
function gameOver() {
	console.log("gameOver: entered");
	var div = document.getElementById('gameOverMessage');
	div.innerHTML = "Game is over"

}


// No changes needed to this function
// ============================ 
// comparison function for use with sort
function compareIntegers(value1, value2) {
	return parseInt(value1) - parseInt(value2);
} // end function compareIntegers    



//  No changes needed to this function
// ============================ 
// display rolled dice
function showDice() {
	console.log("showDice: entered");
	for (var i = 0; i < numberDice; ++i) {
		setImage(dieImages[i], dieValue[i]);
	}

} // end function showDice



// No changes needed to this function
// ============================ 
// set image source for a die
function setImage(dieImages, dieValue) {
	if (isFinite(dieValue))
		dieImages.src = "die" + dieValue + ".png";
	else
		dieImages.src = "blank.png";
} // end function setImage


// No changes needed to this function
function updateKeeper() {
	console.log("updateKeeper: disabled? =", this.disabled);
	if (rollNumber >= 1) {
		this.disabled = true;
		this.classList.remove("Hover")
		this.value = "keeper";
	};
}


// No changes needed to this function - Be sure to understand this code. 
// ================================ 
// load event -- event handler
// get page elements to interact with and register event listeners 
function start() {
	console.log("start: entered");

	// page elements and event listeners associated with them
	playButton = document.getElementById("playButton");
	playButton.addEventListener("click", startGame, false);

	rollButton = document.getElementById("rollButton");
	rollButton.addEventListener("click", rollDice, false);

	diceRollingAudio = document.getElementById("diceRollingAudio");
	// once audio ended, show dice
	diceRollingAudio.addEventListener("ended", showDice, false);

	messages = document.getElementById("messages");
	gameOverMessage = document.getElementById("gameOverMessage");

	for (var i = 0; i < numberDice; ++i) {
		dieImages[i] = document.getElementById("die" + (i + 1));
	};

	// prepare the GUI
	rollButton.disabled = true; // disable rollButton
	playButton.disabled = false;  // enable play button

	// set image to blank before games start
	for (var i = 0; i < numberDice; ++i) {
		setImage(dieImages[i]);
	};

	// extract page element for keeper buttons
	// identify event handler
	// set disabled flag to roll all dice

	for (var i = 0; i < numberDice; ++i) {
		keeper[i] = document.getElementById("keeper" + (i + 1));
		keeper[i].disabled = false;
		keeper[i].addEventListener("click", updateKeeper);
	}


} // end function start

window.addEventListener("load", start, false);


