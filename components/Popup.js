export default class Popup {
  constructor(popup, popupActiveClass) {
    this._popup = popup;
    this._popupActiveClass = popupActiveClass;
    this._isOpen = false;
  }

  open() {
    this._isOpen = true;
    this._popup.classList.add('popup_opened');
    this._closeButton = this._popup.querySelector('.popup__btn-close');
  }
  close() {
    this._isOpen = false;
    this._popup.classList.remove('popup_opened');
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
