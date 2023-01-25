const validateConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const enableValidation = () => {
  const formList = Array.from(
    document.querySelectorAll(`${validateConfig.formSelector}`)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(`${validateConfig.inputSelector}`)
  );
  const buttonElement = formElement.querySelector(
    `${validateConfig.submitButtonSelector}`
  );

  inputList.forEach((inputElement) => {
    toggleButtonState(inputList, buttonElement);
    inputElement.addEventListener("input", function () {
      toggleButtonState(inputList, buttonElement);
      checkInput(formElement, inputElement);
    });
  });
};

const checkInput = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorSpan = formElement.querySelector(`.${inputElement.id}-error`);
  errorSpan.textContent = errorMessage;
  errorSpan.classList.add(validateConfig.errorClass);
  inputElement.classList.add(validateConfig.inputErrorClass);
};

const hideInputError = (formElement, inputElement) => {
  const errorSpan = formElement.querySelector(`.${inputElement.id}-error`);
  errorSpan.textContent = "";
  errorSpan.classList.remove(validateConfig.errorClass);
  inputElement.classList.remove(validateConfig.inputErrorClass);
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add("popup__save-button_disabled");
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove("popup__save-button_disabled");
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

enableValidation();
