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

function lexic(arg) {
  const char_arr = [
    'C','D','3','H','I','Y','K','L','M','N','0','5','T','V','X'
  ]
  let result_str = ''
  if (!Array.isArray(arg)) {
    arg = [arg]
  }
  arg.forEach( (strlen) => {

    var index
    for (let i = 0; i < strlen; i++) {
      let randint = Math.floor( Math.random() * char_arr.length )

      while (randint===index) {
        randint = Math.floor( Math.random() * char_arr.length )
      }

      index = randint
      result_str += char_arr[index]
    }
    result_str += ' '
  })
  return result_str
}

console.log(lexic(['3','3','3']))
