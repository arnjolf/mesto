const validateConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const enableValidation = (config) => {
  const formList = Array.from(
    document.querySelectorAll(`${config.formSelector}`)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, config);
  });
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(`${config.inputSelector}`)
  );
  const buttonElement = formElement.querySelector(
    `${config.submitButtonSelector}`
  );

  inputList.forEach((inputElement) => {
    toggleButtonState(inputList, buttonElement, config);
    inputElement.addEventListener("input", function () {
      toggleButtonState(inputList, buttonElement, config);
      checkInput(formElement, inputElement, config);
    });
  });
};

const checkInput = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorSpan = formElement.querySelector(`.${inputElement.id}-error`);
  errorSpan.textContent = errorMessage;
  errorSpan.classList.add(config.errorClass);
  inputElement.classList.add(config.inputErrorClass);
};

const hideInputError = (formElement, inputElement, config) => {
  const errorSpan = formElement.querySelector(`.${inputElement.id}-error`);
  errorSpan.textContent = "";
  errorSpan.classList.remove(config.errorClass);
  inputElement.classList.remove(config.inputErrorClass);
};

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

enableValidation(validateConfig);
