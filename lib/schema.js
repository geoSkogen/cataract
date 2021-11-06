'use strict'

//exports schema

const schema = {}

schema.themes = {
  'props' : ['locality','tile_path','wall_path','color_scheme','glyph_char'],
  'color_names' : [
    'grey',
    'gold',
    'cornflowerblue',
    'forestgreen',
    'olivedrab',
    'dimgrey',
    'indigo',
    'khaki',
    'aliceblue',
    'whitesmoke',
    'burlywood',
    'gold',
    'firebrick',
    'tomato',
    'lavendar',
    'azure',
    'darkslategrey',
    'maroon',
    'darkgreen',
    'lightslategray',
    'silver',
    'darkblue',
    'goldenrod',
    'skyblue',
    'black'
  ],
  'prop_table': [
    []
  ],
  'color_schema' : [
    {}
  ],
  'default' : [
    {
      '0_0' :
      [
       { c: '0_0', a:'0_0', n:null, e:null, s:null, w:null, d:null },
       'img/cobblestone-road_fade.jpg',
       'img/moon_fade.jpg',
       'white',
       {}
      ],
    },
    {
      '0_0' :
      [
       { c: '0_0', a:'0_0', n:'1_0', e:'0_1', s:'-1_0', w:'0_-1' ,d: '0_0' },
       'img/moon_fade.jpg',
       'img/scorched-earth_fade.jpg',
       'white',
       {'e_2_1' : {'char' : 'desc', 'exec' : 'd' }, 'w_2_1' : { 'char': 'asc', 'exec': 'a' }}
      ],
      '1_0' :
      [
       { c: '1_0', a:null, n:null, e:null, s:'0_0', w:null ,d: null },
       'img/moon_fade.jpg',
       'img/scorched-earth_fade.jpg',
       'skyblue',
       {}
      ],
      '0_1' :
      [
       { c: '0_1', a:null, n:null, e:null, s:null, w:'0_0' ,d: null },
       'img/scorched-earth_fade.jpg',
       'img/scorched-earth_fade.jpg',
       'burlywood',
       {}
      ],
      '-1_0' :
      [
       { c: '-1_0', a:null, n:'0_0', e:null, s:null, w:null ,d: null },
       'img/cobblestone-road_fade.jpg',
       'img/scorched-earth_fade.jpg',
       'lightslategray',
       {}
      ],
      '0_-1' :
      [
       { c: '0_-1', a:null, n:null, e:'0_0', s:null, w:null ,d: null },
       'img/cobblestone-road_fade.jpg',
       'img/scorched-earth_fade.jpg',
       'gold',
       {}
      ]
    },
    {
      '0_0' :
      [
      { c: '0_0', a:'0_0', n:null, e:null, s:null, w:null, d:null },
       'img/cobblestone-road_fade.jpg',
       'img/moon_fade.jpg',
       'white',
       {}
      ]
    }
  ]
}

schema.stanzas = {
  'props' : ['theme','tactics','locality'],
  'prop_table' : [
    []
  ],
  'default' : [
    'default',
    {},
    {}
  ]
}
