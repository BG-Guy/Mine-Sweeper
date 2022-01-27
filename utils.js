
// A function that return a time like this : 0.082 ...

function startStopWatch() {
  gWatchInterval = setInterval(updateWatch, 1)
  gStartTime = Date.now()
}

function updateWatch() {
  var now = Date.now()
  var time = ((now - gStartTime) / 1000).toFixed(3)
  var elTime = document.querySelector('.timer')
  elTime.innerText = time
}

function endStopWatch() {
  clearInterval(gWatchInterval)
  gWatchInterval = null
}




function expandShown(board, rowIdx, colIdx, elCell) {

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
      if (i < 0 || i >= board.length) continue;
      for (var j = colIdx - 1; j <= colIdx + 1; j++) {

          if (j < 0 || j > board[0].length - 1) continue;
          if (board[i][j].isMine) continue;

          var elementCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)

          if (board[i][j].minesAroundCount === 0 && !board[i][j].isMine) {
            elementCell.innerHTML = ''
            board[i][j].isShown = true
            elementCell.style.backgroundColor = 'lightblue'
          }

          else {
            elementCell.innerHTML = board[i][j].minesAroundCount
            board[i][j].isShown = true
            elementCell.style.backgroundColor = 'lightblue'
            }
        }
    }
}

function negsCount(board, rowIdx, colIdx, event, elCell) {
  var negsCounter = 0
  for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > board[0].length - 1) continue;
            if (i === rowIdx && j === colIdx) continue;
          if (board[i][j].isMine) negsCounter++;
             
        }
    }
    
    return negsCounter
     
}





  
  // location such as: {i: 2, j: 7}
  function renderCell(location, value) {
    // Select the elCell and set the value
    var elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
    elCell.innerHTML = value;
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }
  