'use strict';

const displayMessage = function (message){
  document.querySelector('.message').textContent = message;
}

const genRandomNum = function (){
  return Math.trunc(Math.random() * 20) + 1;
}

let answer = genRandomNum();
let score = 20;
let highscore = 0;

document.querySelector('.check').addEventListener('click', () => {
  const guess = Number(document.querySelector('.guess').value);
  if(!guess){
    displayMessage('🚫 NO NUMBER !!');
  } else if(guess === answer){
    displayMessage('🎉 CORRECT NUMBER !!');
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.number').textContent = answer;

    if(score > highscore){
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }

  } else if(guess != answer){
    if(score > 1){
      displayMessage(guess > answer ? '📈 TOO HIGH!!' : '📉 TOO LOW!!');
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      displayMessage('💥 You Lost the game');
      document.querySelector('.score').textContent = 0;
    }
  }
})

document.querySelector('.again').addEventListener('click', () => {
  score = 20;
  answer = genRandomNum();
  document.querySelector('.score').textContent = score;
  document.querySelector('.guess').value = '';
  displayMessage('Start guessing...');
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.number').textContent = '?';
})