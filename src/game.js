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
    // Valid move if...
    let valid = false
    let jumpedPiece = {}

    const start = this.getCoordinatesForSpace(startSpace)
    const end = this.getCoordinatesForSpace(endSpace)

    const rowDelta = end.row - start.row
    const columnDelta = end.column - start.column

    // In the same row but difference of exactly 2
    valid = valid || (rowDelta === 0 && Math.abs(columnDelta) === 2)

    // 2 rows away with an offset of 0 or 2 columns
    valid = valid || (Math.abs(rowDelta) === 2 && (columnDelta === 0 || Math.abs(columnDelta) === 2))

    if (!valid) { console.error('Invalid move: bad row/column'); return false }

    // There is a piece in the starting spot
    valid = valid && (this.board[start.row][start.column] != null)
    if (!valid) { console.error('Invalid move: no piece at start location'); return false }

    // There is no piece in the ending spot
    valid = valid && (this.board[end.row][end.column] == null)
    if (!valid) { console.error('Invalid move: piece at end location'); return false }

    // Find and remove jumped piece
    if (rowDelta === 0) {
      jumpedPiece.row = start.row
      jumpedPiece.column = (columnDelta / 2) + start.column
    } else {
      jumpedPiece.row = (rowDelta / 2) + start.row
      jumpedPiece.column = (columnDelta / 2) + start.column
    }

    if (!this.remove(this.getSpaceForCoordinates(jumpedPiece))) { return false }

    // Move the start piece to the end piece
    this.board[end.row][end.column] = this.board[start.row][start.column]
    this.remove(startSpace)

    return valid
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
// export default Game
