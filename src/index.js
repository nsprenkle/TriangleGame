let Game = require('./game.js')
let $ = require('jquery')

let game = new Game()
drawBoard()

function drawBoard () {
  let spaces = $('.circle')

  spaces.each((i, space) => {
    let id = $(space).data('id')
    $(space).text(game.board[id])
  })
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
