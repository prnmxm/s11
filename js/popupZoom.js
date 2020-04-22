class PopupZoom extends Popup {
  open(e) {
    super.open();
    this.modal.classList.add("boxImg__is-opened");
    this.modal
      .querySelector(".boxImg__content")
      .setAttribute(
        "style",
        `${e.target.getAttribute("style")};background-size: cover;`
      );
  }

  close(event) {
    if (!event.currentTarget.classList.contains(".boxImg__content")) {
      document.body.style.overflow = "";
      event.currentTarget.classList.remove("boxImg__is-opened");
      event.currentTarget
        .querySelector(".boxImg__content")
        .setAttribute("style", ``);
      event.currentTarget.removeEventListener("click", this.close);
    }
  }
}
