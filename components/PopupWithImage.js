import Popup from '../components/Popup.js';

export default class PopupWithImage extends Popup {
  constructor(data, popup) {
    super(popup);
  }

  //change parent open() method
  // add image to the popup
  open() {
    console.log(this._popup);
  }
}

function handlePicturePopup(card) {
  const popupPicture = document.querySelector('.popup_picture');
  const popupPictureImg = document.querySelector('.popup__picture-img');
  const popupPictureTitle = document.querySelector('.popup__picture-title');

  popupPictureImg.src = card._link;
  popupPictureImg.alt = card._name;
  popupPictureTitle.textContent = card._name;

  openPopup(popupPicture);
}
