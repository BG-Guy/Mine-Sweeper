'use strict';
var gBoard;
var gGame = {
  isOn: true,
  safeClicks: 3,
  isFirstClick: true,
  shownCount: 0,
  markedCount: 0,
};


var elSmiley = document.querySelector('.smiley')


var gSafeClicks
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
    updateLives()
    gSafeClicks = 3

    gGame = {
        isOn: true,
        isFirstClick: true,
        shownCount: 0,
        markedCount: 0,
        safeClicks: 3,
      
    }
  }

function cellClicked(event,elCell, i, j) {

    if (gGame.isHintMode) {
      safeClick(elCell, i, j)
      return
    }
    console.log(event)
    var currCell = gBoard[i][j]
    console.log(currCell)
    //if first click
    if (gGame.isFirstClick) {
      console.log('first click');
      gInterval = setInterval(startStopWatch, 10)
      gGame.isFirstClick = false;
      //if first click render mines
      getMines(gBoard, gLevel.mines);
      setMinesNegsCount();
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
    gGame.lives--
    var elLives = document.querySelector('.lives')
    elLives.innerHTML = `Lives ${'❤️'.repeat(gLevel.lives)}`
    
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
    gGame.safeClicks--
    // get random cell and check if mine, if so turn the class
    var elSafeCells = []
    for (let i = 0; i < gLevel.size; i++) {
      for (let j = 0; j < gLevel.size; j++) {
        var currCell = gBoard[i][j]
        var elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
        if (!currCell.isMine && !currCell.isMarked) elSafeCells.push(elCell)
    }
  }
    var randIdx = getRandomInt(0, elSafeCells.length)
    var elRandomSafeCell = elSafeCells[randIdx]
    var elSafeClicks = document.querySelector('.safe-click')
    elSafeClicks.innerHTML = '🧿'.repeat(gGame.safeClicks) 
    elRandomSafeCell.classList.add('shown')
    currCell.minesAroundCount ? elRandomSafeCell.innerHTML = currCell.minesAroundCount : elRandomSafeCell.innerHTML = '';
    setTimeout(() => {
      elRandomSafeCell.classList.remove('shown')
      elRandomSafeCell.innerHTML = ''
    }
      , 1000)
  
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