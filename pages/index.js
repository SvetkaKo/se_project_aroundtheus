import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';

const initialCards = [
  {
    name: 'Yosemite Valley',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg',
  },
  {
    name: 'Lake Louise',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg',
  },
  {
    name: 'Bald Mountains',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg',
  },
  {
    name: 'Latemar',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg',
  },
  {
    name: 'Vanoise National Park',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg',
  },
  {
    name: 'Lago di Braies',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg',
  },
];

const options = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__btn-submit',
  inactiveButtonClass: 'popup__btn-submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');

const popupCardForm = document.forms.newCardForm;
const inputCardTitle = popupCardForm.elements.cardName;
const inputCardLink = popupCardForm.elements.cardTitle;

const closeButtons = document.querySelectorAll('.popup__btn-close');
const btnEdit = document.querySelector('.profile__btn_type_edit');
const btnAdd = document.querySelector('.profile__btn_type_add');

const cardsContainer = document.querySelector('.cards');

const popupProfileForm = document.forms.profileForm;
const inputName = popupProfileForm.elements.profileName;
const inputTitle = popupProfileForm.elements.profileTitle;

const profileName = document.querySelector('.profile__name');
const profileTitle = document.querySelector('.profile__title');

//close any popup
function handleCloseButton(evt) {
  const popup = evt.target.closest('.popup');
  closePopup(popup);
}

closeButtons.forEach(function (btn) {
  btn.addEventListener('click', handleCloseButton);
});

// close any popup and remove event listeners
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('mousedown', handleOverlayClick);
  document.removeEventListener('keydown', handleEscapeButton);
}

// open any popup and add event listeners, enable validation
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('mousedown', handleOverlayClick);
  document.addEventListener('keydown', handleEscapeButton);
  validateForm(popup);
}

//enable validation
function validateForm(popup) {
  const form = popup.querySelector(options.formSelector);
  const submitButton = popup.querySelector('.popup__btn-submit');
  const formValidator = new FormValidator(options, form);
  formValidator.enableValidation();
  if (submitButton.disabled) {
    console.log(`don't know what to do`);
  }
}

function handleOverlayClick(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

function handleEscapeButton(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

//submit new profile info
function handleProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileTitle.textContent = inputTitle.value;
  closePopup(popupEdit);
}

//submit and render a new card
function handleCardSubmit(evt) {
  evt.preventDefault();
  const form = popupAdd.querySelector(options.formSelector);
  const data = { name: inputCardTitle.value, link: inputCardLink.value };
  const card = new Card(data, '.template-card', handlePicturePopup);
  const cardElement = card.getCardElement();
  cardsContainer.prepend(cardElement);
  closePopup(popupAdd);

  const formValidator = new FormValidator(options, form);
  formValidator.disableSubmitButton();

  evt.target.reset();
}

// open Edit popup
btnEdit.addEventListener('click', (evt) => {
  openPopup(popupEdit);
});

// open Add popup
btnAdd.addEventListener('click', (evt) => {
  openPopup(popupAdd);
});

popupProfileForm.addEventListener('submit', handleProfileSubmit);
popupCardForm.addEventListener('submit', handleCardSubmit);

// create cards and render them
initialCards.forEach((item) => {
  const card = new Card(item, '.template-card', handlePicturePopup);
  const cardElement = card.getCardElement();
  cardsContainer.prepend(cardElement);
});

function handlePicturePopup(card) {
  const popupPicture = document.querySelector('.popup_picture');
  const popupPictureImg = document.querySelector('.popup__picture-img');
  const popupPictureTitle = document.querySelector('.popup__picture-title');

  popupPictureImg.src = card._link;
  popupPictureImg.alt = card._name;
  popupPictureTitle.textContent = card._name;

  openPopup(popupPicture);
}

// const formList = Array.from(document.querySelectorAll(options.formSelector));
// formList.forEach((form) => {
//   const formValidator = new FormValidator(options, form);
//   formValidator.enableValidation();
// });
