
var buttoncolours=["red","blue","green","yellow"];
var gamePattern=[];
var userclickedpattern=[];
var started =false;
var level= 0;
$(document).keypress(function(){
   if(!started){
      $("#level-title").text("Level "+level);
      nextsequence();
      started=true;
   }
});

$(".btn").click(function(){
   var userchosencolor=$(this).attr("id");

userclickedpattern.push(userchosencolor);
//console.log(userclickedpattern);
playsounds(userchosencolor);
animatepress(userchosencolor);
checkanswer(userclickedpattern.length-1);
});
function checkanswer(currentlevel){
if(gamePattern[currentlevel]==userclickedpattern[currentlevel]){
   //console.log("success");
   if(userclickedpattern.length==gamePattern.length){
     setTimeout(function(){
      nextsequence();
     },1000);
   }
}
else{
   //console.log("wrong");
   playsounds("wrong");
   $("body").addClass("game-over");
   $("#level-title").text("Game Over, Press Any Key to Restart");
   setTimeout(function(){
      $("body").removeClass("game-over");
      
   },200);
   startOver();
 
}

}


function nextsequence(){
   userclickedpattern=[];
   level++;
   $("#level-title").text("Level "+ level);
   var randomnumber = Math.floor(Math.random()*4);
   var randomchosencolour = buttoncolours[randomnumber];
   gamePattern.push(randomchosencolour);
$("#"+randomchosencolour).fadeIn(100).fadeOut(100).fadeIn(100);
/*var audio=new Audio("sounds/"+randomchosencolour+".mp3");
audio.play();*/
playsounds(randomchosencolour);
}

function animatepress(currentcolour){
$("#"+currentcolour).addClass("pressed");
setTimeout(function(){
   $("#"+currentcolour).removeClass("pressed")
},100)
}
function playsounds(name){
   var audio=new Audio("sounds/"+name+".mp3");
   audio.play();
}

function startOver(){
   level=0;
   gamePattern=[];
   started=false;
}