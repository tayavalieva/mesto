import { esc } from "./constants";

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add("popup_opened");
    this._setEventListeners();
  }

  close = () => {
    this._popup.classList.remove("popup_opened");
    this._removeEventListeners();
  };

  _removeEventListeners() {
    document.removeEventListener("keydown", this._handleEscClose);
    this._popup
      .querySelector(".popup__close-button")
      .removeEventListener("click", this.close);
    this._popup
      .querySelector(".popup__overlay")
      .removeEventListener("mousedown", this.close);
  }

  _handleEscClose = (e) => {
    if (e.key === esc) {
      this.close();
    }
  };

  _setEventListeners() {
    this._popup
      .querySelector(".popup__close-button")
      .addEventListener("click", this.close);
    this._popup
      .querySelector(".popup__overlay")
      .addEventListener("mousedown", this.close);
    document.addEventListener("keydown", this._handleEscClose);
  }
}
