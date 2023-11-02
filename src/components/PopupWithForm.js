import Popup from '../components/Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popup, callback) {
    super(popup);
    this._callback = callback;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._popupInputs = this._popupForm.querySelectorAll('.popup__form-input');
    this._submitBtn = this._popup.querySelector('.popup__btn-submit');
  }

  _getInputValues() {
    const data = {};
    this._popupInputs.forEach((item) => {
      data[item.name] = item.value;
    });
    return data;
  }

  setInputValues(data) {
    this._popupInputs.forEach((item) => {
      item.value = data[item.name];
    });
  }

  setEventListeners() {
    this._popupForm.addEventListener('submit', this._handleSubmitForm);
    super.setEventListeners();
  }

  removeEventListeners() {
    this._popupForm.removeEventListener('submit', this._handleSubmitForm);
    super.removeEventListeners();
  }

  _handleSubmitForm = () => {
    this._submitBtn.textContent = 'Saving...';
    this._callback(this._getInputValues());
  };

  reset() {
    this.close();
    this._popupForm.reset();
    this._submitBtn.textContent = 'Save';
  }
}
