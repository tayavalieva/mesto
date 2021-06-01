import Popup from "./popup.js";

class PopupWithSubmit extends Popup {
  constructor(popupSelector, submitHandler, defaultSubmitButtonText) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._defaultSubmitButtonText = defaultSubmitButtonText;
  }

  _getSubmitBtnElement = () => this._popup.querySelector(".popup__save-button");

  _removeEventListeners() {
    super._removeEventListeners();
    this._getSubmitBtnElement().removeEventListener(
      "click",
      this._handleSubmitBtn
    );
  }

  _handleSubmitBtn = (e) => {
    e.preventDefault();
    this._submitHandler(this);
  };

  setLoading(isLoading) {
    if (isLoading) {
      this._getSubmitBtnElement().textContent = "Удаление...";
    } else {
      this._getSubmitBtnElement().textContent = this._defaultSubmitButtonText;
    }
  }

  _setEventListeners() {
    super._setEventListeners();
    this._getSubmitBtnElement().addEventListener(
      "click",
      this._handleSubmitBtn
    );
  }
}

export default PopupWithSubmit;
