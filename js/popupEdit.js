class PopupEdit extends Popup {
  constructor(modal, validator,userInfo, updateUserInfo) {
    super(modal);
    this.validator = validator;
    this.userInfo = userInfo;
    this.updateUserInfo = updateUserInfo;
  }
  open(){
    super.open();
    this.modal.classList.add("popup_is-opened");
    this.renderInfo();
    this.addEvent();
  }
  close(event){
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
      const userData = {};
      const form = e.currentTarget;
      Array.from(form.elements).forEach(e => {
        if (e.type !== "submit") {
          userData[e.name] = e.value;
        }
      });
      this.userInfo.updateUserInfo(userData);
      this.close(e);
  }
  renderInfo = () => {
    const info = this.userInfo.info;
    Array.from(this.modal.querySelector("form").elements).forEach(e => {
      if (e.classList.contains("popup__input")) {
        e.value = info[e.name];
      }
    });
    this.validator.reset(this.modal.querySelector('form'))
    this.validator.setSubmitButtonState(this.modal.querySelector("form"));
  }
}
