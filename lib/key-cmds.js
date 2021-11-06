'use strict'

// imports active_glyph from navigator

var keys = {}
keys.dirs = {
  'NumpadSubtract':'desc',
  'NumpadAdd':'asc',
  'Numpad6':'right',
  'Numpad4':'left',
  'Numpad2':'down',
  'Numpad8':'up'
}

window.addEventListener('keydown', function (event) {

  if (Object.keys(keys.dirs).indexOf(event.code.toString())>-1) {

    active_glyph[keys.dirs[event.code]]()
  }

})
