/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, gamePlaying;

// One dice case: dice number holders
// let prevDice0 = []
// let prevDice1 = []

init();



//Click event on roll button
document.querySelector(".btn-roll").addEventListener("click", function(){
    if (gamePlaying) {
        //random number 1-6
        var dice = Math.ceil(Math.random() * 6);

        //display dice img on each click
        let diceDOM = document.querySelector(".dice");
        diceDOM.style.display = "block";
        diceDOM.setAttribute("src", `dice-${dice}.png`);

        // Add 2nd dice 
        var dice2 = Math.ceil(Math.random() * 6);
        let diceDOM2 = document.querySelector("#dice2");
        diceDOM2.style.display = "block";
        diceDOM2.src = `dice-${dice2}.png`;

        //update round score if rolled num was not a 1
        if (dice !== 1 && dice2 !== 1) {

            // // implement if player rolls 6 twice for a single dice
            // if (activePlayer === 0) {
            // prevDice0.push(dice);
            //     if (prevDice0[prevDice0.length - 2] === 6 && dice === 6) {
            //         prevDice1 = []
            //         scores[activePlayer] = 0;
            //         document.querySelector("#score-" + activePlayer).textContent = "0";
            //         nextPlayer();  
            //     }
            // }
            // else if (activePlayer === 1) {
            //     prevDice1.push(dice);
            //     if (prevDice1[prevDice1.length - 2] === 6 && dice === 6) {
            //         prevDice0 = []  
            //         scores[activePlayer] = 0;
            //         document.querySelector("#score-" + activePlayer).textContent = "0";
            //         nextPlayer();    
            //     }
            // }

            //if both dices are 6(for two dices scenario)
            if (dice === 6 && dice2 === 6) {
                scores[activePlayer] = 0;
                document.querySelector("#score-" + activePlayer).textContent = "0";
                nextPlayer();
            }

            //add to roundSCore each time dice !== 1 and update UI
            roundScore += (dice + dice2);
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        } else {
        //Calls next player function
            nextPlayer();
        }

    }


});


document.querySelector(".btn-hold").addEventListener("click", function (){
    if (gamePlaying) {
        //Add current score to the global score
        scores[activePlayer] += roundScore;
        

        //update UI
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

        //set number to be winning score
        let setScore = document.getElementById("set-score").value;

        //Check if player won the game
        if (scores[activePlayer] >= setScore) {
            document.getElementById(`name-${activePlayer}`).textContent = "Winner!"
            document.querySelector(".dice").style.display = "none";
            document.querySelector("#dice2").style.display = "none";
            document.querySelector(`.player-${activePlayer}-panel`).classList.add("winner");
            document.querySelector(`.player-${activePlayer}-panel`).classList.remove("active");
            gamePlaying = false;

        } else {
            //Next player 
            nextPlayer();
        }
    }

});



    /*
    Else if dice num is 1:
    change player
    set roundScore to 0
    change those to UI
    red dot/player turn move to other player
    and hide/not displaying dice img
    */
function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; 
    roundScore = 0; 
    
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0"; 

    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    document.querySelector(".dice").style.display = "none";
    document.querySelector("#dice2").style.display = "none";
}


document.querySelector(".btn-new").addEventListener("click", init);


function init () {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    //Hide dices
    document.querySelector(".dice").style.display = "none";
    document.querySelector("#dice2").style.display = "none";
    //Scores to 0 at the start
    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById(`name-0`).textContent = "Player 1";
    document.getElementById(`name-1`).textContent = "Player 2";
    
    document.querySelector(`.player-0-panel`).classList.remove("winner");
    document.querySelector(`.player-1-panel`).classList.remove("winner");
    document.querySelector(`.player-0-panel`).classList.remove("active");
    document.querySelector(`.player-1-panel`).classList.remove("active");
    document.querySelector(`.player-0-panel`).classList.add("active");

}











