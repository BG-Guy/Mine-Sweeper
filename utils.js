function buildBoard(size) {
    var board = [];
  
    for (let i = 0; i < size; i++) {
      board.push([]);
      for (let j = 0; j < size; j++) {
        var cell = {
          isMine: false,
          minesAroundCount: 0,
          isShown: false,
          isMarked: false,
        };
        board[i][j] = cell;
      }
    }
    return board;
  }

function renderBoard(board, selector) {
    var strHTML = '<table border="0"><tbody>';
  
    for (var i = 0; i < board.length; i++) {
      strHTML += '<tr>';
      for (var j = 0; j < board[0].length; j++) {
        var cell = board[i][j];
        var className = 'cell';
  
        strHTML += `<td oncontextmenu="return false;" onmousedown="cellClicked(event,this,${i},${j},)" 
          data-i=${i} data-j=${j} class="${className}"></td>`;
      }
      strHTML += '</tr>';
    }
    console.log(board)
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;
  }

  function gameLevel(msg) {

      if (msg === 'easy') {
        gLevel.level = msg;
        gLevel.size = 4;
        gLevel.mines = 2;
        gLevel.lives = 1;
      }
      if (msg === 'medium') {
        gLevel.level = msg;
        gLevel.size = 8;
        gLevel.mines = 12;
        gLevel.lives = 3;
      }
      if (msg === 'hard') {
        gLevel.level = msg;
        gLevel.size = 12;
        gLevel.mines = 30;
        gLevel.lives = 3;
      }
      initGame()
  }

  function setMinesNegsCount() {
    for (var i = 0; i < gBoard.length; i++) {
      for (var j = 0; j < gBoard[0].length; j++) {
        var cell = gBoard[i][j];
        cell.minesAroundCount = countNegs(gBoard, i, j);
      }
    }
  }


//count negs with mine
function countNegs(mat, rowIdx, colIdx) {
  var negsCount = 0;
  for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
    if (i < 0 || i > mat.length - 1) continue;
    for (var j = colIdx - 1; j <= colIdx + 1; j++) {
      if (j < 0 || j > mat[0].length - 1) continue;
      if (i === rowIdx && j === colIdx) continue;
      var currCell = mat[i][j];
      if (currCell.isMine) negsCount++;
    }
  }
  return negsCount;
}


function expandShown(board, rowIdx, colIdx) {

  for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
    if (i < 0 || i >= board.length) continue;
    for (var j = colIdx - 1; j <= colIdx + 1; j++) {
        var currCell = board[i][j]
        if (j < 0 || j > board[0].length - 1) continue;
        // if (i === rowIdx && j === colIdx) continue;
        if (currCell.isMine || currCell.isShown || currCell.isMarked) continue;
          currCell.isShown = true
          gGame.shownCount++
          console.log(`NUMBER OF SHOWN expand function ${gGame.shownCount}`);
          var elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
          elCell.classList.add('shown')
          checkWin()
          if (currCell.minesAroundCount) elCell.innerHTML = currCell.minesAroundCount
          if (!currCell.minesAroundCount) expandShown(gBoard, i, j)
      }
  }
}

// a function that creates random mine and place it randomly on the board with no duplicates
function getMines(gBoard, minesAmount) {
  for (let i = 0; i < minesAmount; i++) {
    var pos1 = getRandomInt(0,gBoard.length - 1)
    var pos2 = getRandomInt(0,gBoard.length - 1)
    var currCell = gBoard[pos1][pos2]
    if (currCell.isMine) i--
    if (!currCell.isMine) currCell.isMine = true
  }
}


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function cellMarked(elCell, currCell) {
  console.log(`checking cell marked`);
  if (!currCell.isMarked) {
    console.log(`cell is unmarked should put a flag`);
    currCell.isMarked = true
    elCell.innerHTML = FLAG
    if (currCell.isMine) gGame.markedCount++
    console.log(`NUMBER OF FLAGS ${gGame.markedCount}`)
    checkWin()
  }  

  else {
    console.log(`the cell is marked should remove a flag`);
    currCell.isMarked = false
    elCell.innerHTML = ' '
  
    if (currCell.isMine) {
      gGame.markedCount--
      console.log(`NUMBER OF FLAGS ${gGame.markedCount}`)
    } 
  }
}

function checkWin() {
  if (gGame.shownCount === gLevel.size**2 - gLevel.mines 
    && gGame.markedCount === gLevel.mines) {
    gameOver('Win')
  }
}

function gameOver(msg) {
  gGame.isOn = false
  var elSmiley = document.querySelector('.smiley')
  clearInterval(gInterval)
  if (msg === 'Lose') {
    elSmiley.innerHTML = LOSE
    revealMines(gBoard)
  }
  if (msg === 'Win') {
    elSmiley.innerHTML = WIN
    keepScore(gTimer, gLevel.level)
}

}

function revealMines(gBoard) {
  for (let i = 0; i < gBoard.length; i++) {
    for (let j = 0; j < gBoard[i].length; j++) {
      var currCell = gBoard[i][j];
      var elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
      if (currCell.isMine) {
        console.log(currCell)
        elCell.innerHTML = MINE;
        elCell.classList.add('mine')
        
      }
    }
  }
}

function startStopWatch() {
  var elTime = document.querySelector('.time')
  gTimer++
  elTime.innerHTML = (gTimer / 100) .toFixed(2)
}

function clearStopWatch() {
  var elTime = document.querySelector('.time')
  elTime.innerHTML = '0.00'
  gTimer = 0;
  clearInterval(gInterval)
  gInterval = null
}

//Run the function safe click

