const dominator = {
  box : document.querySelector('#navigator'),
  modal : document.querySelector('.modal'),
  close_modal_button : document.querySelector('.close-modal'),
  //
  toggle_modal : function (json) {
    if (Object.keys(json).length) {
      // articulate the modal dom
      this.box.style.opacity = '0.05'
      this.modal.style.display = 'block'
    } else {
      this.box.style.opacity = '1'
      this.modal.style.display = 'none'
    }
  }
}

dominator.close_modal_button.addEventListener('click', function (event) {
  dominator.toggle_modal({})
})
