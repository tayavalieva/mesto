import Popup from "./popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, formSelector, submitHandler, openHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._openHandler = openHandler;
    this._form = this._popup.querySelector(formSelector);
  }

  open() {
    this._openHandler();
    super.open();
  }

  _getInputsArray() {
    const inputs = Array.from(this._form.querySelectorAll(".popup__input"));
    return inputs;
  }

  _getInputValues() {
    const values = {};
    const inputs = this._getInputsArray();

    inputs.forEach((input) => {
      values[input.name] = input.value;
    });
    //   {user_name: '...', about: '...'}
    //   {place_name: '...', photo_link: '...'}
    console.log(values);
    return values;
  }

  getForm() {
    return this._form;
  }

  setEventListeners() {
    super.setEventListeners();

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
