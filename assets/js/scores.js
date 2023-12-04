
 
var score= document.getElementById('highscores');
var clearScore=document.getElementById('clear');
var items=localStorage.getItem('leaderBoards');
   var highscores=[];
   if (items!== null){
    highscores = JSON.parse(items)
   }

highscores.sort((a,b)=> b.score-a.score)

for ( i=0; i<highscores.length; i++){
    var resultScore= highscores[i]; 
    var  entry = resultScore.initials + " - " + resultScore.score;
    var li = document.createElement("li");
    li.textContent= entry ;
    score.appendChild(li);
};

clearScore.addEventListener('click', function(){
    localStorage.removeItem('leaderBoards')
    location.reload();
})