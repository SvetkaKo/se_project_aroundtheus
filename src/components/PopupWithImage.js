import Popup from '../components/Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._popupPictureImg = popup.querySelector('.popup__picture-img');
    this._popupPictureTitle = popup.querySelector('.popup__picture-title');
  }

  open(name, link) {
    this._popupPictureImg.src = link;
    this._popupPictureImg.alt = name;
    this._popupPictureTitle.textContent = name;
    super.open();
  }
}
