export class FormValidator {
  constructor(selectors, formElement) {
    this._selectors = selectors;
    this._formElement = formElement;
  }

  _getErrorElement(inputElement) {
    return this._formElement.querySelector(`.${inputElement.id}-error`);
  }

  _getFormInputs() {
    return Array.from(
      this._formElement.querySelectorAll(this._selectors.inputSelector)
    );
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
  _setButtonState(hasInvalidInput) {
    if (this._formElement === null || this._formElement === undefined) {
      return;
    }
    const buttonElement = this._formElement.querySelector(
      this._selectors.submitButtonSelector
    );

    if (hasInvalidInput) {
      buttonElement.setAttribute("disabled", true);
      buttonElement.classList.add(this._selectors.inactiveButtonClass);
    } else {
      buttonElement.removeAttribute("disabled");
      buttonElement.classList.remove(this._selectors.inactiveButtonClass);
    }
  }

  //check form's validity
  _isValid(inputElement) {
    return inputElement.validity.valid;
  }

  _hasInvalidInput() {
    const inputList = this._getFormInputs();
    return inputList.some((inputElement) => !this._isValid(inputElement));
  }

  //set event listeners to a form
  _setEventListeners() {
    const inputList = this._getFormInputs();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkValidity(inputElement);
        this._setButtonState(this._hasInvalidInput());
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
