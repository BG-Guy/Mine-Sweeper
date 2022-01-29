'use strict';
var gBoard;
var gGame = {
  isOn: true,
  safeClicks: 3,
  hints: 3,
  isFirstClick: true,
  shownCount: 0,
  markedCount: 0,
  hintMode: false,
};


var elSmiley = document.querySelector('.smiley')


var gTimer
var gInterval
var gStorage
var gBestTime = {
  easy: 0,
  medium: 0,
  hard: 0
}

var gLevel = {
    size: 4,
    mines: 2,
    lives: 3
}

const MINE = '💣'
const FLAG = '🚩'
const WIN = '😎'
const LOSE = '🤯'
const SMILEY = '😃'

var gStorage = window.localStorage

function initGame() {
    gBoard = buildBoard(gLevel.size);
    renderBoard(gBoard, '.board-container');  
    clearStopWatch()
    elSmiley.innerHTML = SMILEY
    
    gGame = {
      isOn: true,
      safeClicks: 3,
      hints: 3,
      isFirstClick: true,
      shownCount: 0,
      markedCount: 0,
      hintMode: false
      
    }
    updateLives()
    updateSafeClicks()
    updateHints()

  }

function cellClicked(event,elCell, i, j) {


    var currCell = gBoard[i][j]
    //if first click
    if (gGame.isFirstClick) {
      console.log(`FIRST CLICK`);
      gInterval = setInterval(startStopWatch, 10)
      gGame.isFirstClick = false;
      //if first click render mines
      getMines(gBoard, gLevel.mines);
      setMinesNegsCount();
    }

    if (gGame.hintMode) {
      useHint(i,j)
      setTimeout(() => hintModeOff(i,j), 1000)
      return
    }


    if (!event.button) {
      if (!gGame.isOn || currCell.isShown || currCell.isMarked) return
      console.log(`left mouse click`)
      // if the cell is a mine
          if (currCell.isMine) {
            elCell.classList.add('mine')
            elCell.innerText = MINE;
            

            if (gLevel.lives === 0) {
              gameOver('Lose')
      
            }
            else {
              console.log('the cell is a mine')

              checkWin()
              gLevel.lives--
              updateLives()
            }
          }
        //if the cell is not a mine and the cell doesnt have negs too
        if (!currCell.isMine && !currCell.minesAroundCount) {
            console.log('the cell doesnt have negs and not a mine')
            console.log(`NUMBER OF SHOWN 1 ${gGame.shownCount}`);
            elCell.innerText = ''
            expandShown(gBoard, i, j)
            checkWin()
        }
          
          // if the cell has negs and is not a mine
          if (!currCell.isMine && currCell.minesAroundCount) {
            console.log(`the cell have ${currCell.minesAroundCount} negs`)
            currCell.isShown = true
            gGame.shownCount++
            elCell.classList.add('shown')
            console.log(`NUMBER OF SHOWN 2 ${gGame.shownCount}`);

            elCell.innerText = currCell.minesAroundCount
            checkWin()
          }
        }
    

    if (event.button) {
      console.log(`right click`)
      cellMarked(elCell, currCell)
    }

  }

  function updateLives() {
    var elLives = document.querySelector('.lives')
    elLives.innerHTML = `${'❤️'.repeat(gLevel.lives)}`
    
  }

  

  function sevenBoomMode () {
    for (let i = 0; i < gBoard[i]; i++) {
      for (let i = 0; i < gBoard[j]; i++) {
        var currCell = gBoard[i][j]
        if (i % 7 === 0 || j % 7 === 0) {
          currCell.isMine = true
        }

        else currCell.isMine = false 
      }
    }
  }


  
  function safeClick() {
    // get random cell and check if mine, if so turn the class
    var elSafeCells = []
    var currCells = []
    for (let i = 0; i < gLevel.size; i++) {
      for (let j = 0; j < gLevel.size; j++) {
        var currCell = gBoard[i][j]
        var elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
        if (!currCell.isMine && !currCell.isMarked && !currCell.isShown) {
          elSafeCells.push(elCell);
          currCells.push(currCell); 
    }
  }
}  
  console.log(elSafeCells);
    var randIdx = getRandomInt(0, elSafeCells.length)
    var elRandomSafeCell = elSafeCells[randIdx] 
    gGame.safeClicks--
    updateSafeClicks()
    elRandomSafeCell.classList.add('shown')
    if (currCells[randIdx].minesAroundCount) {
      elRandomSafeCell.innerHTML = currCells[randIdx].minesAroundCount
    }

    else {
      elRandomSafeCell.innerHTML = ''
    }
    setTimeout(() => {
      elRandomSafeCell.classList.remove('shown')
      elRandomSafeCell.innerHTML = ''
    }
      , 1000)
  }


  function updateSafeClicks() {
     
    var elSafeClicks = document.querySelector('.safe-click')
    elSafeClicks.innerHTML = `${'🧿'.repeat(gGame.safeClicks)}`
    
  }

  
  
  
  //a function that something from a box check it for something and returns it its not
  // for (i = 0; i < 1 ; i++) if (el = 'something thats not') i-- 
  
  // keepScore DONE
  function keepScore(gTimer, level) {
  
    if (level === 'easy' && gTimer > gBestTime.easy) gStorage.setItem(gBestTime.easy, gTimer)
    if (level === 'medium' && gTimer > gBestTime.medium) gStorage.setItem(gBestTime.medium, gTimer)
    if (level === 'hard' && gTimer > gBestTime.hard) gStorage.setItem(gBestTime.hard, gTimer)
    console.log(myStorage.bestTime)
  
  }

  // function expandShown(board, rowIdx, colIdx) {

  //   for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
  //     if (i < 0 || i >= board.length) continue;
  //     for (var j = colIdx - 1; j <= colIdx + 1; j++) {
  //         var currCell = board[i][j]
  //         if (j < 0 || j > board[0].length - 1) continue;
  //         if (i === rowIdx && j === colIdx) continue;
  //           var elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
  //           elCell.classList.add('shown')
  //           if (currCell.minesAroundCount) elCell.innerHTML = currCell.minesAroundCount
  //           if (!currCell.minesAroundCount) elCell.innerHTML = ''
  //           if (currCell.isMine) elCell.innerHTML = MINE
  //           elCell.classList.add('.shown')
  //           setInterval(() => {
  //               currCell.innerHTML = ''
  //               elCell.classList.remove('.shown')
  //           }, 2000);
  //       }
  //   }
  // }