import Popup from '../components/Popup.js';

export default class PopupConfirmation extends Popup {
  constructor(popup) {
    super(popup);
    // this._handleDeletePicture = handleDeletePicture;
    this._popupForm = this._popup.querySelector('.popup__form');
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
