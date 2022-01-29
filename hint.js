

function useHint(pos1, pos2){
    gGame.hint--
    updateHints()
    
    
        for (var i = pos1 - 1; i <= pos1 + 1; i++) {
          if (i < 0 || i >= gBoard.length) continue;
          for (var j = pos2 - 1; j <= pos2 + 1; j++) {
              var currCell = gBoard[i][j]
              if (j < 0 || j > gBoard[0].length - 1) continue;
                var elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
                elCell.classList.add('shown')
                if (currCell.minesAroundCount) elCell.innerHTML = currCell.minesAroundCount
                if (!currCell.minesAroundCount) elCell.innerHTML = ''
                if (currCell.isMine) elCell.innerHTML = MINE
              
            }
        }
      }

      function hintModeOff(pos1, pos2) {
        gGame.hintMode = false
        var elSmiley = document.querySelector('.smiley')
        elSmiley.innerHTML = '😃'
    
        for (var i = pos1 - 1; i <= pos1 + 1; i++) {
            if (i < 0 || i >= gBoard.length) continue;
            for (var j = pos2 - 1; j <= pos2 + 1; j++) {
                var currCell = gBoard[i][j]
                if (j < 0 || j > gBoard[0].length - 1) continue;
                  var elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
                  elCell.classList.remove('shown')
                  elCell.innerHTML = ''
              }
          }
        }

function updateHints() {
    var elHint = document.querySelector('.hints')
    elHint.innerHTML = '💡'.repeat(gGame.hints)
}

function hintModeOn() {
    gGame.hintMode = true
    var elSmiley = document.querySelector('.smiley')
    elSmiley.innerHTML = '🧙‍♂️'
}