'use strict'

// imports mapper from mapper
// imports icons from dom-helper

// exports app

// exports 'active elements'
//   active_glyph
//   active_stanza
//   active_map

// exports glyph_els - 'listener elements'

const app = {}

app.table = {}
app.floor = {}
app.story = {}
// import from mapper.js
app.mapper = mapper

app.positioner = function (id) {
  var nest_arr = id.split('_')
  var quads_arr = nest_arr[0].split('-')
  return {
    'row' : Number(nest_arr[1]),
    'col' : Number(nest_arr[2]),
    'pos' : quads_arr[0]
  }
}

app.pathfinder = function (id,dir) {

}

app.relocator = function (row_col,pos) {
  var this_pos = (pos && active_glyph.el) ? pos : active_glyph.el.id.split('_')[0]
  var target = '_' + row_col[0].toString() + '_' + row_col[1].toString()
  var el = (pos[0]==='!') ? null : document.getElementById(this_pos + target)
  var former_id = (active_glyph.el) ? active_glyph.el.id : ''

  if (el) {
    if (active_stanza.theme.glyph_char[this_pos + target]) {
      // determine first what the glyph contains
      switch(active_stanza.theme.glyph_char[this_pos + target].exec) {
        case 'a' :
        case 'd' :
            pos = '!' + active_stanza.theme.glyph_char[this_pos + target].exec
            this.floor = {}
            console.log('RELOCATOR')
            console.log('ascend or descend - resetting floor')
          break
        default :
      }
    } else {
      //console.log('no HTML element with ID ' + this_pos + target)
    }

    if (former_id) {
      document.querySelector('#'+former_id).style.border = 'none'
      document.querySelector('#'+former_id).innerHTML = ''
    }

    if (pos[0]!='!') {
      active_glyph = this.glyph_constructor(el)
      active_glyph.el.style.border = '1px solid red'

      active_glyph.el.innerHTML = icons.cursor
    }
  }

  if (pos[0]==='!') {

    let from = null
    let glyphs = []

    if (active_stanza.locality[pos.replace('!','')]) {
      from = pos.replace('!','')
      glyphs = document.querySelectorAll('glyph')
    }
    
    active_stanza = this.shift_stanza(pos.replace('!',''))
    active_map.shift_stanza_dom(active_stanza)

    glyphs.forEach( (glyph) => {
      glyph.innerHTML = ''
    })

    if (from) {

      if (!app.mapper.entrances[from]) {

        let offset_col = (row_col[1]>=3) ? 0 : (row_col[1] = 0) ? 3 : row_col[1]--
        let row_ = target.slice(0,target.length-1)

        document.querySelector(

          '#' + this_pos + row_ + offset_col
        ).click()

      } else {

        document.querySelector(
          '#' + app.mapper.entrances[from]
        ).click()
      }
    }
    //console.log('you go to ' + pos  + '!')
  }
}

app.app = function (pos_props) {

  var car_keys = ['up','down','left','right']
  var cardinals = {}

  car_keys.forEach( (dir) => {
    var this_list = []
    var tally_list = 0;
    var these_coords = [pos_props.row,pos_props.col]

    cardinals[dir] = () => {

      var new_loc = this.mapper.get_directions(dir,pos_props.pos,these_coords)
      /*


      */
      this.relocator(new_loc.coords,new_loc.pos)
    }

    if (this.mapper.map[pos_props.pos]) {
      if (this.mapper.map[pos_props.pos][dir]) {

        this_list = this.mapper.map[pos_props.pos][dir]

        for (var i = 0; i < 3; i++) {
          if (this_list[i] && this_list[i].length) {
            switch(i) {
              case 0 :
              case 1 :
                /*
                console.log('map.' + pos_props.pos + '.' + dir)
                console.log('list ' + i.toString())
                console.log(this_list[i])
                console.log('coords ' + i.toString())
                console.log(these_coords[i])
                */
                if (this_list[i].indexOf(these_coords[i]) != -1) {
                  /*
                  console.log('this is ' + pos_props.pos + ' ' + dir )
                  console.log('your rule is being enforced')
                  */
                  cardinals[dir] = function () { return false }
                } else {
                  /*
                  console.log('this is ' + pos_props.pos + ' ' + dir )
                  console.log('list ' + i.toString() + ' did not contain ' + these_coords[i].toString())
                  */
                }
                break
              case 2 :
                this_list[i].forEach ( (list) => {
                  for (var n = 0; n < list.length; n++) {
                    if (list[n]===these_coords[n]) {
                      tally_list++
                    }
                  }
                  if (tally_list===these_coords.length) {
                    /*
                    console.log('this is ' + pos_props.pos + ' ' + dir )
                    console.log('your rule is being enforced')
                    */
                    cardinals[dir] = function () { return false }
                  } else {
                    /*
                    console.log('this is ' + pos_props.pos + ' ' + dir )
                    console.log('list ' + i.toString() + ' did not contain ' + these_coords)
                    */
                  }
                  tally_list = 0
                })
                break
              default :
                cardinals[dir] = function () { return null }
            }
          } else {
            //console.log('there is no nav rule number ' + i.toString() )
          }
        }
      } else {
        //console.log('pos_props[' + pos_props.pos + '][' + dir + '] not found')
      }
    } else {
      //console.log('pos_props[' + pos_props.pos + '] not found')
    }
  })
  return cardinals
}

app.shift_stanza = function (dir) {
  let id_str = active_stanza.stanza_id
  let story_index = active_stanza.story
  if (active_stanza.locality[dir]) {
    console.log('SHIFT STANZA')
    console.log('stanza shift dir')
    console.log(dir)
    story_index = dir==='a' ? active_stanza.story+1 :
                  dir==='d' ? active_stanza.story-1 :
                  story_index

    id_str = active_stanza.locality[dir]
    console.log('story index for stanza ')
    console.log(story_index)
  }

  return this.stanza_constructor(
    story_index,
    id_str,
    active_map.stories[story_index][id_str]
  )
}


app.stanza_constructor = function (i,id,stanza) {
  console.log('STANZA CONSTRUCTOR')
  if (!this.floor[id]) {
    console.log('floor id not found--new stanza')
    console.log('new floor id is ' + i.toString())
    var coords = id.split('_')
    var new_stanza =  stanza
    new_stanza.story = Number(i),
    new_stanza.stanza_id = id,
    new_stanza.row = Number(coords[0]),
    new_stanza.col = Number(coords[1])
    //
    new_stanza.xyz = [stanza.row,stanza.col,stanza.story]
    //
    this.floor[id] = new_stanza
  }
  return app.floor[id]
}


app.glyph_constructor = function (dom_el) {
  if (!this.table[dom_el.id]) {
    // else : the glyph already exists
    var nav_keys = ['up','down','right','left']
    var glyph = {}
    var pos_props = app.positioner(dom_el.id)
    var nav_props = app.app(pos_props)
    var pos_keys = Object.keys(pos_props)

    glyph.el = dom_el

    pos_keys.forEach( (pos_key) => {
      glyph[pos_key] = pos_props[pos_key]
    })
    nav_keys.forEach( (nav_key) => {
      glyph[nav_key] = nav_props[nav_key]
    })

    glyph.say_hello = function () {

      console.log(this.el.id)

      console.log(this.row)

      console.log(this.col)

      console.log(this.pos)

      console.log(this.up)

      console.log(this.down)

      console.log(this.left)

      console.log(this.right)

    }

    this.table[dom_el.id] = glyph

  }
  //app.table[dom_el.id].say_hello()
  // returns the table element whether it already exists or is newly built
  return this.table[dom_el.id]
}

var glyph_els = document.querySelectorAll('.glyph')

var active_map = app.mapper.tesseract(0,0,0,0,'default')

var active_stanza = app.stanza_constructor(1,'0_0',active_map.stories[1]['0_0'])

var active_glyph = {}

// parent element is .chamber-wrapper, its parent elements are relative/absolute overlay
active_map.dom_chamber = document.querySelectorAll('.chamber')[0]
// parent element is .stanza - separate background, natural flex positioning'stanzas' :
active_map.dom_walls = document.querySelectorAll('.quadrant')

active_map.shift_stanza_dom = function(stanza_data) {

  const portal_icons = {
    n :  document.querySelector('.portal-n'),
    e :  document.querySelector('.portal-e'),
    w :  document.querySelector('.portal-w'),
    s :  document.querySelector('.portal-s'),
  }

  this.dom_chamber.style.background =
  'url("' +  stanza_data.theme.tile_path + '")'

  for (let i = 0; i < this.dom_walls.length; i++) {
    this.dom_walls[i].style.backgroundColor =
      stanza_data.theme.color_scheme

    this.dom_walls[i].style.background =
      'url("' +  stanza_data.theme.wall_path + '")'
  }

  Object.keys( portal_icons ).forEach( (key) => {
    portal_icons[key].className = stanza_data.locality[key] ?
      portal_icons[key].className.replace('closed','open') :
      portal_icons[key].className.replace('open', 'closed')
  })

  glyph_els.forEach( (glyph) => {
    glyph.innerHTML = ''
  })

  Object.keys(stanza_data.theme.glyph_char).forEach( (id) => {
    console.log('SHIFTSTANZA DOM')
    console.log('glyph iterator')
    console.log(id)
    document.querySelector('#' + id).innerHTML =
      icons[stanza_data.theme.glyph_char[id].char]
  })
}

active_map.shift_stanza_dom(active_stanza)

glyph_els.forEach( function (el) {

  el.addEventListener( 'click', function () {
    var former_id = (active_glyph.el) ? active_glyph.el.id : ''
    if (former_id) {
      document.querySelector('#' + former_id).style.border = 'none'
      document.querySelector('#' + former_id).innerHTML = ''
    }
    active_glyph = app.glyph_constructor(el)
    active_glyph.el.style.border = '1px solid red'
    active_glyph.el.innerHTML = icons.cursor
  })
})
