import Popup from './Popup.js';

export default class PopupAdd extends Popup {
  constructor(modal, validator, cardList, api) {
    super(modal);
    this.validator = validator;
    this.cardList = cardList;
    this.api = api;
  }

  open() {
    super.open();
    this.modal.classList.add("popup_is-opened");
    this.addEvent();
  }
  close(event) {
    super.close(event)
    if (event.target.classList.contains("popup") || event.target.classList.contains("popup__close") || event.type === "submit") {
      event.target.closest(".popup").classList.remove("popup_is-opened"); 
      this.delEvent();
    }
  }
  addEvent = () => {
    this.modal.querySelector("form").addEventListener("input", this.validator.setEventListeners);
    this.modal.querySelector("form").addEventListener("submit", this.formSend);
  }
  delEvent = () => {
    this.modal.querySelector("form").removeEventListener("input", this.validator.setEventListeners);
    this.modal.querySelector("form").removeEventListener("submit", this.formSend);
  } 
  formSend = (e) => {
    e.preventDefault();
    const cardData = {};
    const form = e.currentTarget;
    Array.from(form.elements).forEach(e => {
      if (e.type !== "submit") {
        cardData[e.name] = e.value;
      }
    });
    this.api.addCard(cardData).then(res=>{
        this.cardList.addCard(res);
        form.reset()
        this.close(e);
        return res;
    }).catch(err=> console.log(err))

  }
}
