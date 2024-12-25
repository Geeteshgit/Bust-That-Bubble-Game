window.addEventListener("DOMContentLoaded",initEvents);
function initEvents(){
    const start = document.querySelector("#start");
    const bubbleContainer = document.querySelector("#bubble-container");
    const hitContainer = document.querySelector(".hit-container p");
    const timeContainer = document.querySelector(".timer-container p");
    const scoreContainer = document.querySelector(".score-container p");
    let timer = 60;
    let hitnum = 0;
    let score = 0;
    let timerId = null;

    function makeBubbles(){
        const bubbles = [];
        for(let i=0;i<160;i++){
            let randomnum = Math.floor(Math.random()*10);
            bubbles.push(`<div class="bubble">${randomnum}</div>`);
            bubbleContainer.innerHTML = bubbles.join("");
        }
    }
    
    function generateHitNum(){
        hitnum = Math.floor(Math.random()*10);
        hitContainer.innerText = `${hitnum}`;
    }

    function startTimer(){
        if(timerId){
            clearInterval(timerId);
        }
        timerId = setInterval(() => {
            timer--;
            if(timer<0){
                clearInterval(timer);
                if(score>=350){
                    bubbleContainer.innerHTML = `<div><h1>Your Score Is : ${score}! <br> You Seem Like A Pro!`;
                }
                else if(score>250 && score<350){
                    bubbleContainer.innerHTML = `<div><h1>Your Score Is : ${score}! <br> You're Good At It!`;
                }
                else{
                    bubbleContainer.innerHTML = `<div><h1>Your Score Is : ${score}! <br> You Need To Be Faster!`;
                }
            }
            else{
                timeContainer.innerText = timer;
            }

        }, 1000);
    }

    function resetTimer(){
        timer = 60;
        clearInterval(timerId);
        timeContainer.innerText  = 60;
        timerId = null;
    }
    
    function updateScore(){
        const bubbles = document.querySelectorAll(".bubble");
        bubbles.forEach((bub)=>{
            bub.addEventListener("click",(e)=>{
                if(Number(e.currentTarget.innerText) === hitnum){
                    generateHitNum();
                    makeBubbles();
                    score += 10;
                    scoreContainer.innerText = score;
                    updateScore();
                }
                else{
                    makeBubbles();
                    generateHitNum();
                    if(score<5){
                        score = 0;
                        scoreContainer.innerText = score;
                    }else{
                        score -=5;
                        scoreContainer.innerText = score;
                    }
                    updateScore();
                }
            });
        });
    }

    start.addEventListener("click",()=>{
        makeBubbles();
        generateHitNum();
        resetTimer();
        startTimer();
        updateScore();
        score = 0;
        scoreContainer.innerText = "0";
    });

}