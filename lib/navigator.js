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

    if (former_id) {
      document.querySelector('#'+former_id).style.border = 'none'
      document.querySelector('#'+former_id).innerHTML = ''
    }

    active_glyph = this.glyph_constructor(el)
    active_glyph.el.style.border = '1px solid red'
    active_glyph.el.innerHTML = icons.cursor

  } else if (pos[0]==='!') {
    console.log(pos)
    //
    /*
    el_id = reverse_coords(pos[1])
    dom_el = querySelector(el_id)
    mapper->mapper.get_new_stanza_pos(
      story index interval,
    )
    */
    /*
    active_stanza = stanza_constructor(
      story index int,
      stanza id str format int_int,
      stanza_obj
        mapper['stories'][nn][row_col]
    )

    active_glyph = glyph_constructor(
      dom_el
    )
    */



    console.log('you go to ' + pos  + '!')
  } else {
    console.log('no HTML element with ID ' + this_pos + target)
  }
}

app.app = function (pos_props) {
  // pos_props = { row, col, pos }
  var car_keys = ['up','down','left','right']
  var cardinals = {}

  car_keys.forEach( (dir) => {
    var this_list = []
    var tally_list = 0;
    var these_coords = [pos_props.row,pos_props.col]

    cardinals[dir] = () => {

      var new_loc = this.mapper.get_directions(dir,pos_props.pos,these_coords)
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


app.stanza_constructor = function (i,id,stanza) {
  if (!this.floor[id]) {
    var coords = id.split('_')
    var new_stanza = {
      'story' : Number(i),
      'stanza_id' : id,
      'row' : Number(coords[0]),
      'col' : Number(coords[1])
    }
    var keys = Object.keys(stanza)
    new_stanza.xyz = [stanza.row,stanza.col,stanza.story]
    keys.forEach( (key) => {
      new_stanza[key] = stanza[key]
    })

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

var active_stanza = app.stanza_constructor(0,'0_0',active_map.stories[1]['0_0'])

var active_glyph = {}

// parent element is .chamber-wrapper, its parent elements are relative/absolute overlay
active_map.dom_chamber = document.querySelectorAll('.chamber')[0]
// parent element is .stanza - separate background, natural flex positioning'stanzas' :
active_map.dom_walls = document.querySelectorAll('.quadrant')

active_map.shift_stanza_dom = function(stanza_data) {
  this.dom_chamber.style.background =
  'url("' +  stanza_data.theme.tile_path + '")'

  for (let i = 0; i < this.dom_walls.length; i++) {
    this.dom_walls[i].style.backgroundColor =
      stanza_data.theme.color_scheme
  }
  // @todo : portal icon render here
}



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
