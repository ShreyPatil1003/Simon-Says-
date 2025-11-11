var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
userClickedPattern = [];

var started = false;
var level = 0;

$(document).keydown(function() {
    if(!started){
        started = true;
        $("h1").text("Level " + level);
        nextSequence();
    }
});

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor((Math.random() * 4));
    var randomColor = buttonColours[randomNumber];
    gamePattern.push(randomColor);
    
    $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomColor);
    animatePress(randomColor);
}

$(".btn").click(function(){
    var button = $(this).attr("id");
    userClickedPattern.push(button);
    playSound(button);
    animatePress(button);
    checkAnswer(userClickedPattern.length - 1);
});


function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(name){
    $("#" + name).addClass("pressed");

    setTimeout(function(){
        $("#" + name).removeClass("pressed")
    }, 100);
}

function checkAnswer(level){
    if(gamePattern[level] === userClickedPattern[level]){
        console.log("Success!");

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
        console.log("Wrong!");
        $("body").addClass("game-over");
        $("h1").text("Wrong answer !");
    
        playSound("wrong");
    
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 1000);
       $("h1").text("Game over! Press any Key to Restart...");

       restart();
    }
} 

function restart(){
    level = 0;
    gamePattern = [];
    started = false;
}