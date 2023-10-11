import Popup from '../components/Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popup, callback) {
    super(popup);
    this._callback = callback;
    this._popupForm = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
    this._popupInputs = this._popupForm.querySelectorAll('.popup__form-input');
    const data = {};
    this._popupInputs.forEach((item) => {
      data[item.name] = item.value;
    });
    return data;
  }

  setEventListeners() {
    this._popupForm.addEventListener('submit', () => {
      this._callback(this._getInputValues());
      this.close();
    });
    super.setEventListeners();
  }

  close() {
    //It modifies the close() parent method in order to reset the form once the popup is closed.
    this._popupForm.reset();
    super.close();
  }
}
