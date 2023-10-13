import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

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

const profileName = document.querySelector('.profile__name').textContent;
const profileTitle = document.querySelector('.profile__title').textContent;

const editProfile = document.querySelector('.popup_edit-profile');
const newCard = document.querySelector('.popup_new-card');

const popupCardForm = document.forms.newCardForm;

const btnEditProfile = document.querySelector('.profile__btn_type_edit');
const btnNewCard = document.querySelector('.profile__btn_type_add');

const cardsContainer = document.querySelector('.cards');
const containerSelector = document.querySelector('.cards');

const popupProfileForm = document.forms.profileForm;

const popupPicture = document.querySelector('.popup_picture');

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

const popupNewCard = new PopupWithForm(newCard, (data) => {
  createCard(data);
  popupNewCard.reset();
});

popupNewCard.setEventListeners();

btnNewCard.addEventListener('click', () => {
  popupNewCard.open();
});

//render user info when the page is loaded the first time
const staticUserInfo = new UserInfo();
staticUserInfo.setUserInfo();

const popupEditProfile = new PopupWithForm(editProfile, (data) => {
  const staticUserInfo = new UserInfo(data);
  staticUserInfo.updateUserInfo();
  staticUserInfo.setUserInfo();
});

popupEditProfile.setEventListeners();

btnEditProfile.addEventListener('click', () => {
  popupEditProfile.open();
});

const profileFormValidator = new FormValidator(options, popupProfileForm);
profileFormValidator.enableValidation();

const newCardFormValidator = new FormValidator(options, popupCardForm);
newCardFormValidator.enableValidation();
