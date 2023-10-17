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

const editProfile = document.querySelector('.popup_edit-profile');
const newCard = document.querySelector('.popup_new-card');

const popupCardForm = document.forms.newCardForm;

const btnEditProfile = document.querySelector('.profile__btn_type_edit');
const btnNewCard = document.querySelector('.profile__btn_type_add');

const containerSelector = document.querySelector('.cards');

const popupProfileForm = document.forms.profileForm;

const popupPicture = document.querySelector('.popup_picture');

const cardList = new Section(
  {
    data: initialCards,
    renderer: createCard,
  },
  containerSelector // .cards
);

cardList.renderItems();

const profileFormValidator = new FormValidator(options, popupProfileForm);
profileFormValidator.enableValidation();

const newCardFormValidator = new FormValidator(options, popupCardForm);
newCardFormValidator.enableValidation();

function createCard(cardData) {
  const card = new Card(cardData, '.template-card', handlePicturePopup);
  const cardElement = card.getCardElement();
  cardList.addItem(cardElement);
}

const popupImage = new PopupWithImage(popupPicture);

function handlePicturePopup(name, link) {
  popupImage.open(name, link);
}

const popupNewCard = new PopupWithForm(newCard, (data) => {
  createCard(data);
  popupNewCard.reset();
  newCardFormValidator.disableSubmitButton();
});

btnNewCard.addEventListener('click', () => {
  popupNewCard.open();
});

const userInfo = new UserInfo({ nameSelector: '.profile__name', aboutMeSelector: '.profile__title' });

const popupEditProfile = new PopupWithForm(editProfile, (data) => {
  userInfo.getUserInfo();
  userInfo.setUserInfo(data);
});

btnEditProfile.addEventListener('click', () => {
  const data = userInfo.getUserInfo();
  popupEditProfile.setInputValues(data);
  popupEditProfile.open();
  //close button in Popup's method setEventListeners
});
