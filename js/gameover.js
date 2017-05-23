var tomb = document.getElementById('tomb');
var finalScoreWrite = document.getElementById('finalScoreWrite');
var scoreNum = document.getElementById('scoreNum');
function gameOver(){
    pause();
    dead()
    setTimeout(showScore,2000)
}
function dead(){
    var x = document.getElementById('dragon').style.left;
    var y = document.getElementById('dragon').style.top;
    container.removeChild(document.getElementById('dragon'));
    container.removeChild(document.getElementById('bloodContainer'));
    // console.log(x+'+'+y)
    tomb.style.display = 'block';
    tomb.style.left = x;
    tomb.style.top = y;
}
function showScore(){
    var score = parseInt(scoreNum.innerHTML);
    finalScoreWrite.innerHTML = score;
    document.getElementById('cover').style.display = 'block';
}

