import Popup from "./popup.js";

class PopupWithForm extends Popup {
  constructor(
    popupSelector,
    formSelector,
    submitHandler,
    openHandler,
    defaultSubmitButtonText
  ) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._openHandler = openHandler;
    this._form = this._popup.querySelector(formSelector);
    this._defaultSubmitButtonText = defaultSubmitButtonText;
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

    return values;
  }

  setLoading(isLoading) {
    const submitButton = this._popup.querySelector(".popup__save-button");
    if (isLoading) {
      submitButton.textContent = "Сохранение...";
    } else {
      submitButton.textContent = this._defaultSubmitButtonText;
    }
  }

  getForm() {
    return this._form;
  }

  _formSubmitHandler = (e) => {
    e.preventDefault();
    this._submitHandler(this._getInputValues());
    this.close();
  };

  _removeEventListeners() {
    super._removeEventListeners();
    this._form.removeEventListener("submit", this._formSubmitHandler);
  }

  _setEventListeners() {
    super._setEventListeners();

    this._form.addEventListener("submit", this._formSubmitHandler);
  }

  close() {
    this._form.reset();
    super.close();
  }
}

export default PopupWithForm;
