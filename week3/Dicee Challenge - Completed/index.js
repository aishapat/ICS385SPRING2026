// Roll 3 dice
var randomNumber1 = Math.floor(Math.random() * 6) + 1;
var randomNumber2 = Math.floor(Math.random() * 6) + 1;
var randomNumber3 = Math.floor(Math.random() * 6) + 1;

// Update dice images
document.querySelector(".img1").setAttribute("src", "images/dice" + randomNumber1 + ".png");
document.querySelector(".img2").setAttribute("src", "images/dice" + randomNumber2 + ".png");
document.querySelector(".img3").setAttribute("src", "images/dice" + randomNumber3 + ".png");

// Determine winner
var diceArray = [randomNumber1, randomNumber2, randomNumber3];
var max = Math.max(...diceArray);
var countMax = diceArray.filter(d => d === max).length;

if (countMax > 1) {
  document.querySelector("h1").textContent = "Draw! Roll again!";
} else {
  var winnerIndex = diceArray.indexOf(max) + 1; // +1 because players are 1,2,3
  document.querySelector("h1").textContent = "🚩 Player " + winnerIndex + " Wins!";
}
