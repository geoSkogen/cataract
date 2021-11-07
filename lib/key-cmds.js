'use strict'

// imports active_glyph from navigator

var keys = {}

const nav_buttons = document.querySelectorAll('.nav')

const active_commands = {}

var active_command = null

keys.dirs = {
  'NumpadSubtract':'desc',
  'NumpadAdd':'asc',
  'Numpad6':'right',
  'Numpad4':'left',
  'Numpad2':'down',
  'Numpad8':'up'
}

window.addEventListener( 'keydown', function (event) {

  if (Object.keys(keys.dirs).indexOf(event.code.toString())>-1) {

    active_glyph[keys.dirs[event.code]]()
  }
})

nav_buttons.forEach( (nav_button) => {
  nav_button.addEventListener('click', function (event) {

    if (event.target.id.indexOf('blank')===-1) {
      console.log(event.target.id)
      if (event.target.id==='nav-c') {

      } else {
        active_glyph[event.target.id]()
      }
    }
  })
})
