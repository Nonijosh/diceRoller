// JavaScript Document
var chance = 1;	// chace 1 means Player 1's turn, chance 2 means Computer's turn
		var p1Score = document.getElementById("p1-score");	// To access current score of Player 1
		var computerScore = document.getElementById("computer-score");	// To access current score of Computer
		var gameOver = false;	// Variable to check game is over or not
		var diceValue1 = document.getElementById("diceValue1");	// to display 1st dice values
		var diceValue2 = document.getElementById("diceValue2");	// to display 2nd dice values
		var audio = document.getElementById("myAudio");	// var to handle cup shaking audio
		function response(res) {
			// returns an array of the values from the dice
			console.log(res);
			if(chance == 1) {
				var score = parseInt(p1Score.innerHTML);	// Get score of player 1
				p1Score.innerHTML = score + res[0] + res[1];	// Add the two dice values to score of Player 1
				diceValue1.innerHTML = res[0] + ", " + res[1];	// Display the values of both dice separated by comma
			}
			else {
				var score = parseInt(computerScore.innerHTML);	// Get score of computer
				computerScore.innerHTML = score + res[0] + res[1];	// Add the two dice values to Computer's score
				diceValue2.innerHTML = res[0] + ", " + res[1];	// Display the values of both dice separated by comma
			}
			checkWinner();	// Check if anyone has won the game
		}

		// Function to call rolling dice animation
		function rollDiceWithoutValues() {
			if(parseInt(p1Score.innerHTML) < 50 && parseInt(computerScore.innerHTML) < 50) {	// If Player 1 or Computer has more than 50 scores
			if(gameOver) { chance = 1; return ;}	// If game is over set turn to Player 1's turn and exit game
			var toggleChance = chance;
			
			var element = document.getElementById('dice-box1');	// div to display dice
			animateCSS('#dice-box1', 'fadeInUp');	// Animate dice to fade and go up
			const numberOfDice = +document.getElementById('number1').value;	// The number of dice to roll
			const options = {
			element, // element to display the animated dice in.
			numberOfDice, // number of dice to use 
			callback: response	// callback to function response
			}
			rollADie(options);
			
			if(chance == 1) {	// If player 1's turn is over change it to player 2's turn
				chance = 2;	// Set chance equal to 2 for comuter's turn
				window.setTimeout(rollDiceFromCup, 2000);	// Function to roll dice for computer
			}
			else {
				chance = 1;	// Set chance to 1 for Player 1's turn
				showToast(1);	//show popup for 1st Player's turn
			}
			}
		}
		
		// Function to check winner
		function checkWinner() {
			var modal = document.getElementById("winnerModal");	// var to handle winning popup
			var winnerPlayer = document.getElementById("winnerPlayer");	// var to display winning player in winning popup
			var winningMessage = document.getElementById("winningMessage"); // var to display winner message in winning popup
			if(parseInt(p1Score.innerHTML) >= 50) {	//	If Player 1's score is greater than 50 player1 wins
				gameOver = true;	// Game is over
				modal.style.display = "block";	// Show winning popup
				winnerPlayer.innerHTML = "Congratulations Player 1";	// Display winning player in popup
				winningMessage.innerHTML = "You have won the game.";	// Display winning message in popup
				console.log("winner is p1");
			}
			if(parseInt(computerScore.innerHTML) >= 50) { //	If computer's score is greater than 50 player1 wins
				gameOver = true;	// Game is over
				modal.style.display = "block";	// Show winning popup
				winnerPlayer.innerHTML = "You lose.";	// Display losing player in popup
				winningMessage.innerHTML = "Try again some time.";	// Display losing message in popup
				console.log("winner is Computer");
			}
		}
		
		// Add Animation to elements
		function animateCSS(element, animationName, callback) {
			const node = document.querySelector(element);
			node.classList.add('animated', animationName);

			function handleAnimationEnd() {	// Code to run on animation end
				node.classList.remove('animated', animationName)	// remove animated class from cup
				node.removeEventListener('animationend', handleAnimationEnd)	// remove event listener from cup
				audio.pause();	// Pause the cup shaking audio
				if (typeof callback === 'function') window.setTimeout(callback, 2000);	// if last argument is function the call the function
			}
			window.setInterval(1000);
			node.addEventListener('animationend', handleAnimationEnd)	// Add event listener to cup
		}

		// Function to hide winning popup
		function closeModal() {
			document.getElementById("winnerModal").style.display = "none";
		}

		// Function to roll Dice and play audio of shaking cup
		function rollDiceFromCup() {
			if(gameOver) { audio.pause(); chance = 1; return ;}	// If game is over, then stop playing the audio and reset the playing chance to Player 1's turn and exit from the function.
			if(chance == 1) {	// If Player 1 is playing, hide the Popup displaying Player 1's turn
				hideToast(1);
			}
			audio.currentTime = 0;	// Rewind audio timing to start
			audio.play();	// Play the cup shaking audio
			animateCSS('#animated-cup', 'tada', window.setTimeout(rollDiceWithoutValues, 1500));	// Animate the shaking cup and after animation is finished, call the rollDiceWithout Values function
		}

		// Function to display popup of Player's turn
		function showToast(playerChance) {
			console.log("p "+ playerChance);
			if(playerChance == 1)	// If its player 1's turn then show a popup to player 1
			$('#player1Chance').toast('show');
		}

		// Function to hide popup of Player's turn
		function hideToast(playerChance) {
			if(playerChance == 1) {	// Hide the popup of Player 1
				$('#player1Chance').toast('hide');
			}
		}