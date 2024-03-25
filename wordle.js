
const response = await fetch("https://api.masoudkf.com/v1/wordle", {
    headers: {
        "x-api-key": "sw0Tr2othT1AyTQtNDUE06LqMckbTiKWaVYhuirv",
    },
});

const data = await response.json();
const {dictionary}=data;

const random = dictionary[Math.floor(Math.random() * data.dictionary.length)];

const randomWord = random.word.toLowerCase();
const randomHint = random.hint;


let menu =  document.getElementsByClassName("menu")[0]
document.getElementsByClassName("rules")[0].onclick =function() {
       menu.classList.toggle("showmenu");
      };

let hint = document.getElementsByClassName("hint")[0];
let hintButton = document.getElementsByClassName("hintbutton")[0];
hintButton.onclick = function() {
    hint.textContent = randomHint;
    hint.classList.toggle("show");
    
};

document.addEventListener("keydown", function(event) {
  if (event.keyCode === 13) { // 13 is the key code for the Enter key
      event.preventDefault(); // Prevent the default behavior of the Enter key
  }
})
   
const state = {
  secret:randomWord,
  grid: Array(5)
    .fill()
    .map(() => Array(4).fill('')),
  currentRow: 0,
  currentCol: 0,
};

function drawGrid(container) {

  const grid = document.createElement('div');
  grid.className = 'grid';

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 4; j++) {
      drawBox(grid, i, j);
    }
  }

  container.appendChild(grid);
}

function updateGrid() {
  for (let i = 0; i < state.grid.length; i++) {
    for (let j = 0; j < state.grid[i].length; j++) {
      const box = document.getElementById(`box${i}${j}`);
      box.textContent = state.grid[i][j];
    }
  }
}

function drawBox(container, row, col, letter = '') {
  const box = document.createElement('div');
  box.className = 'box';
  box.textContent = letter;
  box.id = `box${row}${col}`;

  container.appendChild(box);
  return box;
}

function registerKeyboardEvents() {
  document.body.onkeydown = (e) => {
    const key = e.key;
    if (key === 'Enter') {
      if (state.currentCol === 4) {
        const word = getCurrentWord();
        revealWord(word);
        state.currentRow++;
        state.currentCol = 0;
      }
      else{
        window.alert("first complete the word")
      }
    }
    if (key === 'Backspace') {
      removeLetter();
    }
    if (isLetter(key)) {
      addLetter(key);
    }

    updateGrid();
  };
}

function getCurrentWord() {
    let word = '';
    for (let i = 0; i < state.grid[state.currentRow].length; i++) {
      word += state.grid[state.currentRow][i];
    }
    return word;
  }
  

function getPositionOfOccurrence(word, letter, position) {
  let result = 0;
  for (let i = 0; i <= position; i++) {
    if (word[i] === letter) {
      result++;
    }
  }
  return result;
}

function revealWord(guess) {
  const row = state.currentRow;

  for (let i = 0; i < 4; i++) {
    const box = document.getElementById(`box${row}${i}`);
    const letter = box.textContent;
    if (letter === state.secret[i]) {
        box.classList.add('correct');
      } else if (state.secret.includes(letter)) {
        box.classList.add('wrong');
      } else {
        box.classList.add('empty');
      }
    
  }

  const isWinner = state.secret === guess;
  const isGameOver = state.currentRow === 4;

  if (isWinner) {
    const gif = document.createElement('img');
    gif.style.display = 'block';
    gif.style.margin = '0 auto';
    gif.src = './gif/congrats.gif';
    const game = document.getElementById('game');
    game.parentNode.replaceChild(gif, game);

  } else if (isGameOver) {
    let lost = document.getElementsByClassName("lost")[0];
    lost.textContent = `You missed the word ${state.secret} and lost.`;
    lost.classList.toggle("islost");
  }
}

function isLetter(key) {
  return key.length === 1 && key.match(/[a-z]/i);
}

function addLetter(letter) {
  if (state.currentCol === 4) return;
  state.grid[state.currentRow][state.currentCol] = letter;
  state.currentCol++;
}

function removeLetter() {
  if (state.currentCol === 0) return;
  state.grid[state.currentRow][state.currentCol - 1] = '';
  state.currentCol--;
}



function startup() {
  const game = document.getElementById('game');
  drawGrid(game);
  registerKeyboardEvents();
}

startup();