let gameSeq=[];
let userSeq=[];

let btns = ["red", "yellow", "green", "purple"];
let started = false;
let level=0;
let highScore = localStorage.getItem("simonHighScore") || 0;
let highScoreDisplay = document.getElementById("highScoreDisplay");

let h2=document.querySelector("h2");

document.addEventListener("keypress", function(){
    if(started==false){
        console.log("game is started");
        started=true;


        levelup();
    }
});
function gameFlash(btn){
       btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash")
    }, 500);

}

function userFLash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    }, 200);

}

function levelup(){
    userSeq = [];
    level++;
    h2.innerText=`Level ${level}`;

    let ranIdx = Math.floor(Math.random() * 3);
    let ranColor = btns[ranIdx];
    let ranBtn = document.querySelector(`.${ranColor}`);
   // console.log(ranIdx);
   // console.log(ranColor);
   // console.log(ranBtn);
   gameSeq.push(ranColor);
   console.log(gameSeq);
    gameFlash(ranBtn);
}
 
function checkAns(idx) {
   //console.log("curr level :", level); 
   //let idx = level-1;

   if (userSeq[idx] == gameSeq[idx]){
     if(userSeq.length == gameSeq.length){
        setTimeout(levelup, 1000);
        
     }
   }
   else{
    // update high score is needed
    if(level > highScore){
        highScore = level;
        localStorage.getItem("simonHighScore") || 0;
    }

    // update the display immediately
    highScoreDisplay.innerText = `Highest Score: ${highScore}`
   // h2.innerText = `Game is over! press any key to start`;
   h2.innerHTML =`Game is over! your score was <b>${level}</b> <br> press any ker to start`;
   document.querySelector("body").style.backgroundColor = "red";
   setTimeout(function (){
    document.querySelector("body").style.backgroundColor = "white";
   }, 150);
    reset();
   }
}



function btnpress(){
   // console.log(this);
    let btn = this;
   userFLash(btn);

   userColor = btn.getAttribute("id");
   userSeq.push(userColor);
   checkAns(userSeq.length-1);
}

let allbtn = document.querySelectorAll(".btn");
for(btn of allbtn){
    btn.addEventListener("click", btnpress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}