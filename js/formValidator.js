class FormValidator {
  checkInputValidity(event) {
    const error = event.target.closest("label").querySelector(".popup__error");
    const targetState = event.target.validity;
    if (targetState.valueMissing) {
      return this.showError(error, "Это обязательное поле");
    }
    if (targetState.tooLong || targetState.tooShort) {
      return this.showError(error, "Должно быть от 2 до 30 символов");
    }
    this.hideError(error);
  }

  setSubmitButtonState(form) {
    const formElements = Array.from(form.elements);
    const inputs = formElements.filter(e => {
      return e.classList.contains("popup__input");
    });
    const button = formElements.find(e => e.type == "submit");
    const inputsLength = inputs.every(e => {
      return e.value.length >= 2 && e.value.length < 100 ? true : false;
    });
    if (inputsLength) {
      button.removeAttribute("disabled", true);
      button.classList.add("popup__button_type_active");
    } else {
      button.setAttribute("disabled", true);
      button.classList.remove("popup__button_type_active");
    }
  }

  setEventListeners = (e) => {
    const form = e.currentTarget;
    this.setSubmitButtonState(form);
    this.checkInputValidity(e);
  }
  reset = (form) => {
    const formElements = Array.from(form.elements);
    formElements.filter(e => {
      return e.classList.contains("popup__input");
    }).forEach(e=> {
      this.hideError(e.closest("label").querySelector(".popup__error"))
    })
  }
  showError(error, text) {
    error.textContent = text;
    error.style.display = "block";
  }

  hideError(error) {
    error.textContent = "";
    error.style.display = "";
  }
  sendError(button, err) {
    button.classList.add('error')
    button.textContent = 'Попробуй позже'
  }
}
