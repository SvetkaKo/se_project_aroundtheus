export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._cardSelector).content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  //public method that returns a card
  getCardElement() {
    this._element = this._getTemplate();
    this._cardTitleElement = this._element.querySelector('.card__title');
    this._cardImgElement = this._element.querySelector('.card__img');
    this._btnLike = this._element.querySelector('.card__btn-like');
    this._btnDelete = this._element.querySelector('.card__btn-delete');

    this._cardTitleElement.textContent = this._name;
    this._cardImgElement.src = this._link;
    this._cardImgElement.alt = this._name;

    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._cardImgElement.addEventListener('click', () => {
      this._handleImageClick(this);
    });

    this._btnLike.addEventListener('click', (evt) => {
      evt.target.classList.toggle('card__btn-like_active');
    });

    this._btnDelete.addEventListener('click', (evt) => {
      evt.target.closest('.card').remove();
    });
  }
}

// //create cards and render them
// initialCards.forEach((item) => {
//   const card = new Card(item, '.template-card', handlePicturePopup);
//   const cardElement = card.getCardElement();
//   cardsContainer.prepend(cardElement);
// });

// function openPopup(popup) {
//   popup.classList.add('popup_opened');
//   //   document.addEventListener('mousedown', handleOverlayClick);
//   //   document.addEventListener('keydown', handleEscapeButton);
// }

// function handlePicturePopup(card) {
//   const popupPicture = document.querySelector('.popup_picture');
//   const popupPictureImg = document.querySelector('.popup__picture-img');
//   const popupPictureTitle = document.querySelector('.popup__picture-title');
//   console.log(card);
//   //   popupPictureImg.src = evt.target.src;
//   //   popupPictureImg.alt = evt.target.alt;
//   //   popupPictureTitle.textContent = evt.target.alt;

//   openPopup(popupPicture);
// }
