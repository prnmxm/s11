export default class Popup {
  constructor(modal) {
    this.modal = modal;
    this.close = this.close.bind(this);
  }

  open(){
    this.modal.addEventListener("click", this.close);
    document.body.style.overflow = "hidden";
  }

  close(event){
    if (event.target.classList.contains("popup") || event.target.classList.contains("popup__close") || event.type === "submit") {
      document.body.style.overflow = "";
      this.modal.removeEventListener("click", this.close);
    }
  }
  noValidate() {
    this.modal.querySelector("form").setAttribute("novalidate", true);
  }
}
