'use strict';
var gBoard;
var gWatchInterval
var gStartTime

var gGame = {
  isOn: true,
  status: '🙂',
  size: 4,
  mines: 2,
  lives: 3,
  isFirstClick: true,
};


const MINE = '💣';
const FLAG = '🚩';

function setGame(el) {
  gGame.isOn = true;
  gGame.mines = parseInt(el.value);
  gGame.size = parseInt(el.id);
  gGame.lives = 3;
  gGame.isFirstClick = true;
  gGame.status = '🙂';
  gBoard = buildBoard(gGame.size);
  renderBoard(gBoard, '.board-container');
  setMinesNegsCount();
  var elStatus = document.querySelector('.status')
  elStatus.innerHTML = gGame.status
  endStopWatch()
}

function initGame() {
  gBoard = buildBoard(gGame.size);
  renderBoard(gBoard, '.board-container');
  
}

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
        isFlagged: false,
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
      var className = '';

      if (cell.isMine) className = 'cell mine';
      else className = 'cell';

      strHTML += `<td oncontextmenu="return false;" onmousedown="cellClicked(event,this,${i},${j},)" 
        data-i=${i} data-j=${j} class="${className}"></td>`;
    }
    strHTML += '</tr>';
  }

  strHTML += '</tbody></table>';
  var elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}

function cellClicked(event, elCell, i, j) {
  if (!gGame.isOn) return;

  if (gGame.isFirstClick && gBoard[i][j].isMine) {
    setGame();
    getMines(gGame.mines, gGame.size);
    return;
  }    
    if (gGame.isFirstClick) {
        gGame.isFirstClick = false
        getMines(gGame.mines, gGame.size)
        setGame()
}
  startStopWatch();

  if (event.buttons === 1) {
    if (gBoard[i][j].isMine) {
      elCell.innerHTML = MINE;
      elCell.className = 'mine';
      checkGameOver();
    }

    if (!gBoard[i][j].isMine && gBoard[i][j].minesAroundCount === 0)
      expandShown(gBoard, i, j, elCell);

    if (gBoard[i][j].minesAroundCount !== 0) {
      gBoard[i][j].isShown = true;
      elCell.style.backgroundColor = 'lightblue';
      elCell.innerHTML = gBoard[i][j].minesAroundCount;
    }

    if (gBoard[i][j].flagged) return;
  }

  if (event.buttons === 2) {
    if (!gBoard[i][j].isFlagged) {
      gBoard[i][j].isFlagged = true;
      elCell.innerHTML = FLAG;
      checkWin(gGame.size);
    } else return;
  }
}

function checkGameOver() {
  gGame.lives--;
  if (gGame.lives === 0) gameOver('Lose');
}

function checkWin(size) {

  var count = {
    flags: 0,
    shown: 0,
  }

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (gBoard[i][j].isFlagged) count.flags++;
      if (gBoard[i][j].isShown) count.shown++;
    }
  }

  if (
    count.flags === gGame.isMine &&
    count.shown === gGame.size ** 2 - gGame.isMine
  )
    gameOver('Win');
}

function setMinesNegsCount() {
  for (let i = 0; i < gGame.size; i++) {
    for (let j = 0; j < gGame.size; j++) {
      gBoard[i][j].minesAroundCount = negsCount(gBoard, i, j);
    }
  }
}

function gameOver(msg) {
  var status = document.querySelector('.status');
  var gameMsg = document.querySelector('.game-msg');

  if (msg === 'Win') {
    status.innerHTML = '😎';
    gameMsg.innerHTML = 'VICORIOUS';
  }

  if (msg === 'Lose') {
    status.innerHTML = '🤯';
    gameMsg.innerHTML = 'GAMEOVER';
    gGame.isOn = false;
    revealMines(gBoard);
    endStopWatch();

  }
}

function getMines(minesAmount, size) {
  for (let i = 0; i < minesAmount; i++) {
    let pos1 = getRandomInt(0, size);
    let pos2 = getRandomInt(0, size);
    if (gBoard[pos1][pos2].isMine) i--;
    gBoard[pos1][pos2].isMine = true;
    var elementCell = document.querySelector(
      `[data-i="${pos1}"][data-j="${pos2}"]`
    );
  }
  setMinesNegsCount();
}

function revealMines(gBoard) {
  for (let i = 0; i < gBoard.length; i++) {
    for (let j = 0; j < gBoard.length; j++) {
      var elementCell = document.querySelector(
        `[data-i="${i}"][data-j="${j}"]`
      );
      if (gBoard[i][j].isMine) {
        elementCell.className += ' mine';
        elementCell.innerHTML = MINE;
      }
    }
  }
}
