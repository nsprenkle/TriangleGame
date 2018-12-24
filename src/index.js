let Game = require('./game.js')
let $ = require('jquery')

// Initialize page
let game = new Game()
let remainingMoves = []

drawBoard()
getRemainingMoves()

function drawBoard () {
  let spaces = $('.circle')

  spaces.each((i, space) => {
    let id = $(space).data('id')
    $(space).text(game.board[id])
  })
}

function getRemainingMoves () {
  remainingMoves = game.availableMoves()
  $('#available-moves').text(JSON.stringify(remainingMoves))
}

let moveFrom, moveTo

$('.circle').on('click', (e) => { selectPiece(e.target) })

function selectPiece (selector) {
  let space = $(selector).data('id')

  let selected = $(selector).hasClass('selected')

  if (selected) {
    $(selector).removeClass('selected')
  } else {
    $(selector).addClass('selected')
  }

  if (moveFrom == null) {
    moveFrom = space
  } else {
    moveTo = space
    move()
  }

  drawBoard()
  getRemainingMoves()
  checkWinLose()
}

function checkWinLose () {
  if (remainingMoves.length === 0) {
    if (game.piecesLeft() === 1) {
      window.alert('You win!')
    } else {
      window.alert('No moves left, you lost')
    }
  }
}

function move () {
  console.log('Called move')
  const validMove = game.move(moveFrom, moveTo)

  if (!validMove) {
    window.alert(`Invalid move ${moveFrom} to ${moveTo}`)
  }

  clearSelection()
}

function clearSelection () {
  moveFrom = null
  moveTo = null

  $('.circle').removeClass('selected')
}

module.exports = { selectPiece, move, drawBoard }
