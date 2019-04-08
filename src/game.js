const movesets = require('./movesets')

class Game {
  constructor () {
    this.reset()
  }

  /** Gets available moves for the current board layout
   * @returns array of valid moves, example: opening moveset would be  @example[{ space: 0, jump: 1, end: 3 }, { space: 0, jump: 2, end: 5 }]
   */
  availableMoves () {
    let availableMoves = []

    // iterate over spaces
    Object.keys(movesets).forEach((space) => {
      movesets[space].forEach(move => {
        if (this.board[space] !== null &&
          this.board[move.end] == null &&
          this.board[move.jump] !== null) {
          let { jump, end } = move
          availableMoves.push({ space, jump, end })
        }
      })
    })

    return availableMoves
  }

  piecesLeft () {
    return this.board.filter(piece => piece !== null).length
  }

  reset () {
    this.board = [null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
  }

  /** Move a piece from start space to end space
   * @param startSpace the index of the space to move from
   * @param endSpace the index of the space to move to
   *
   * @returns true for a successful move, false for a bad move, logs error
   */
  move (startSpace, endSpace) {
    const { valid, reason, jump } = this.isMoveValid(startSpace, endSpace)

    if (!valid) {
      console.error(`Invalid move: ${reason}`)
      return false
    }

    // Move the start piece to the end piece
    this.board[endSpace] = this.board[startSpace]
    this.remove(startSpace)
    this.remove(jump)

    return true
  }

  isMoveValid (startSpace, endSpace) {
    let valid = false

    // Start piece should exist
    if (!this.board[startSpace]) {
      return { valid, reason: 'no start piece' }
    }

    // End piece should not exist
    if (this.board[endSpace]) {
      return { valid, reason: 'end space occupied' }
    }

    // Find valid move from start space
    const validMove = movesets[startSpace].find(move => {
      return move.end === endSpace
    })

    // End space should be a valid move from start
    if (validMove == null) {
      return { valid, reason: 'invalid end space' }
    }

    console.log(`Found valid move: ${startSpace} to ${endSpace}, jumping ${validMove.jump}`)

    // Jump piece should exist
    if (!this.board[validMove.jump]) {
      return { valid, reason: 'no jump piece' }
    }

    return { valid: true, jump: validMove.jump }
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
