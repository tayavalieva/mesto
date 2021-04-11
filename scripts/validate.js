const getErrorElement = (formElement, inputElement) =>
  formElement.querySelector(`.${inputElement.id}-error`);

const getFormInputs = (formElement) =>
  Array.from(formElement.querySelectorAll(".popup__input"));

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = getErrorElement(formElement, inputElement);
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-error_active");
  inputElement.classList.add("popup__input_invalid");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = getErrorElement(formElement, inputElement);
  errorElement.textContent = "";
  errorElement.classList.remove("popup__input-error_active");
  inputElement.classList.remove("popup__input_invalid");
};

const setButtonState = (formElement) => {
  const inputList = getFormInputs(formElement);
  const buttonElement = formElement.querySelector(".popup__save-button");

  const hasInvalidInput = inputList.some(
    (inputElement) => !isValid(inputElement)
  );

  if (hasInvalidInput) {
    buttonElement.setAttribute("disabled", true);
    buttonElement.classList.add("popup__save-button_disabled");
  } else {
    buttonElement.removeAttribute("disabled");
    buttonElement.classList.remove("popup__save-button_disabled");
  }
};

const isValid = (inputElement) => inputElement.validity.valid;

const checkValidity = (formElement, inputElement) => {
  if (isValid(inputElement)) {
    hideInputError(formElement, inputElement);
  } else {
    const errorMessage = inputElement.validationMessage;
    showInputError(formElement, inputElement, errorMessage);
  }
};

const setEventListeners = (formElement) => {
  const inputList = getFormInputs(formElement);

  formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
  });

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkValidity(formElement, inputElement);
      setButtonState(formElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".form"));
  formList.forEach(setEventListeners);
};

enableValidation();
