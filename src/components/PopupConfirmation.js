import Popup from '../components/Popup.js';

export default class PopupConfirmation extends Popup {
  constructor(popup, handleDeletePicture) {
    super(popup);

    this._handleDeletePicture = handleDeletePicture;
    this._popupForm = this._popup.querySelector('.popup__form');
  }

  open(cardId, element) {
    this._cardId = cardId;
    this._element = element;
    super.open();
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
    this._handleDeletePicture(this._cardId, this._element);
    this.close();
    evt.preventDefault();
  };

  reset() {
    this._popupForm.reset();
  }
}
