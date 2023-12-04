 var highscore= [
    { 
        user : "AA" ,
        score : 1
    },
{
    user: "BB",
    score: 2
} ]
 
var score= document.getElementById('highscores');

for ( i=0; i<highscore.length; i++){
    var resultScore= highscore[i]; 
    var  entry = resultScore.user + " - " + resultScore.score;
    var li = document.createElement("li");
    li.textContent= entry ;
    score.appendChild(li);
};