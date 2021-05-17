import { esc } from "./constants";

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close = () => {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  };

  _handleEscClose = (e) => {
    if (e.key === esc) {
      this.close();
    }
  };

  setEventListeners() {
    this._popup
      .querySelector(".popup__close-button")
      .addEventListener("click", () => this.close());
    this._popup
      .querySelector(".popup__overlay")
      .addEventListener("mousedown", () => this.close());
  }
}
