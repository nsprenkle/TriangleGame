const Game = require('../src/game.js')

const startingBoard = [null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

let game = new Game()

beforeEach(() => {
  game.reset()
})

test('Can cretate game board', () => {
  expect(game.board).toEqual(startingBoard)
})

describe('Move', () => {
  it('Can jump in same row, left to right', () => {
    game.remove(5)
    expect(game.move(3, 5)).toBeTruthy()
    expect(game.board[3]).toBeNull()
    expect(game.board[4]).toBeNull()
  })

  it('Can jump in same row, right to left', () => {
    game.remove(11)
    expect(game.move(13, 11)).toBeTruthy()
  })

  it('Can jump across rows, top to bottom', () => {
    game.remove(11)
    expect(game.move(4, 11)).toBeTruthy()
  })

  it('Can jump across rows, bottom to top', () => {
    game.remove(4)
    expect(game.move(11, 4)).toBeTruthy()

    game.remove(4)
    expect(game.move(13, 4)).toBeTruthy()
  })

  it('Cannot jump a bad number of columns', () => {
    game.remove(4)
    expect(game.move(3, 4)).toBeFalsy()
  })

  it('Cannot jump a bad number of rows', () => {
    game.remove(9)
    expect(game.move(4, 9)).toBeFalsy()

    game.remove(6)
    expect(game.move(0, 6)).toBeFalsy()
  })

  it('Cannot jump with a piece in the end position', () => {
    expect(game.move(11, 4)).toBeFalsy()
  })

  it('Cannot jump without a piece in the start position', () => {
    game.remove(5) // remove piece in start position
    game.remove(3)
    expect(game.move(5, 3)).toBeFalsy()
  })

  it('Cannot jump in same row without a piece in between', () => {
    game.remove(4) // remove jumped piece
    game.remove(3)
    expect(game.move(5, 3)).toBeFalsy()
  })

  it('Cannot jump across row without a piece in between', () => {
    game.remove(7) // remove jumped piece
    game.remove(11)
    expect(game.move(4, 11)).toBeFalsy()
  })
})

test('Remove takes a piece from the board', () => {
  expect(game.board[2]).not.toBeNull()
  expect(game.remove(2)).toBeTruthy()
  expect(game.board[2]).toBeNull()

  // Can't remove a piece that already is removed
  expect(game.remove(2)).toBeFalsy()
})

test('Pieces left counts number of remaining pieces', () => {
  expect(game.piecesLeft()).toBe(14)
  game.remove(1)
  expect(game.piecesLeft()).toBe(13)
})

test('Available moves', () => {
  expect(game.availableMoves()).toHaveLength(2)
})
