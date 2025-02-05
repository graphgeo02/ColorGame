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

// Function to start a new game
function newGame() {
  gameStatus.classList.remove('show');
  targetColor = getRandomColor();
  colorBox.style.backgroundColor = makeBrighter(targetColor);
  correctOption = Math.floor(Math.random() * colorOptions.length);
  colorOptions.forEach((option, index) => {
    if (index === correctOption) {
      option.style.backgroundColor = targetColor; // Set the correct option as the target color
    } else {
      option.style.backgroundColor = getRandomColor(); // Set the other options as random colors
    }
    option.onclick = checkGuess;
  });
  setTimeout(() => {
    gameStatus.textContent = 'New game started!';
    gameStatus.classList.add('show');
  }, 100);
}

// Function to check the player's guess
function checkGuess(event) {
  const playerGuess = event.target;
  if (playerGuess === colorOptions[correctOption]) {
    gameStatus.innerHTML = 'Correct! &#128522;';
    gameStatus.style.color = 'green'
    gameStatus.classList.add('show');
    setTimeout(() => {
      gameStatus.classList.remove('show');
      newGame(); // Start a new game
    }, 3000);
    score++;
    scoreDisplay.textContent = score;
  } else {
    gameStatus.innerHTML = 'Wrong! &#128293;'
    gameStatus.style.color = 'red';
    gameStatus.classList.add('show');
    setTimeout(() => {
      gameStatus.classList.remove('show');
    }, 3000);
  }
}

// Add event listener to the new game button
newGameButton.addEventListener('click', newGame);

// Start a new game
newGame();


button.addEventListener('click', () => {
  button.classList.toggle('button-clicked');
});