import Popup from '../components/Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popup, handleSubmit, loadingButtonText) {
    super(popup);
    this._handleSubmit = handleSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._popupInputs = this._popupForm.querySelectorAll('.popup__form-input');
    this._submitBtn = this._popup.querySelector('.popup__btn-submit');
    this._buttonText = this._submitBtn.textContent;
    this._loadingButtonText = loadingButtonText;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitBtn.textContent = this._loadingButtonText;
    } else {
      this._submitBtn.textContent = this._buttonText;
    }
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

  _handleSubmitForm = (evt) => {
    this._handleSubmit(this._getInputValues());
    evt.preventDefault();
  };

  reset() {
    this._popupForm.reset();
  }
}
