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

const popupPicture = document.querySelector('.popup_picture');

function getCardElement(data) {
  const cardTemplate = document.querySelector('.template-card').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitleElement = cardElement.querySelector('.card__title');
  const cardImgElement = cardElement.querySelector('.card__img');
  const cardBtnLike = cardElement.querySelector('.card__btn-like');
  const cardBtnDelete = cardElement.querySelector('.card__btn-delete');

  cardTitleElement.textContent = data.name;
  cardImgElement.src = data.link;
  cardImgElement.alt = data.name;

  cardBtnLike.addEventListener('click', handleLikeBtn);
  cardBtnDelete.addEventListener('click', handleDeleteBtn);
  cardImgElement.addEventListener('click', handlePicturePopup);
  return cardElement;
}

//render cards
initialCards.forEach((card) => {
  cardsContainer.prepend(getCardElement(card));
});

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function handleProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileTitle.textContent = inputTitle.value;
  closePopup(popupEdit);
}

// add new card and render it
function handleCardSubmit(evt) {
  evt.preventDefault();
  const data = { name: inputCardTitle.value, link: inputCardLink.value };
  cardsContainer.prepend(getCardElement(data));
  closePopup(popupAdd);
  evt.target.reset();
}

// close the edit profile info popup
function handleCloseButton(evt) {
  const popup = evt.target.closest('.popup');
  closePopup(popup);
}

// open Edit popup
btnEdit.addEventListener('click', (evt) => {
  openPopup(popupEdit);
});

// open Add popup
btnAdd.addEventListener('click', (evt) => {
  openPopup(popupAdd);
});

closeButtons.forEach(function (btn) {
  btn.addEventListener('click', handleCloseButton);
});

function handleLikeBtn(evt) {
  evt.preventDefault();
  evt.target.classList.toggle('card__btn-like_active');
}

function handleDeleteBtn(evt) {
  evt.target.closest('.card').remove();
}

function handlePicturePopup(evt) {
  evt.preventDefault();
  const popupPictureImg = document.querySelector('.popup__picture-img');
  const popupPictureTitle = document.querySelector('.popup__picture-title');

  popupPictureImg.src = evt.target.src;
  popupPictureImg.alt = evt.target.alt;
  popupPictureTitle.textContent = evt.target.alt;

  openPopup(popupPicture);
}

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__form-input-error');
  errorElement.classList.add('popup__input-error_active');
  errorElement.textContent = errorMessage;
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__form-input-error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
}

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(buttonElement, inputList) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__btn-submit_disabled');
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove('popup__btn-submit_disabled');
    buttonElement.disabled = false;
  }
}

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__form-input'));
  const buttonElement = formElement.querySelector('.popup__btn-submit');
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(buttonElement, inputList);
    });
  });
}

// function togglePopup() {
//   popupProfileForm.addEventListener('keydown', (evt) => {
//     evt.preventDefault();
//     if ((evt.key = 'Enter')) {
//       handleCloseButton();
//     }
//     if ((evt.key = 'Esc')) {
//       handleCloseButton();
//     }
//   });
// }

// togglePopup();

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
}

enableValidation();

popupProfileForm.addEventListener('submit', handleProfileSubmit);
popupCardForm.addEventListener('submit', handleCardSubmit);
