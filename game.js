'use strict'
var gBoard;
var gGame = {
    isOn: true,
    lives: 3,

}


const MINE = '💣'
const FLAG = '🚩'


  


function initGame() {
    gBoard = buildBoard()
    renderBoard(gBoard, '.board-container')
    
}


function buildBoard() {
    var SIZE = 4;
    var board = [];
    var mines = getMines(2, 4)

    for (let i = 0; i < SIZE; i++) {
        board.push([]);
        for (let j = 0; j < SIZE; j++) {

            var cell = {
                
                isMine: false,
                minesAroundCount: 0,
                isShown: false,
                isMarked: false,
                isFlagged: false
                
            }
            
            if (i === mines[0].i && j === mines[0].j || i === mines[1].i && j === mines[1].j) {
                cell.isMine = true
            }


            board[i][j] = cell
        }
    }

    console.log(board)
    return board
}


function renderBoard(board, selector) {
    var strHTML = '<table border="0"><tbody>';

    for (var i = 0; i < board.length; i++) {
      strHTML += '<tr>';
      for (var j = 0; j < board[0].length; j++) {
        var cell = board[i][j];
        var className = '';

        if (cell.isMine) {
        className = 'cell mine'

        }
        else className = 'cell'
        let mineNegsCount = negsCount(i, j, board)
        strHTML += `<td oncontextmenu="return false;" onmousedown="cellClicked(event,this,${i},${j},)" 
        data-mineNegs=${mineNegsCount} data-i=${i} data.j=${j} class="${className}"></td>`
      }

      strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';


    
    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;
}


function cellClicked(event,elCell, i,j) {
    console.log(elCell.innerHTML)
    if (!gGame.isOn) return
    if (event.buttons === 1) {
        if (gBoard[i][j].isMine) {
            checkGameOver()
            elCell.innerHTML = MINE
        }
        if (!gBoard[i][j].isShown) gBoard[i][j].isShown = true
        if (gBoard[i][j].flagged) return

       elCell.innerHTML = gBoard[i][j].isMine ? MINE : gBoard[i][j].minesAroundCount 
    }

    if (event.buttons === 2) {
        if (!gBoard[i][j].isFlagged)  {
        gBoard[i][j].isFlagged
        elCell.innerHTML = FLAG
         
        }
    }
}
       
function checkGameOver() {
    if (gGame.lives === 0) gameOver()
    gGame.lives--
}

function setMinesNegsCount(gBoard) {
    for (let i = 0; i < gBoard.length; i++) {
        for (let j = 0; j < gBoard[i]; j++) {
            var minesCount = negsCount(i , j , gBoard)
            gBoard[i][j].minesAroundCount = minesCount
            
        }
        
    }
}


function getMines(amount, boardSize) {
    var mines = []
    for (let i = 0; i < amount; i++) {
        let i = getRandomInt(0, boardSize)
        let j = getRandomInt(0, boardSize)
        var mine = {i: i, j: j}
        mines.push(mine)
    }
     
    return mines
}

