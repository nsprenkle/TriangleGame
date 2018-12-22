let Game = require('./game.js')
let $ = require('jquery')

let game = new Game()
drawBoard()

function drawBoard () {
  let rows = $('.row')

  $(rows).each((row, rowElem) => {
    $(rowElem).children('.circle').each((col, colElem) => {
      $(colElem).text(game.board[row][col])
    })
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

  if (!moveFrom) {
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
