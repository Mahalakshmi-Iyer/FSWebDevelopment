let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;
let highScore = 0;
let btns = ["orange", "pink", "blue", "green"];

let h2 = document.querySelector('h2');

document.addEventListener("keypress", function(){
    if(started == false){
        started = true;
        highScore = 0;
        levelUp();
    }
});

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    // choose random button
    let randomIdx = Math.floor(Math.random() * 4);
    let randomColor = btns[randomIdx];
    let randomBtn = document.querySelector(`.${randomColor}`);

    gameSeq.push(randomColor);
    gameFlash(randomBtn);
}

function gameFlash(btn){
    btn.classList.add('flash');
    setTimeout(function(){
        btn.classList.remove('flash');
    }, 200);
}

function userFlash(btn){
    btn.classList.add('userFlash');
    setTimeout(function(){
        btn.classList.remove('userFlash');
    }, 150);
}

function btnPress(){
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute('id');
    userSeq.push(userColor);

    matchAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll('.btn');
for (btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function matchAns(idx){
    if(userSeq[idx] == gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1500);
        }
    }
    else{
        highScore = Math.max(highScore, level);
        h2.innerHTML = `<pre>Game Over! <br> Your score : <i>${level}</i>       High score : <i>${highScore}</i> <br>Press any key to start the game<pre>`;
        document.querySelector('body').style.backgroundColor = 'crimson';
        setTimeout(function(){
            document.querySelector('body').style.backgroundColor = 'white';
        }, 200);
        reset();
    }
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}