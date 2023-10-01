export default class FormValidator {
  constructor(options, form) {
    this._options = options;
    this._form = form;
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(buttonElement, inputList) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._options.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._options.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  _showInputError(inputElement, errorMessage, options) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(options.inputErrorClass);
    errorElement.classList.add(options.errorClass);
    errorElement.textContent = errorMessage;
  }

  _hideInputError(inputElement, options) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(options.inputErrorClass);
    errorElement.classList.remove(options.errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage, this._options);
    } else {
      this._hideInputError(inputElement, this._options);
    }
  }

  _setEventListeners() {
    this._inputList = Array.from(this._form.querySelectorAll(this._options.inputSelector));
    this._buttonElement = this._form.querySelector(this._options.submitButtonSelector);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._buttonElement, this._inputList);
      });
    });
  }

  disableSubmitButton() {
    const button = this._form.querySelector('.popup__btn-submit');
    if (!button.disabled) {
      button.disabled = true;
      button.classList.add('popup__btn-submit_disabled');
    }
  }

  //   resetValidation() {
  //disable the submit button
  //reset validation errors
  //   }

  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners(this._form, this._options);
  }
}
