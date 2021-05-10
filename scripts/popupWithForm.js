import Popup from "./popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler, openHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._openHandler = openHandler;
  }

  open() {
    this._openHandler();
    super.open();
  }

  _getInputValues() {
    const values = {};
    const inputs = Array.from(this._form.querySelectorAll(".popup__input"));
    inputs.forEach((input) => {
      values[input.name] = input.value;
    });
    //   {user_name: '...', about: '...'}
    //   {place_name: '...', photo_link: '...'}

    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form = this._popup.querySelector(".popup__form");
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._submitHandler(this._getInputValues());
      this.close();
    });
  }

  close() {
    this._form.reset();
    super.close();
  }
}

export default PopupWithForm;
