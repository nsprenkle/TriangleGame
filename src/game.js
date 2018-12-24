const movesets = require('./movesets')
const spaces = require('./spaces')

class Game {
  constructor () {
    this.reset()
  }

  reset () {
    this.board = [null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
  }

  getPieceAtSpace (space) {
    return this.board[space]
  }

  /** Maps between a space number and the row/column indecies
   * @param space {number} number 0-14 from the top point of the triangle down and left to right as below
   *
   *       [0],
   *      [1, 2],
   *     [3, 4, 5],
   *   [6, 7, 8, 9],
   * [10, 11, 12, 13, 14]
   *
   * Rows/columns are 0 indexed and similarly flow top to bottom and left to right
   *
   * @returns object with row and col properties
   */
  getCoordinatesForSpace (space) {
    let { row, column } = spaces[space]
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
    this.board[endSpace] = this.board[startSpace]
    this.remove(startSpace)
    this.remove(validMove.jump)

    return true
  }

  /** Removes a piece from the board
   * @returns whether or not a piece existed in the spot before and could be removed
   */
  remove (piece) {
    if (this.board[piece] == null) {
      console.error('Invalid remove: no piece to remove')
      return false
    }

    this.board[piece] = null
    return true
  }
}

module.exports = Game
