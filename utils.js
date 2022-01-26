
// A function that return a time like this : 0.082 ...

function stopWatch() {
    
    function startStopWatch() {
        gWatchInterval = setInterval(updateWatch, 1)
        gStartTime = Date.now()
      }
      
      function updateWatch() {
        var now = Date.now()
        var time = ((now - gStartTime) / 1000).toFixed(3)
        var elTime = document.querySelector('.time')
        elTime.innerText = time
      }
      
      function endStopWatch() {
        clearInterval(gWatchInterval)
        gWatchInterval = null
      }

      return elTime

}  


function negsCount(cellI, cellJ, board) {
let  negsCounter = 0

  for (var i = cellI - 1; i <= cellJ + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = cellI - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= board[i].length) continue;
            if (i === cellI && j === cellJ) continue;
          if (board[i][j].isMine) negsCounter++
                 
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
  