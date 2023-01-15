var gamePattern=[];
var buttonColours=["red","blue","green","yellow"];
var userClickedPattern=[];

var started=false;

var level=0;

$(document).keypress(function(){
    if(!started){
   
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
})

$(".btn").on("click", function(){
        userChosenColor=$(this).attr("id"); 
        
        userClickedPattern.push(userChosenColor);

        playSound(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer(userClickedPattern.length-1);

       
})


function nextSequence(){

    level++;

    userClickedPattern=[];

    $("#level-title").text("Level "+level);
    var randomNumber=Math.floor(Math.random()*3)+1;
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
   
}

function playSound(name){

   
        var audio=new Audio("sounds/"+name+".mp3");
        audio.play();  
}

function animatePress(currentColor){

    $("#"+currentColor).addClass("pressed");
    
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
   console.log("Success")

   if(userClickedPattern.length===gamePattern.length){

    setTimeout(function(){
        nextSequence();
    },1000);
   }
  } else {
 
console.log("wrong");

  playSound("wrong");

   $("body").addClass("game-over");

   setTimeout(function(){
    $("body").removeClass("game-over");
   },200);

   $("#level-title").text("Gamer Over, Press any key to restart");

   startover();
}
}

function startover(){

    level=0;

    gamePattern=[];

    started=false;


}