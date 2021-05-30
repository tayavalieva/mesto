import Popup from "./popup.js";

class PopupWithSubmit extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
  }

  _removeEventListeners() {
    super._removeEventListeners();
    const submitButton = this._popup.querySelector(".popup__save-button");
    submitButton.removeEventListener("click", this._handleSubmitBtn);
  }

  _handleSubmitBtn = (e) => {
    e.preventDefault();
    this._submitHandler();
    this.close();
  };

  _setEventListeners() {
    super._setEventListeners();
    const submitButton = this._popup.querySelector(".popup__save-button");

    submitButton.addEventListener("click", this._handleSubmitBtn);
  }
}

export default PopupWithSubmit;
