// JavaScript Document
// Function to validate Form data
		function validateForm() {
			var elements = document.getElementsByName("stake");
			var valid1 = document.getElementById("valid-feedback1");	// To show if input is valid for player 1's bet
			var invalid1 = document.getElementById("invalid-feedback1");// To show if input is invalid for player 1's bet
			var valid2 = document.getElementById("valid-feedback2");// To show if input is valid for player 2's bet
			var invalid2 = document.getElementById("invalid-feedback2");// To show if input is invalid for player 2's bet
			var validForm = false;	// A boolean to check if form is valid / invalid
			for(var i = 0; i < elements.length; i++) {	// Check all forms data by looping
			if(elements[i].value >= 50) {	// If player has made bet >= 50 then valid bet
				elements[i].style.border = "1px solid #28A745";	// Give green border color
				if(i == 0) {	// If player 1's bet is valid
				valid1.style.display = 'block';	// Show that input is valid
				invalid1.style.display = 'none';// Hide that input is invalid
				}
				else {	// If player 2's bet is valid
					valid2.style.display = 'block';// Show that input is valid
					invalid2.style.display = 'none';	//Hide that input is invalid
				}
			}
			else {	// If player has made bet less than 50, then invalid bet
				elements[i].style.border = "1px solid #FF0000";	// Add red border color
				if(i == 0) {	// If player 1's bet is invalid
				invalid1.style.display = 'block';	// Show that input is invalid
				valid1.style.display = 'none';	// Hide that input in valid
				}
				else {	// If player 2' bet is invalid
					invalid2.style.display = 'block';	// Show that input is invalid	
					valid2.style.display = 'none';	// Hide that input is valid
				}
			}
		}
		if(valid1.style.display == 'block' && valid2.style.display == 'block') { // If both players bet is valid
			var p1Stake = document.getElementById("p1Stake").value;	// Get player 1's bet amount
			var p2Stake = document.getElementById("p2Stake").value;	// Get player 2's bet amount
			console.log("p1Stake "+p1Stake + " p2Stake" + p2Stake);
			document.getElementById("versusPlayer").style.display = "none";	// hide versus player div
			document.getElementById("PvP").style.display = "block";	// show the player vs player gaming area
			document.getElementById("p1Bet").innerHTML = p1Stake;	// show the Player 1's bet
			document.getElementById("p2Bet").innerHTML = p2Stake;	// show the Player 1's bet
		}	
		}
	
		var chance = 1;
		var p1Score = document.getElementById("p1-score");	// to display player 1's score
		var p2Score = document.getElementById("p2-score");	// to display player 2's score
		var gameOver = false;	// Variable to know whether game is over or not
		var diceValue1 = document.getElementById("diceValue1");	// to display 1st dice values
		var diceValue2 = document.getElementById("diceValue2");	// to display 2nd dice values
		var audio = document.getElementById("myAudio");	// var to handle cup shaking audio
		
		// Function to display response received from rolling dice
		function response(res) {
			if(chance == 1) {
				var score = parseInt(p1Score.innerHTML); // Get score of player 1
				p1Score.innerHTML = score + res[0] + res[1];	// Add the two dice values to score of Player 1
				diceValue1.innerHTML = res[0] + ", " + res[1];	// Display the values of both dice separated by comma
			}
			else {
				var score = parseInt(p2Score.innerHTML);	// Get score of player 2
				p2Score.innerHTML = score + res[0] + res[1]; // Add the two dice values to score of Player 2
				diceValue2.innerHTML = res[0] + ", " + res[1];	// Display the values of both dice separater by comma
			}
			checkWinner();	// Check if anyone has won the game
		}
		
		// Function to call rolling dice animation
		function rollDiceWithoutValues() {
			if(parseInt(p1Score.innerHTML) < 50 && parseInt(p2Score.innerHTML) < 50) {
				if(gameOver) { chance = 1; return ;}
			var toggleChance = chance;
			var element = document.getElementById('dice-box1');
			animateCSS('#dice-box1', 'fadeInUp');
			const numberOfDice = +document.getElementById('number1').value;
			const options = {
			element, // element to display the animated dice in.
			numberOfDice, // number of dice to use 
			callback: response // callback to function response
			}
			rollADie(options);
			
			if(chance == 1) {	// If player 1's turn is over change it to player 2's turn
				chance = 2;
				showToast(2);	//show popup for 2nd Player's turn
			}
			else {	// If Player 2's turn is over change it to Player 1's turn.
				chance = 1;
				showToast(1);	//show popup for 1st player's turn
			}	
			}
		}
		
		// Function to check winner
		function checkWinner() {
			if(parseInt(p1Score.innerHTML) >= 50) {	//	If Player 1's score is greater than 50 player1 wins
				gameOver = true;	// Game is over
				console.log("winner is p1");
				displayWinner("p1");	//	Update and display Player 1 in winning popup
			}
			if(parseInt(p2Score.innerHTML) >= 50) { //	If Player 1's score is greater than 50 player1 wins
				console.log("winner is p2");	
				gameOver = true;	// Game is over
				displayWinner("p2");	// Update and display Player 2 in winning popup
			}
		}
		
		// Function to display the losing player on pressing quit
		function playerToLoseOnQuit() {
			if(chance == 1) {	// If Player 1 is currently playing and quit button is pressed Player 1 will lose.
				document.getElementById('player').innerHTML = "Player 1";	// Display Losing Player in the Confirm quit popup
			}
			else {	// If Player 2 is currently playing and quit button is pressed Player 2 will lose.
				document.getElementById('player').innerHTML = "Player 2";	// Display Losing player in the Confirm quit popup
			}
		}
		
		// Function to roll Dice and play audio of shaking cup
		function rollDiceFromCup() {
			if(gameOver) { audio.pause(); chance = 1; return ;}	// If game is over, then stop playing the audio and reset the playing chance to Player 1's turn and exit from the function.
			if(chance == 1) {	// If Player 1 is playing, hide the Popup displaying Player 1's turn
				hideToast(1);
			}
			else {	// If Player 2 is playing, hide the Popup displaying Player 2's turn
				hideToast(2);
			}
			audio.currentTime = 0;	// Rewind audio timing to start
			audio.play();	// Play the cup shaking audio
			animateCSS('#animated-cup', 'tada', window.setTimeout(rollDiceWithoutValues, 1500));	// Animate the shaking cup and after animation is finished, call the rollDiceWithout Values function
		}
		
		// Function to add animation
		function animateCSS(element, animationName, callback) {
			const node = document.querySelector(element);
			node.classList.add('animated', animationName);

			function handleAnimationEnd() {	// Code to run on animation end
				node.classList.remove('animated', animationName)	// remove animated class from cup
				node.removeEventListener('animationend', handleAnimationEnd)	// remove event listener from cup
				audio.pause();	// Pause the cup shaking audio
				if (typeof callback === 'function') callback	// if last argument is function the call the function
			}
			window.setInterval(1000);
			node.addEventListener('animationend', handleAnimationEnd)	// Add event listener to cup
		}
		
		// Function to display Winner
		function displayWinner(winner) {
			document.getElementById("winnerModal").style.display = "block";	// Show winning popup
			if(winner == "p1") {	// If winner is Player 1, then show the bet points won from player 2
			document.getElementById("betPoints").innerHTML = document.getElementById("p2Bet").innerHTML;	// Display the Player 2's betting points on the winning popup
			document.getElementById("winnerPlayer").innerHTML = "Player 1";	// Set winner as Player 1 in popup
			}
			else {	// If winner is Player 2, then show the bet points won from Player 1
				document.getElementById("betPoints").innerHTML = document.getElementById("p1Bet").innerHTML; // Display the Player 1's betting points on the winning popup
				document.getElementById("winnerPlayer").innerHTML = "Player 2"; // Set winner as Player 2 in popup
			}
			
		}
		
		// Function to hide winning popup
		function closeModal() {
			document.getElementById("winnerModal").style.display = "none";
		}

		// Function to display popup of Player's turn
		function showToast(playerChance) {
			console.log("p "+ playerChance);
			if(playerChance == 1)	// If its player 1's turn then show a popup to player 1
			$('#player1Chance').toast('show');
			
			else 
				$('#player2Chance').toast('show');	// If its player 2's turn then show a popup to player 2
		}

		// Function to hide popup of Player's turn
		function hideToast(playerChance) {
			if(playerChance == 1) {	// Hide the popup of Player 1
				$('#player1Chance').toast('hide');
			}
			else {	// hide popup of player 2
				$('#player2Chance').toast('hide');				
			}
		}