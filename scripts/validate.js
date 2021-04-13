const getErrorElement = (formElement, inputElement) =>
  formElement.querySelector(`.${inputElement.id}-error`);

const getFormInputs = (formElement, { inputSelector }) =>
  Array.from(formElement.querySelectorAll(inputSelector));

const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  { errorMessageClass, inputErrorClass }
) => {
  const errorElement = getErrorElement(formElement, inputElement);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorMessageClass);
  inputElement.classList.add(inputErrorClass);
};

const hideInputError = (
  formElement,
  inputElement,
  { errorMessageClass, inputErrorClass }
) => {
  const errorElement = getErrorElement(formElement, inputElement);
  errorElement.textContent = "";
  errorElement.classList.remove(errorMessageClass);
  inputElement.classList.remove(inputErrorClass);
};

//Функция setButtonState выполняет сразу две задачи: изменяет состояние кнопки сабмита
//и проверяет инпуты на валидность.
// Функция должна выполнять только одну задачу, в данном случае, менять состояние кнопки сабмита.
//Проверку инпутов на валидность нужно перенести в другую функцию

const setButtonState = (
  formElement,
  hasInvalidInput,
  { submitButtonSelector, inactiveButtonClass }
) => {
  if (formElement === null || formElement === undefined) {
    return;
  }
  const buttonElement = formElement.querySelector(submitButtonSelector);

  if (hasInvalidInput) {
    buttonElement.setAttribute("disabled", true);
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.removeAttribute("disabled");
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

const isValid = (inputElement) => inputElement.validity.valid;

const hasInvalidInput = (formElement, { inputSelector }) => {
  const inputList = getFormInputs(formElement, { inputSelector });
  return inputList.some((inputElement) => !isValid(inputElement));
};

const checkValidity = (
  formElement,
  inputElement,
  { errorMessageClass, inputErrorClass }
) => {
  if (isValid(inputElement)) {
    hideInputError(formElement, inputElement, {
      errorMessageClass,
      inputErrorClass,
    });
  } else {
    const errorMessage = inputElement.validationMessage;
    showInputError(formElement, inputElement, errorMessage, {
      errorMessageClass,
      inputErrorClass,
    });
  }
};

const setEventListeners = (formElement, selectors) => {
  const inputList = getFormInputs(formElement, selectors);

  formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
  });

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkValidity(formElement, inputElement, selectors);
      setButtonState(
        formElement,
        hasInvalidInput(formElement, selectors),
        selectors
      );
    });
  });
};

const enableValidation = (selectors) => {
  const formList = Array.from(
    document.querySelectorAll(selectors.formSelector)
  );
  formList.forEach((form) => setEventListeners(form, selectors));
};

const selectors = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_invalid",
  errorMessageClass: "popup__input-error_active",
};

enableValidation(selectors);

const getForm = (popup, { formSelector }) => popup.querySelector(formSelector);
