import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Popup from '../components/Popup.js';

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

const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupNewCard = document.querySelector('.popup_new-card');

const popupCardForm = document.forms.newCardForm;

const btnEditProfile = document.querySelector('.profile__btn_type_edit');
const btnNewCard = document.querySelector('.profile__btn_type_add');

const cardsContainer = document.querySelector('.cards');
const containerSelector = document.querySelector('.cards');

const popupProfileForm = document.forms.profileForm;

const profileName = document.querySelector('.profile__name');
const profileTitle = document.querySelector('.profile__title');

const popupPicture = document.querySelector('.popup_picture');

function createCard(cardData) {
  const card = new Card(cardData, '.template-card', handlePicturePopup);
  const cardElement = card.getCardElement();
  cardsContainer.prepend(cardElement);
}

function handlePicturePopup(card) {
  const popupImage = new PopupWithImage(popupPicture, card);
  popupImage.open();
  popupImage.setEventListeners();
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

btnNewCard.addEventListener('click', (evt) => {
  const popup = new PopupWithForm(popupNewCard, (data) => {
    console.log(data);
    createCard(data);
  });
  popup.open();
  popup.setEventListeners();
});

btnEditProfile.addEventListener('click', () => {
  const popup = new PopupWithForm(popupEditProfile, (data) => {
    console.log(data);
    profileName.textContent = data.profileName;
    profileTitle.textContent = data.profileTitle;
  });
  popup.open();
  popup.setEventListeners();
});

const profileFormValidator = new FormValidator(options, popupProfileForm);
profileFormValidator.enableValidation();

const newCardFormValidator = new FormValidator(options, popupCardForm);
newCardFormValidator.enableValidation();
