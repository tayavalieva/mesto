import Popup from "./popup.js";

class PopupWithSubmit extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    // this._submitBtnSelector = submitBtnSelector;
    this._submitHandler = submitHandler;
  }

  setEventListeners() {
    super.setEventListeners();
    const submitButton = this._popup.querySelector(".popup__submit-button");

    submitButton.addEventListener("click", (e) => {
      e.preventDefault();
      this._submitHandler();
      this.close();
    });
  }
}

export default PopupWithSubmit;
