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
    expect(game.getPieceAtSpace(3)).toBeNull()
    expect(game.getPieceAtSpace(4)).toBeNull()
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
  expect(game.getPieceAtSpace(2)).not.toBeNull()
  expect(game.remove(2)).toBeTruthy()
  expect(game.getPieceAtSpace(2)).toBeNull()

  // Can't remove a piece that already is removed
  expect(game.remove(2)).toBeFalsy()
})

test('Get coordinates by space', () => {
  expect(game.getCoordinatesForSpace(0)).toEqual({ row: 0, column: 0 })
  expect(game.getCoordinatesForSpace(1)).toEqual({ row: 1, column: 0 })
  expect(game.getCoordinatesForSpace(2)).toEqual({ row: 1, column: 1 })
  expect(game.getCoordinatesForSpace(3)).toEqual({ row: 2, column: 0 })
  expect(game.getCoordinatesForSpace(4)).toEqual({ row: 2, column: 1 })
  expect(game.getCoordinatesForSpace(5)).toEqual({ row: 2, column: 2 })
  expect(game.getCoordinatesForSpace(6)).toEqual({ row: 3, column: 0 })
  expect(game.getCoordinatesForSpace(7)).toEqual({ row: 3, column: 1 })
  expect(game.getCoordinatesForSpace(8)).toEqual({ row: 3, column: 2 })
  expect(game.getCoordinatesForSpace(9)).toEqual({ row: 3, column: 3 })
  expect(game.getCoordinatesForSpace(10)).toEqual({ row: 4, column: 0 })
  expect(game.getCoordinatesForSpace(11)).toEqual({ row: 4, column: 1 })
  expect(game.getCoordinatesForSpace(12)).toEqual({ row: 4, column: 2 })
  expect(game.getCoordinatesForSpace(13)).toEqual({ row: 4, column: 3 })
  expect(game.getCoordinatesForSpace(14)).toEqual({ row: 4, column: 4 })
})
