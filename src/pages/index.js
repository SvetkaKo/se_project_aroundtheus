import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupConfirmation from '../components/PopupConfirmation';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

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

const api = new Api({
  baseUrl: 'https://around-api.en.tripleten-services.com/v1',
  headers: {
    authorization: 'd80b0a8b-56e7-45c3-8099-725247c052b9',
    'Content-Type': 'application/json',
  },
});

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
const btnEditProfileImage = document.querySelector('.profile-photo-edit__edit-btn');

const containerSelector = document.querySelector('.cards');

const popupProfileForm = document.forms.profileForm;
const popupPicture = document.querySelector('.popup_picture');
const popupConfirmDelete = document.querySelector('.popup_confirm-delete');
const popupEditProfileImage = document.querySelector('.popup_edit-profile-image');
const popupProfileImageForm = document.forms.profileEditImageForm;

let cardList;

const profileFormValidator = new FormValidator(options, popupProfileForm);
profileFormValidator.enableValidation();

const newCardFormValidator = new FormValidator(options, popupCardForm);
newCardFormValidator.enableValidation();

const ProfileImageFormValidator = new FormValidator(options, popupProfileImageForm);
ProfileImageFormValidator.enableValidation();

function createCard(cardData) {
  const card = new Card(cardData, '.template-card', handlePicturePopup, handleDeleteButton, handleLikeButton);
  const cardElement = card.getCardElement();
  cardList.addItem(cardElement);
}

const popupImage = new PopupWithImage(popupPicture);

function handlePicturePopup(name, link) {
  popupImage.open(name, link);
}

const popupDelete = new PopupConfirmation(popupConfirmDelete, handleDeletePicture);

function handleDeleteButton(cardId, element) {
  popupDelete.open(cardId, element);
}

function handleDeletePicture(cardId, element) {
  api
    .deleteCard(cardId)
    .then(() => {
      element.remove();
    })
    .catch((error) => {
      console.error('Error deleting card:', error);
    });
}

function handleLikeButton(cardId) {
  if (this.isLiked()) {
    //this = card
    api
      .dislikeCard(cardId)
      .then((res) => this.setIsLiked(res.isLiked))
      .catch((error) => {
        console.error(error);
      });
  } else {
    api
      .likeCard(cardId)
      .then((res) => this.setIsLiked(res.isLiked))
      .catch((error) => {
        console.error(error);
      });
  }
}

const popupNewCard = new PopupWithForm(newCard, handleNewCardSubmition);

function handleNewCardSubmition(cardData) {
  api
    .addCard(cardData)
    .then(() => {
      createCard(cardData);
    })
    .then(() => {
      popupNewCard.reset();
      newCardFormValidator.disableSubmitButton();
    })
    .catch((error) => {
      console.error('Error adding a new card:', error);
    });
}

btnNewCard.addEventListener('click', () => {
  popupNewCard.open();
});

const userInfo = new UserInfo({ nameSelector: '.profile__name', aboutSelector: '.profile__title', avatarSelector: '.profile-photo-edit__image' });

api
  .getData()
  .then(([userData, userCards]) => {
    console.log(userData, userCards);
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
    cardList = new Section(
      {
        data: userCards,
        renderer: createCard,
      },
      containerSelector // .cards
    );
    cardList.renderItems();
  })
  .catch((error) => {
    console.error(error);
  });

const editProfileImage = new PopupWithForm(popupEditProfileImage, handleProfileImageSubmit);

btnEditProfileImage.addEventListener('click', () => {
  editProfileImage.open();
});

function handleProfileImageSubmit(userData) {
  api
    .updateProfileImage(userData)
    .then(() => {
      userInfo.setUserAvatar(userData);
    })
    .then(() => {
      editProfileImage.reset();
    })
    .catch((error) => {
      console.error('Error updating a new image:', error);
    });
}

const popupEditProfile = new PopupWithForm(editProfile, handleUserProfileSubmition);

function handleUserProfileSubmition(userData) {
  console.log(userData);
  api
    .updateUserInfo(userData)
    .then(() => {
      userInfo.setUserInfo(userData);
      popupEditProfile.reset();
    })
    .catch((error) => {
      console.error('Error adding a new card:', error);
    });
}

btnEditProfile.addEventListener('click', () => {
  const data = userInfo.getUserInfo();
  popupEditProfile.setInputValues(data);
  popupEditProfile.open();
});
