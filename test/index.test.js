import uut from '../src/index'
import $ from 'jquery'

// let uut = require('../src/index')
// const $ = require('jquery')

document.body.innerHTML =
  `<div class="row" data-row=1>
    <div class="circle" data-id=1></div>
  </div>`

describe('selectPiece', () => {
  it('Clicking once selects the piece', () => {
    uut.selectPiece($('.circle').get(0))
    expect($('.circle').hasClass('selected')).toBeTruthy()
  })

  it('Clicking a selected piece deselects it and doesn\'t call move function', () => {
    const moveSpy = jest.fn()
    uut.move = moveSpy

    $('.circle').addClass('selected')

    uut.selectPiece($('.circle').get(0))
    expect($('.circle').hasClass('selected')).toBeFalsy()
    expect(moveSpy).not.toHaveBeenCalled()
  })
})
