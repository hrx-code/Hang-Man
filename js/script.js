const wordElement=document.getElementById('word');
const playbtn=document.getElementById('play-again');
const wrongLetterElement=document.getElementById('wrong-chars');
const popup=document.getElementById('popup-container');
const finalMessage=document.getElementById('final-message');
const notification=document.getElementById('notification-container');


const figureParts=document.querySelectorAll('.figure-part');

const words=['application','programming','interface','play','sing','dance','run','watch','momma','display','school','tanishq','jitendra','preeti','wizard','aage','fuck','important'];

let selectedWord=words[Math.floor(Math.random()*words.length)];


const correctLetters=[];const wrongLetters=[];

function displayWord(){
    wordElement.innerHTML=`
       ${selectedWord
            .split('')
            .map(
                letter=>
                `<div class="letter">
                ${correctLetters.includes(letter) ? letter :''}
                </div>`  
            ).join('')
        }
    `;
    const innerWord=wordElement.innerText.replace(/\n/g,'');
    if(innerWord==selectedWord){
        finalMessage.innerText='Congratulations ! You Won !';
        popup.style.display='flex';
    }
}

function updateWrongLetterElement(){
    // display wrong letters
    wrongLetterElement.innerHTML=`
      ${wrongLetters.length>0?'<p>Wrong</p>':''}
      ${wrongLetters.map(letter=>`<span>${letter}</span>`)}
    `;
    // display wrong parts
    figureParts.forEach((part,index)=>{
        const errors=wrongLetters.length;

        if(index<errors){
            part.style.display='block';
        } else{
            part.style.display='none';
        }
    });

    // check if lost
    if(wrongLetters.length===figureParts.length){
        finalMessage.innerText='Unfortunately You Lost';
        popup.style.display='flex';
    }
}

function showNotification(){
    notification.classList.add('show');

    setTimeout(()=>{
        notification.classList.remove('show');
    },2000)
}


// key press
window.addEventListener('keydown',e=>{
    if(e.keyCode>=65&&e.keyCode<=90){
        const letter=e.key;

        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);

                displayWord();
            } else{
                showNotification();
            }
        } else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);
                updateWrongLetterElement();
            } else{
                showNotification();
            }
        }
    }
})
// restart the game

playbtn.addEventListener('click',()=>{
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord=words[Math.floor(Math.random()*words.length)];

    displayWord();
    updateWrongLetterElement();
    popup.style.display='none';
})


displayWord();
