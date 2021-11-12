const dominator = {
  box : document.querySelector('#navigator'),
  modal : document.querySelector('.modal'),
  modal_name : document.querySelector('#encounter-name'),
  modal_head : document.querySelector('#encounter-head'),
  modal_img : document.querySelector('#encounter-img'),
  close_modal_button : document.querySelector('.close-modal'),
  //
  toggle_modal : function (json) {
    const data = JSON.parse(json)
    if (Object.keys(data).length) {
      this.modal_name.innerHTML = data.modal_name
      this.modal_head.innerHTML = data.modal_head
      this.modal_img.src = data.modal_img
      this.box.style.opacity = '0.05'
      this.modal.style.display = 'block'
    } else {
      this.box.style.opacity = '1'
      this.modal.style.display = 'none'
    }
  }
}

dominator.close_modal_button.addEventListener('click', function (event) {
  dominator.toggle_modal('{}')
})
