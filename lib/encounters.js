'use strict'

const encounters = {
  '-' : function () {

  },
  'z' : function () {
    const data = {
      modal_head:"the portal is open",
      modal_img: "img/corona.jpg"
    }
    dominator.toggle_modal(JSON.stringify(data))
  }
}
