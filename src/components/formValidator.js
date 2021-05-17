export class FormValidator {
  constructor(selectors, formElement) {
    this._selectors = selectors;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._selectors.inputSelector)
    );
    this._submitButton = this._formElement.querySelector(
      this._selectors.submitButtonSelector
    );
  }

  _getErrorElement(inputElement) {
    return this._formElement.querySelector(`.${inputElement.id}-error`);
  }

  _showInputError(inputElement, errorMessage) {
    const { errorMessageClass, inputErrorClass } = this._selectors;
    const errorElement = this._getErrorElement(inputElement);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorMessageClass);
    inputElement.classList.add(inputErrorClass);
  }

  _hideInputError(inputElement) {
    const { errorMessageClass, inputErrorClass } = this._selectors;
    const errorElement = this._getErrorElement(inputElement);
    errorElement.textContent = "";
    errorElement.classList.remove(errorMessageClass);
    inputElement.classList.remove(inputErrorClass);
  }

  _checkValidity(inputElement) {
    if (this._isValid(inputElement)) {
      this._hideInputError(inputElement);
    } else {
      const errorMessage = inputElement.validationMessage;
      this._showInputError(inputElement, errorMessage);
    }
  }

  //set button state
  _setButtonState() {
    if (this._formElement === null || this._formElement === undefined) {
      return;
    }

    if (this._hasInvalidInput()) {
      this._submitButton.setAttribute("disabled", true);
      this._submitButton.classList.add(this._selectors.inactiveButtonClass);
    } else {
      this._submitButton.removeAttribute("disabled");
      this._submitButton.classList.remove(this._selectors.inactiveButtonClass);
    }
  }

  //check form's validity
  _isValid(inputElement) {
    return inputElement.validity.valid;
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !this._isValid(inputElement));
  }

  resetValidation() {
    this._inputList.forEach((input) => this._hideInputError(input));
    this._setButtonState();
  }

  //set event listeners to a form
  _setEventListeners() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkValidity(inputElement);
        this._setButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
