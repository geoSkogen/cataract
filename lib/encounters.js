'use strict'

const encounters = {
  '-' : function () {

  },
  'globe' : function () {
    const data = this.catalog.globe
    dominator.toggle_modal(JSON.stringify(data.dom_props))
    return data
  },
  'dergolem' : function () {
    const data = this.catalog.dergolem
    dominator.toggle_modal(JSON.stringify(data.dom_props))
    return data
  },
  'keypuzzle' : function () {
    
  }
}

encounters.catalog = {
  "globe" :  {
    "dom_props" : {
      "modal_head" : "the portal is open",
      "modal_img" : "img/corona.jpg",
      "modal_name" : "globe"
    },
    "name" : "globe",
    "type" : "enigma",
    "resp" : {"cube" : "_globe_portal_handler", "" : ""},
    "hit_points" : "-1",
    "armor_class" : "0",
    "THAc0" : "1",
    "level" : "-1",
    "exp" : "-1",
    "atts" : {
      "str" : "18",
      "dex" : "0",
      "end" : "18",
      "wis" : "18",
      "int" : "0",
      "cha" : "18"
    },
    "engage" : ["distill"],
    "defend" : ["vanish"],
    "enquire" : ["absorb"],
    "respond" : ["doomsiren","corpsedrone"],
    "flee" : ["saltpillar"],
    "chase" : ["absorb"],
    "arsenal" : [],
    "collection" : [],
    "familiars" : [],
    "liturgy" : [],
    "spellbook" : [],
    "talents" : []

  },
  "dergolem" :  {
    "dom_props" : {
      "modal_head" : "the creature speaks . . . ",
      "modal_img" : "img/golem.jpg",
      "modal_name" : "dergolem"
    },
    "name" : "globe",
    "type" : "enigma",
    "resp" : {"cube" : "_globe_portal_handler", "" : ""},
    "hit_points" : "-1",
    "armor_class" : "0",
    "THAc0" : "1",
    "level" : "-1",
    "exp" : "-1",
    "atts" : {
      "str" : "18",
      "dex" : "0",
      "end" : "18",
      "wis" : "18",
      "int" : "0",
      "cha" : "18"
    },
    "engage" : ["distill"],
    "defend" : ["vanish"],
    "enquire" : ["absorb"],
    "respond" : ["doomsiren","corpsedrone"],
    "flee" : ["saltpillar"],
    "chase" : ["absorb"],
    "arsenal" : [],
    "collection" : [],
    "familiars" : [],
    "liturgy" : [],
    "spellbook" : [],
    "talents" : []

  }
}

encounters.init_player =  function () {
  const self = {atts:{}}

  function roll_attr() {
    let result = Math.ceil(Math.random()*18)
    return (result < 3) ? 3 : result
  }

  function roll_hp(int,health,rest) {
    let base = Math.ceil(Math.random()*int)
    let result = base + Math.ceil(health/6) + Math.ceil(rest/3)
    return (result < int/4) ?  int/4 : result
  }

  function roll_thaco(str,dex,wis) {
    let base = Math.ceil(Math.random()*20)
    let mod = Math.ceil(str/3) + Math.ceil(dex/6) + Math.ceil(wis/9)
    return (base - mod > 16) ? 16 : base - mod
  }

  ['str','dex','end','wis','int','cha'].forEach( (attr) => {
    self.atts[attr] = roll_attr()
  })

  self.hit_points = roll_hp(20,self.atts.str,self.atts.end)
  self.armor_class = roll_hp(12,self.atts.wis,self.atts.dex)
  self.THAc0 = roll_thaco(self.atts.str,self.atts.dex,self.atts.wis)
  self.level = 0
  self.exp = 0
  self.name = 'you'
  self.type = 'player'
  self.dom_props = {
    modal_head : 'neophyte',
    modal_name : 'you',
    modal_img : 'img/player.jpg'
  }
  this.self = self
}

encounters.init_player()
