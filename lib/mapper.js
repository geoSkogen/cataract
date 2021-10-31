'use strict'

// imports schema from schema

// exports mapper

const mapper = {}

mapper.stories = []

mapper.tesseract = function (x,y,z,r,theme_name) {
  //console.log(theme_name)
  const new_scheme = {
    stories : []
  }

  for (var story_index = 0; story_index < schema.themes[theme_name].length; story_index++) {

    let this_story = schema.themes[theme_name][story_index]
    new_scheme['stories'].push({})

    for (var stanza_index = 0; stanza_index < Object.keys(this_story).length; stanza_index++) {

      let this_stanza = {}
      let this_theme = {}
      let row_col = Object.keys(this_story)[stanza_index]

      for (var stanza_prop_index = 0; stanza_prop_index < schema.stanzas.props.length; stanza_prop_index++) {

        let prop = schema.stanzas.props[stanza_prop_index]

        this_stanza[prop] = schema.stanzas[theme_name][stanza_prop_index]
        // stanza's theme name is the array key for the stanza theme config
      }

      for (var theme_prop_index = 0; theme_prop_index < schema.themes.props.length; theme_prop_index++) {

        if (!theme_prop_index) {
          // the first theme prop is locality, get promoted to the stanza level
          this_stanza[schema.themes.props[theme_prop_index]] =
            schema.themes[theme_name][story_index][row_col][theme_prop_index]

        } else {
          this_theme[schema.themes.props[theme_prop_index]] =

            schema.themes[theme_name][story_index][row_col][theme_prop_index]
        }
      }
      // set add the 'built' theme to the stanza
      this_stanza['theme'] = this_theme
      //
      new_scheme['stories'][story_index][row_col] = this_stanza

    }
  }
  return new_scheme
}

mapper.map = {
  'nw' : {
    'up' : [
      [0]
    ],
    'left' : [
      [],
      [0]
    ]
  },
  'n' : {
    'up' : [
      [],
      [],
      [
        [0,0],
        [0,3]
      ]
    ]
  },
  'ne' : {
    'up' : [
      [0]
    ],
    'right' : [
      [],
      [3]
    ]
  },
  'e' : {
    'right' : [
      [],
      [],
      [
        [0,3],
        [3,3]
      ]
    ]
  },
  'se' : {
    'down' : [
      [3]
    ],
    'right' : [
      [],
      [3]
    ]
  },
  's' : {
    'down' : [
      [],
      [],
      [
        [3,0],
        [3,3]
      ]
    ]
  },
  'sw' : {
    'down' : [
      [3]
    ],
    'left' : [
      [],
      [0]
    ]
  },
  'w' : {
    'left' : [
      [],
      [],
      [
        [0,0],
        [3,0]
      ]
    ]
  }
}

mapper.exits = {
  'n' : {
    'up' :[
    [0,1],
    [0,2]
   ]
  },
  'e' : {
    'right' :[
      [1,3],
      [2,3]
    ]
  },
  's' : {
    'down' : [
      [3,1],
      [3,2]
    ]
  },
  'w' : {
    'left' : [
      [1,0],
      [2,0]
    ]
  }
}


mapper.get_directions = function (dir,pos,row_col) {
  var new_pos = ''
  var new_coords = []
  var new_row = row_col[0]
  var new_col = row_col[1]
  var exit = false

  if (mapper.exits[pos]) {
    if (mapper.exits[pos][dir]) {
      mapper.exits[pos][dir].forEach( (coords) => {
        if (coords[0]===row_col[0] && coords[1]===row_col[1]) {
          exit = true
        }
      })
    }
  }

  switch(dir) {
    case 'up' :
      new_row = (row_col[0]-1 > -1) ? row_col[0]-1 : 3
      break
    case 'down' :
      new_row = (row_col[0]+1 < 4) ? row_col[0]+1 : 0
      break
    case 'left' :
      new_col = (row_col[1]-1 > -1) ? row_col[1]-1 : 3
      break
    case 'right' :
      new_col = (row_col[1]+1 < 4) ? row_col[1]+1 : 0
      break
    default :
  }

  if ( Math.abs(row_col[0]-new_row) > 1 || Math.abs(row_col[1]-new_col) > 1 ) {
    new_pos = (exit)? '!' + pos : mapper.get_new_position(dir,pos)
  }

  new_coords = [new_row, new_col]

  return { coords: new_coords, pos: new_pos }
}

mapper.get_new_position = function (dir,pos) {
  var new_pos = ''
  var slope

  switch(dir) {
    case 'up' :
    case 'down' :
      slope = (dir==='down') ? 's' : 'n'

      switch(pos[0]) {
        case 's' :
        case 'n' :
          new_pos = (pos[1]) ? pos[1] : 'compass'
          break
        case 'c' :
          new_pos = slope
          break
        case 'w' :
        case 'e' :
          new_pos = slope + pos[0]
          break
        default :
      }

      break
    case 'left' :
    case 'right' :
      slope = (dir==='left') ? 'w' : 'e'
      if (pos[1]) {

        switch (pos[1]) {
          case 'e' :
          case 'w' :
            new_pos = pos[0]
            break
          case 'o' :
            new_pos = slope
            break
          default :
        }

      } else {

        switch (pos[0]) {
          case 'n' :
          case 's' :
            new_pos = pos[0] + slope
            break
          case 'c' :
            new_pos = slope
            break
          case 'w' :
          case 'e' :
            new_pos = 'compass'
            break
          default :
        }
      }
      break
    default :
  }
  return new_pos
}

mapper.get_new_stanza_pos = function (cardinal,floor_coords) {
  var new_coords = floor_coords
  var poles = {
    'w' : 'e',
    'e' : 'w',
    's' : 'n',
    'n' : 's',
    'a' : 'compass',
    'd' : 'compass'
  }
  var coords  = [
    {
      'w' : -1,
      'e' : 1
    },
    {
      'n' : 1,
      's' : -1
    },
    {
      'a' : 1,
      'd' : -1
    }

  ]
  for (var i = 0; i < floor_coords.length; i++) {
    if (coords[i][poles[cardinal]]) {
      new_coords[i] += coords[i][poles[cardinal]]
    }
  }
  return { pos : poles[cardinal], coords: new_coords }
}
