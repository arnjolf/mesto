const validateConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  }

  enableValidation() {
    this._formElement.addEventListener("sumbit", function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  _setEventListeners() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(`${this._config.inputSelector}`)
    );

    const buttonElement = this._formElement.querySelector(
      `${this._config.submitButtonSelector}`
    );

    inputList.forEach((inputElement) => {
      this._toggleButtonState(inputList, buttonElement);
      inputElement.addEventListener("input", () => {
        this._toggleButtonState(inputList, buttonElement);
        this._checkInput(this._formElement, inputElement);
      });
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(this._config.inactiveButtonClass);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(this._config.inactiveButtonClass);
    }
  }

  _checkInput(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  _showInputError(formElement, inputElement, errorMessage) {
    const errorSpan = formElement.querySelector(`.${inputElement.id}-error`);
    errorSpan.textContent = errorMessage;
    errorSpan.classList.add(this._config.errorClass);
    inputElement.classList.add(this._config.inputErrorClass);
  }

  _hideInputError = (formElement, inputElement) => {
    const errorSpan = formElement.querySelector(`.${inputElement.id}-error`);
    errorSpan.textContent = "";
    errorSpan.classList.remove(this._config.errorClass);
    inputElement.classList.remove(this._config.inputErrorClass);
  };

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
}
export { validateConfig, FormValidator };
