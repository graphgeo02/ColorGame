// Get the HTML elements
const colorBox = document.querySelector('[data-testid="colorBox"]');
const colorOptions = document.querySelectorAll('[data-testid="colorOption"]');
const gameStatus = document.querySelector('[data-testid="gameStatus"]');
const scoreDisplay = document.querySelector('[data-testid="score"]');
const newGameButton = document.querySelector('[data-testid="newGameButton"]');

// Initialize the score and target color
let score = 0;
let targetColor;
let correctOption;

// Function to generate a random color
function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function makeBrighter(color) {
  const [r, g, b] = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/).slice(1).map(Number);

  // Increase brightness by 40, capping at 255
  const brighterR = Math.min(r + 40, 255);
  const brighterG = Math.min(g + 40, 255);
  const brighterB = Math.min(b + 40, 255);

  return `rgb(${brighterR}, ${brighterG}, ${brighterB})`;
}



function newGame(resetScore = false) {
  if (resetScore) {
    score = 0; // Reset score only when the new game button is clicked
    scoreDisplay.textContent = score;
  }

  gameStatus.textContent = 'New game started! 🎯';
  gameStatus.style.color = 'green';
  gameStatus.classList.add('show');
  
  setTimeout(() => gameStatus.classList.remove('show'), 1500);

  targetColor = getRandomColor();
  colorBox.style.backgroundColor = makeBrighter(targetColor);
  correctOption = Math.floor(Math.random() * colorOptions.length);

  colorOptions.forEach((option, index) => {
    option.style.backgroundColor = index === correctOption ? targetColor : getRandomColor();
    option.onclick = checkGuess;
  });
}

// Function to check the player's guess
function checkGuess(event) {
  const playerGuess = event.target;
  if (playerGuess === colorOptions[correctOption]) {
    gameStatus.textContent = 'Correct! 😊';
    gameStatus.style.color = 'green';
    gameStatus.classList.add('show');
    score++;
    scoreDisplay.textContent = score;
    
    setTimeout(() => {
      gameStatus.classList.remove('show');
      newGame(); // Automatically start a new game
    }, 2000);
  } else {
    gameStatus.textContent = 'Wrong! 🔥';
    gameStatus.style.color = 'red';
    gameStatus.classList.add('show');

    setTimeout(() => gameStatus.classList.remove('show'), 1500);
  }
}

// Add event listener to the new game button
newGameButton.addEventListener('click', () => newGame(true));


// Start a new game
// newGame();


button.addEventListener('click', () => {
  button.classList.toggle('button-clicked');
});