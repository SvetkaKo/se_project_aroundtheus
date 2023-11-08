import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupConfirmation from '../components/PopupConfirmation';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

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

const profileImageFormValidator = new FormValidator(options, popupProfileImageForm);
profileImageFormValidator.enableValidation();

const popupImage = new PopupWithImage(popupPicture);

const loadingButtonText = 'Saving...';

function handlePicturePopup(name, link) {
  popupImage.open(name, link);
}

function createCard(cardData) {
  const card = new Card(
    cardData,
    '.template-card',
    handlePicturePopup,
    () => {
      popupDelete.setAction(() => {
        popupDelete.renderLoading(true);
        api
          .deleteCard(cardData._id)
          .then(() => {
            card.remove();
            popupDelete.close();
          })
          .finally(() => {
            popupDelete.renderLoading(false);
          })
          .catch((error) => {
            console.error('Error deleting card:', error);
          });
      });
      popupDelete.open();
    },
    handleLikeButton
  );
  const cardElement = card.getCardElement();
  cardList.addItem(cardElement);
}

const popupDelete = new PopupConfirmation(popupConfirmDelete, loadingButtonText);

function handleLikeButton(cardId) {
  if (this.isLiked()) {
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

const popupNewCard = new PopupWithForm(newCard, handleNewCardSubmition, loadingButtonText);

function handleNewCardSubmition(cardData) {
  popupNewCard.renderLoading(true);
  api
    .addCard(cardData)
    .then((response) => {
      createCard(response);
      popupNewCard.reset();
      popupNewCard.close();
      newCardFormValidator.disableSubmitButton();
    })
    .finally(() => {
      popupNewCard.renderLoading(false);
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

const editProfileImage = new PopupWithForm(popupEditProfileImage, handleProfileImageSubmit, loadingButtonText);

btnEditProfileImage.addEventListener('click', () => {
  editProfileImage.open();
});

function handleProfileImageSubmit(userData) {
  editProfileImage.renderLoading(true);
  api
    .updateProfileImage(userData)
    .then(() => {
      userInfo.setUserAvatar(userData);
      editProfileImage.reset();
      editProfileImage.close();
    })
    .finally(() => {
      editProfileImage.renderLoading(false);
    })
    .catch((error) => {
      console.error('Error updating a new image:', error);
    });
}

const popupEditProfile = new PopupWithForm(editProfile, handleUserProfileSubmition, loadingButtonText);

function handleUserProfileSubmition(userData) {
  popupEditProfile.renderLoading(true);
  api
    .updateUserInfo(userData)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupEditProfile.close();
    })
    .finally(() => {
      popupEditProfile.renderLoading(false);
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
