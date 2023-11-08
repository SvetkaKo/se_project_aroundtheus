import Popup from '../components/Popup.js';

export default class PopupConfirmation extends Popup {
  constructor(popup, loadingButtonText) {
    super(popup);
    // this._handleDeletePicture = handleDeletePicture;
    this._popupForm = this._popup.querySelector('.popup__form');
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

  setAction(action) {
    this._action = action;
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
    evt.preventDefault();
    this._action();
  };

  reset() {
    this._popupForm.reset();
  }
}
