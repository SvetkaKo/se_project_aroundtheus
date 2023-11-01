export default class Card {
  constructor(data, cardSelector, handleImageClick, handleDeleteButton) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteButton = handleDeleteButton;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._cardSelector).content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._cardImgElement.addEventListener('click', () => {
      this._handleImageClick(this._name, this._link);
    });

    this._btnLike.addEventListener('click', (evt) => {
      evt.target.classList.toggle('card__btn-like_active');
    });

    this._btnDelete.addEventListener('click', (evt) => {
      this._handleDeleteButton(this._id, this._element);
    });
  }

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
}
