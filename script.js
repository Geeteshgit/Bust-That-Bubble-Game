window.addEventListener("DOMContentLoaded",initEvents);
function initEvents(){
    const start = document.querySelector("#start");
    const body = document.querySelector("body");
    const heading = document.querySelector(".heading");
    const containerHeader = document.querySelector(".header");
    const textContent = document.querySelectorAll(".box");
    const bubbleContainer = document.querySelector("#bubble-container");
    const hitContainer = document.querySelector(".hit-container p");
    const timeContainer = document.querySelector(".timer-container p");
    const scoreContainer = document.querySelector(".score-container p");
    let timer = 60;
    let hitnum = 0;
    let score = 0;
    let timerId = null;
    let changetimer = null;

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
                if(score>=250){
                    bubbleContainer.innerHTML = `<div><h1 class="heading">Your Score Is : ${score}! <br> You Seem Like A Pro!</h1></div>`;
                    clearInterval(changetimer);
                }
                else if(score>150 && score<250){
                    bubbleContainer.innerHTML = `<div><h1 class="heading">Your Score Is : ${score}! <br> You're Good At It!</h1></div>`;
                    clearInterval(changetimer);
                }
                else{
                    bubbleContainer.innerHTML = `<div><h1 class="heading">Your Score Is : ${score}! <br> You Need To Be Faster!</h1></div>`;
                    clearInterval(changetimer);
                }
            }
            else{
                timeContainer.innerText = timer;
            }

        }, 1000);
    }

    function changeBubbles(){
        changetimer = setInterval(()=>{
            makeBubbles();
            generateHitNum();
            updateScore();
        },2000);
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
                    clearInterval(changetimer);
                    changeBubbles();
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
                    clearInterval(changetimer);
                    changeBubbles();
                }
            });
        });
        bubbles.forEach((bub)=>{
            if(score<=150){
                body.style.backgroundColor = "#95d5b2";
                heading.style.color = "#1b4332";
                containerHeader.style.backgroundColor = "#2d6a4f";
                start.style.color = "#1b4332";
                textContent.forEach((text)=>{
                    text.style.color = "#2d6a4f";
                });
                bub.style.backgroundColor = "#2d6a4f";
                bub.addEventListener("mouseenter",()=>{
                    bub.style.backgroundColor = "#40916c";
                });
                bub.addEventListener("mouseleave",()=>{
                    bub.style.backgroundColor = "#2d6a4f";
                });
            }
            else if(score>150 && score<250){
                body.style.backgroundColor = "#90e0ef";
                heading.style.color = "#023e8a";
                containerHeader.style.backgroundColor ="#0077b6";
                start.style.color = "#023e8a";
                textContent.forEach((text)=>{
                    text.style.color = "#0077b6";
                });
                bub.style.backgroundColor = "#0077b6";
                bub.addEventListener("mouseenter",()=>{
                    bub.style.backgroundColor = "#0096c7";
                });
                bub.addEventListener("mouseleave",()=>{
                    bub.style.backgroundColor = "#0077b6";
                });
            }
            else{
                body.style.backgroundColor = "#ff758f";
                heading.style.color = "#800f2f";
                containerHeader.style.backgroundColor ="#c9184a";
                start.style.color = "#800f2f";
                textContent.forEach((text)=>{
                    text.style.color = "#c9184a";
                });
                bub.style.backgroundColor = "#c9184a";
                bub.addEventListener("mouseenter",()=>{
                    bub.style.backgroundColor = "#ff4d6d";
                });
                bub.addEventListener("mouseleave",()=>{
                    bub.style.backgroundColor = "#c9184a";
                });
            }
        });
    }
    start.addEventListener("click",()=>{
        score = 0;
        scoreContainer.innerText = "0";
        makeBubbles();
        generateHitNum();
        resetTimer();
        updateScore();
        startTimer();
        clearInterval(changetimer)
        changeBubbles();
    });
}