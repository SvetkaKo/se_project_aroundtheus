export default class Popup {
  constructor(popup) {
    this._popup = popup;
    this._popupActiveClass = 'popup_opened'; // i don't use it anywhere, but i want to get rid of "popup_opened" selector in my code
    this._closeButton = this._popup.querySelector('.popup__btn-close');
    this._isOpen = false;
  }

  open() {
    this._isOpen = true;
    this._popup.classList.add(this._popupActiveClass);
  }

  close() {
    this._isOpen = false;
    this._popup.classList.remove(this._popupActiveClass);
  }

  setEventListeners() {
    this._closeButton.addEventListener('click', () => {
      this.close();
    });
    document.addEventListener('mousedown', (evt) => {
      this._handleOverlayClick(evt);
    });
    document.addEventListener('keydown', (evt) => {
      this._handleEscKeydown(evt);
    });
  }

  _handleOverlayClick(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      this.close();
    }
  }

  _handleEscKeydown(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
}
