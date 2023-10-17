import Popup from '../components/Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popup, callback) {
    super(popup);
    this._callback = callback;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._popupInputs = this._popupForm.querySelectorAll('.popup__form-input');
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
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._callback(this._getInputValues());
      this.close();
    });
    super.setEventListeners();
  }

  reset() {
    this._popupForm.reset();
  }
}
