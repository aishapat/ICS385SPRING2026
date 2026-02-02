// ============================================
// SIMON GAME - JAVASCRIPT CODE
// Enhanced for beginners: Level 0 tutorial + friendly guidance
// ============================================

// VARIABLES
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// ============================================
// EVENT LISTENER - Start the game when key pressed
$(document).keypress(function() {
  if (!started) {
    // [AI comment] Friendly beginner alert
    alert("Welcome! Watch the color sequence carefully and repeat it by clicking the buttons. Let's have fun!");
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// ============================================
// EVENT LISTENER - When a color button is clicked
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

// ============================================
// FUNCTION: Check user's answer
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

// ============================================
// FUNCTION: Generate next sequence
function nextSequence() {

  // ============================================
  // [AI comment] Level 0 Tutorial for beginners
  if (level === 0) {
    userClickedPattern = [];
    $("#level-title").text("Tutorial Level: Watch 1 color!");
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(500).fadeOut(500).fadeIn(500); // slower for tutorial
    playSound(randomChosenColour);
    level++; // move to level 1 next
    return;
  }

  // Clear user pattern
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// ============================================
// FUNCTION: Animate button press
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// ============================================
// FUNCTION: Play sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// ============================================
// FUNCTION: Reset game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

// ============================================
// HOW TO EXTEND:
// - More colors
// - High score tracking
// - Time-based challenge
// - Extra beginner guidance
