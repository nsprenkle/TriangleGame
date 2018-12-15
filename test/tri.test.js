const Game = require('../tri.js')

const startingBoard = [
  [1],
  [2, 3],
  [4, 5, 6],
  [7, 8, 9, 10],
  [11, 12, 13, 14, 15]
]

let game

beforeAll(() => {
  game = new Game()
})

beforeEach(() => {
  game.reset()
})

test('Can cretate game board', () => {
  expect(game.board).toEqual(startingBoard)
})

describe('Move', () => {
  let piece1 = { row: 0, column: 0 }
  let piece4 = { row: 2, column: 0 }
  let piece5 = { row: 2, column: 1 }
  let piece6 = { row: 2, column: 2 }
  let piece7 = { row: 3, column: 0 }
  let piece8 = { row: 3, column: 1 }
  let piece10 = { row: 3, column: 3 }
  let piece12 = { row: 4, column: 1 }
  let piece14 = { row: 4, column: 3 }

  it('Can jump in same row, left to right', () => {
    game.remove(piece6)
    expect(game.move(piece4, piece6)).toBeTruthy()
  })

  it('Can jump in same row, right to left', () => {
    game.remove(piece4)
    expect(game.move(piece6, piece4)).toBeTruthy()
  })

  it('Can jump across rows, top to bottom', () => {
    game.remove(piece12)
    expect(game.move(piece5, piece12)).toBeTruthy()
  })

  it('Can jump across rows, bottom to top', () => {
    game.remove(piece5)
    expect(game.move(piece12, piece5)).toBeTruthy()

    game.remove(piece5)
    expect(game.move(piece14, piece5)).toBeTruthy()
  })

  it('Cannot jump a bad number of columns', () => {
    game.remove(piece5)
    expect(game.move(piece4, piece5)).toBeFalsy()
  })

  it('Cannot jump a bad number of rows', () => {
    game.remove(piece10)
    expect(game.move(piece5, piece10)).toBeFalsy()

    game.remove(piece7)
    expect(game.move(piece1, piece7)).toBeFalsy()
  })

  it('Cannot jump with a piece in the end position', () => {
    expect(game.move(piece12, piece5)).toBeFalsy()
  })

  it('Cannot jump without a piece in the start position', () => {
    game.remove(piece6) // remove piece in start position
    game.remove(piece4)
    expect(game.move(piece6, piece4)).toBeFalsy()
  })

  it('Cannot jump in same row without a piece in between', () => {
    game.remove(piece5) // remove jumped piece
    game.remove(piece4)
    expect(game.move(piece6, piece4)).toBeFalsy()
  })

  it('Cannot jump across row without a piece in between', () => {
    game.remove(piece8) // remove jumped piece
    game.remove(piece12)
    expect(game.move(piece5, piece12)).toBeFalsy()
  })
})

test('Remove takes a piece from the board', () => {
  expect(game.remove({ row: 0, column: 0 })).toBeTruthy()
  expect(game.board[0][0]).toBeNull()

  // Shouldn't affect other pieces
  expect(game.board[1][0]).not.toBeNull()

  // Can't remove a piece that already is removed
  expect(game.remove({ row: 0, column: 0 })).toBeFalsy()
})
