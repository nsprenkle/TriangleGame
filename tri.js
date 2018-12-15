class Game {
  constructor () {
    this.reset()
  }

  reset () {
    this.board = [[1], [2, 3], [4, 5, 6], [7, 8, 9, 10], [11, 12, 13, 14, 15]]
  }

  move (startPiece, endPiece) {
    // Valid move if...
    let valid = false
    let jumpedPiece = {}

    const rowDelta = endPiece.row - startPiece.row
    const columnDelta = endPiece.column - startPiece.column

    console.log(`Row Delta: ${rowDelta}\tColumn Delta: ${columnDelta}`)

    // In the same row but difference of exactly 2
    valid = valid || (rowDelta === 0 && Math.abs(columnDelta) === 2)

    // 2 rows away with an offset of 0 or 2 columns
    valid = valid || (Math.abs(rowDelta) === 2 && (columnDelta === 0 || Math.abs(columnDelta) === 2))

    if (!valid) { console.error('Invalid move: bad row/column'); return false }

    // There is a piece in the starting spot
    valid = valid && (this.board[startPiece.row][startPiece.column] != null)
    if (!valid) { console.error('Invalid move: no piece at start location'); return false }

    // There is no piece in the ending spot
    valid = valid && (this.board[endPiece.row][endPiece.column] == null)
    if (!valid) { console.error('Invalid move: piece at end location'); return false }

    // Find jumped piece
    if (rowDelta === 0) {
      jumpedPiece.row = startPiece.row
      jumpedPiece.column = (columnDelta / 2) + startPiece.column
    } else {
      jumpedPiece.row = (rowDelta / 2) + startPiece.row
      jumpedPiece.column = (columnDelta / 2) + startPiece.column
    }

    // There must be a piece getting jumped
    if (!this.remove(jumpedPiece)) { return false }

    return valid
  }

  /** Removes a piece from the board
           * @returns whether or not a piece existed in the spot before and could be removed
           */
  remove (piece) {
    if (this.board[piece.row][piece.column] == null) {
      console.error('Invalid remove: no piece to remove')
      return false
    }

    this.board[piece.row][piece.column] = null
    return true
  }
}

module.exports = Game
