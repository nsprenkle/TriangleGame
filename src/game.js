const movesets = require('./movesets')

class Game {
  constructor () {
    this.reset()
  }

  reset () {
    this.spaces = [[1], [2, 3], [4, 5, 6], [7, 8, 9, 10], [11, 12, 13, 14, 15]]
    this.board = [[null], [2, 3], [4, 5, 6], [7, 8, 9, 10], [11, 12, 13, 14, 15]]
  }

  getPieceAtSpace (space) {
    let coordinates = this.getCoordinatesForSpace(space)
    return this.board[coordinates.row][coordinates.column]
  }

  /** Maps between a space number and the row/column indecies
   * @param space {number} number 1-15 from the top point of the triangle down and left to right as below
   *
   *       [1],
   *      [2, 3],
   *     [4, 5, 6],
   *   [7, 8, 9, 10],
   * [11, 12, 13, 14, 15]
   *
   * Rows/columns are 0 indexed and similarly flow top to bottom and left to right
   *
   * @returns object with row and col properties
   */
  getCoordinatesForSpace (space) {
    let row = this.spaces.findIndex((row, i) => {
      return row.indexOf(space) !== -1
    })
    let column = this.spaces[row].indexOf(space)

    return { row, column }
  }

  getSpaceForCoordinates (coordinates) {
    return this.spaces[coordinates.row][coordinates.column]
  }

  move (startSpace, endSpace) {
    // Start piece should exist
    if (!this.getPieceAtSpace(startSpace)) {
      console.error('Invalid move: no start piece')
      return false
    }

    // End piece should not exist
    if (this.getPieceAtSpace(endSpace)) {
      console.error('Invalid move: end space occupied')
      return false
    }

    // Find valid moves from start space
    console.log(`Moves for start space: ${movesets[startSpace]}`)
    const validMove = movesets[startSpace].find(move => {
      console.log(`move.end ${move.end}, endSpace ${endSpace}`)
      return move.end === endSpace
    })

    // End space should be a valid move from start
    if (validMove == null) {
      console.error('Invalid move: invalid end space')
      return false
    }

    console.log(`Found valid move: ${startSpace} to ${endSpace}, jumping ${validMove.jump}`)

    // Jump piece should exist
    if (!this.getPieceAtSpace(validMove.jump)) {
      console.error('Invalid move: no jump piece')
      return false
    }

    // Move the start piece to the end piece
    const end = this.getCoordinatesForSpace(endSpace)
    const start = this.getCoordinatesForSpace(startSpace)

    this.board[end.row][end.column] = this.board[start.row][start.column]
    this.remove(startSpace)
    this.remove(validMove.jump)

    return true
  }

  /** Removes a piece from the board
   * @returns whether or not a piece existed in the spot before and could be removed
   */
  remove (piece) {
    piece = this.getCoordinatesForSpace(piece)

    if (this.board[piece.row][piece.column] == null) {
      console.error('Invalid remove: no piece to remove')
      return false
    }

    this.board[piece.row][piece.column] = null
    return true
  }
}

module.exports = Game
