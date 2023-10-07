import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';

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

const btnEdit = document.querySelector('.profile__btn_type_edit');
const btnAdd = document.querySelector('.profile__btn_type_add');

const cardsContainer = document.querySelector('.cards');
const containerSelector = document.querySelector('.cards');

const popupProfileForm = document.forms.profileForm;
const inputName = popupProfileForm.elements.profileName;
const inputTitle = popupProfileForm.elements.profileTitle;

const profileName = document.querySelector('.profile__name');
const profileTitle = document.querySelector('.profile__title');

function handleProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileTitle.textContent = inputTitle.value;
  closePopup(popupEdit);
}

function handleCardSubmit(evt) {
  evt.preventDefault();
  const cardData = { name: inputCardTitle.value, link: inputCardLink.value };
  createCard(cardData);
  closePopup(popupAdd);
  newCardFormValidator.disableSubmitButton();
  evt.target.reset();
}

popupProfileForm.addEventListener('submit', handleProfileSubmit);
popupCardForm.addEventListener('submit', handleCardSubmit);

function createCard(cardData) {
  console.log(cardData);
  const card = new Card(cardData, '.template-card', handlePicturePopup);
  const cardElement = card.getCardElement();
  cardsContainer.prepend(cardElement);
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

const cardList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      createCard(item);
    },
  },
  containerSelector // .cards
);

cardList.renderItems();

btnAdd.addEventListener('click', (evt) => {
  const popup = new Popup(popupAdd, 'popup__opened');
  popup.open();
  popup.setEventListeners();
});

btnEdit.addEventListener('click', (evt) => {
  const popup = new Popup(popupAdd, 'popup__opened');
  popup.open();
  popup.setEventListeners();
});

const profileFormValidator = new FormValidator(options, popupProfileForm);
profileFormValidator.enableValidation();

const newCardFormValidator = new FormValidator(options, popupCardForm);
newCardFormValidator.enableValidation();
