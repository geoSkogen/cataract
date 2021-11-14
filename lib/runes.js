'use strict'

const runes = document.querySelectorAll('.cunieform')
const binstrs = [
  '000',
  '001',
  '010',
  '011',
  '100',
  '101',
  '110',
  '111'
]
var side = true

runes.forEach( (rune) => {
  rune.addEventListener('click', function (event) {
    let intval = (rune.className.indexOf('c-') > -1) ?

      (Number(
        rune.className.slice(
          rune.className.indexOf('c-')+2,
          rune.className.length
        )
      )) : 0

      binstr_disp(binstrs[intval])
  })

})

function binstr_disp(binstr) {
  let indexval = (side) ? 0 : 3
  binstr.split('').forEach( function (atom) {
    document.querySelector(
      '#calc-screen-' + indexval.toString()
      ).innerHTML = atom
      indexval++
  })
  side = !side
}
