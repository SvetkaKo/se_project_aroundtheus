import Popup from '../components/Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popup, card) {
    super(popup);
    this._card = card;
    this._popupPictureImg = popup.querySelector('.popup__picture-img');
    this._popupPictureTitle = popup.querySelector('.popup__picture-title');
  }

  open() {
    this._popupPictureImg.src = this._card._link;
    this._popupPictureImg.alt = this._card._name;
    this._popupPictureTitle.textContent = this._card._name;

    this._isOpen = true;
    this._popup.classList.add('popup_opened');
  }
}
