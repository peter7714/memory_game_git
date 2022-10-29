const gameContainer = document.getElementById("game");
const scoreCounter = document.querySelector('#score');
const highScoreCounter = document.querySelector('#high-score');
const newGameBtn = document.getElementById('new-game')
let colorOne = undefined;
let colorTwo = undefined;
let twoClicked = false;
let gameCompleted = 0;
let score = 0;
let highscore = localStorage.getItem("highscore");

highScoreCounter.innerText = '0';
scoreCounter.innerText = score;

if(localStorage.getItem('highScore')){
  highScoreCounter.innerText = localStorage.highscore;
}
const COLORS = [
  "#ff3636",
  "#3471eb",
  "#36ff5a",
  "#ff9a36",
  "#ae36ff",
  "#ff3636",
  "#3471eb",
  "#36ff5a",
  "#ff9a36",
  "#ae36ff"
];

function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

let shuffledColors = shuffle(COLORS);

function createDivsForColors(colorArray) {
  let i = 0;
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
    i++;
  }
}

function handleCardClick(event) {
  let selectedCard = event.target;
  if(twoClicked) return;
  if(selectedCard.classList.contains('clicked')) return;
  selectedCard.style.backgroundColor = selectedCard.classList[0];
  if(!colorOne || !colorTwo){
    selectedCard.classList.add('clicked');
    colorOne = colorOne || selectedCard;
    colorTwo = selectedCard === colorOne ? undefined : selectedCard;
  }
  if(colorOne && colorTwo){
    twoClicked = true;
    pickOne = colorOne.classList[0];
    pickTwo = colorTwo.classList[0];
    if(pickOne === pickTwo){
      colorOne.removeEventListener('click', handleCardClick);
      colorTwo.removeEventListener('click', handleCardClick);
      colorOne = undefined;
      colorTwo = undefined;
      twoClicked = false;
      score++;
      scoreCounter.innerText = score;
      gameCompleted += 2;
      if(gameCompleted >= 9){
        highScoreCounter.innerText = score;
      }
    } else {
      setTimeout(function(){
        colorOne.style.backgroundColor = '';
        colorTwo.style.backgroundColor = '';
        colorOne.classList.remove('clicked');
        colorTwo.classList.remove('clicked');
        colorOne = undefined;
        colorTwo = undefined;
        twoClicked = false;
        score++;
        scoreCounter.innerText = score;
      },1000,);
    }
  }
}

function newGame(){
  colorOne = undefined;
  colorTwo = undefined;
  twoClicked = false;
  score = 0;
  scoreCounter.innerText = score;
  let divs = document.querySelectorAll('div');
  for(let i = 0; i < divs.length; i++){
    if(divs[i].classList.contains('clicked')){
      divs[i].classList.remove('clicked');
      divs[i].style.backgroundColor = '';
      divs[i].addEventListener('click', handleCardClick);
    }
  }
}

if(gameCompleted){
  if (score > highscore) {
      localStorage.setItem("highscore", score);      
  }
}
else{
  localStorage.setItem("highscore", score);
}

newGameBtn.addEventListener('click', newGame);

createDivsForColors(shuffledColors);
