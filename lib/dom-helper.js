'use strict'
// no deps
// exports tiles
// exports glyphs
// exports icons
var tiles = document.querySelectorAll('.tile')
var icons = {}
var icon_graph = {
  "sun" : "atom",
  "mercury" : "dna",
  "venus" : "dove",
  "earth" : "globe",
  "mars" : "fist-raised",
  "jupiter" : "bolt",
  "saturn" : "hourglass-half",
  "uranus" : "star-and-crescent",
  "neptune" : "water",
  "pluto" : "skull-crossbones",
  "citadel" : "university",
  "keep" : "building",
  "bug" : "bug",
  "bell" : "bell",
  "staff" : "map-pin",
  "flag" : "flag",
  "tree" : "tree",
  "leaf" : "leaf",
  "cube" : "cube",
  "cubes" : "cubes",
  "golem" : "child",
  "pitfall" : "object-ungroup",
  "puzzle" : "puzzle-piece",
  "medicine" : "medkit",
  "healing" : "heartbeat",
  "key" : "key",
  "lock" : "lock",
  "axe" : "legal",
  "dart" : "fighter-jet",
  "bomb" : "bomb",
  "home" : "stop-circle",
  "cursor":"street-view",
  "asc":"sort-amount-up-alt",
  "desc":"sort-amount-down-alt"
}
if (tiles) {
  tiles.forEach( (tile) => {
    for (var i = 0; i < 4; i++) {
      //
      var glyph_row = document.createElement('div')
      glyph_row.className = 'glyphs flex-row flex-center'
      tile.appendChild(glyph_row)

      for (var ii = 0; ii < 4; ii++) {
        //
        var glyph = document.createElement('div')
        glyph.className = 'glyph'
        glyph.id = tile.id + '_' + (i).toString() + '_' + (ii).toString()
        glyph_row.appendChild(glyph)
      }
    }
  })
}
Object.keys(icon_graph).forEach( (key) => {
  icons[key] = '<i id="' + key + '" class="fa fa-' + icon_graph[key] + '" style="font-size:36px" ></i>'
})
