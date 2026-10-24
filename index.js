var buttonColors = ["purple", "orange", "cyan", "indigo"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

var gameover = false;



$("body").keypress(function (e) {
  if (e.key == "a") {
    if (started == false) {
      $("h1").text("Level" + " " + level);
      started = true;
      gameover = false;
      nextSequence();
    } else {
      alert("Game is on");
    }
  }
});


$(".btn").click(function () {
  if(gameover === true){
    $("#level-title").text("Start the game before pressing buttons");
  } else {
    var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
  }
  
});



// function checkAnswer() {
//  if(gamePattern.slice(-1) === userClickedPattern.slice(-1)){                   IT RETURNS ARRAY AND HENCE 2 ARRAY OBJECTS AND HENCE ELSE STATEMENT TRIGGERS
//   console.log("success");r
//  } else {
//   console.log("wrong");
//  }
// }


function checkAnswer(currentLevel){

  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000)
    }
  } else {
    gameover = gameOver();
    console.log("wrong");
    
  }
}

function gameOver(){
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  }, 200)
  playSound("wrong")
  $("h1").text("Game Over...Press A to restart");
  started = false;
  level = 0;
  gamePattern = [];
  return true;
}


function nextSequence() {

  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour);
  $("h1").text("Level" + " " + level);
  level++;
}

function animatePress(currentColor) {
  $(`#${currentColor}`).addClass("pressed");
  toggler = setTimeout(() => {
    $(`#${currentColor}`).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio(`Sounds/${name}.mp3`);
  audio.play();
}



