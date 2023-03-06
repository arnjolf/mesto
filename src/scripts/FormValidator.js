import { validateConfig } from "./constants.js";

class FormValidator {
  constructor(config, formElement) {
    (this._config = config),
      (this._formElement = formElement),
      (this._formSelector = config._formSelector),
      (this._inputSelector = config.inputSelector),
      (this._submitButtonSelector = config.submitButtonSelector),
      (this._inactiveButtonClass = config.inactiveButtonClass),
      (this._inputErrorClass = config.inputErrorClass),
      (this._errorClass = config.errorClass),
      (this._buttonElement = this._formElement.querySelector(
        `${this._submitButtonSelector}`
      )),
      (this._inputList = Array.from(
        this._formElement.querySelectorAll(`${this._inputSelector}`)
      ));
  }

  enableValidation() {
    this._formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      this._toggleButtonState();
      inputElement.addEventListener("input", () => {
        this._toggleButtonState();
        this._checkInput(inputElement);
      });
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.disabled = true;
      this._buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      this._buttonElement.disabled = false;
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }

  _checkInput(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement, errorMessage) {
    const errorSpan = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    errorSpan.textContent = errorMessage;
    errorSpan.classList.add(this._errorClass);
    inputElement.classList.add(this._inputErrorClass);
  }

  _hideInputError = (inputElement) => {
    const errorSpan = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    errorSpan.textContent = "";
    errorSpan.classList.remove(this._errorClass);
    inputElement.classList.remove(this._inputErrorClass);
  };

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState();
  }
}
export { validateConfig, FormValidator };
