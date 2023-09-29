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

// open any popup and add event listeners
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('mousedown', handleOverlayClick);
  document.addEventListener('keydown', handleEscapeButton);
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
  const data = { name: inputCardTitle.value, link: inputCardLink.value };
  cardsContainer.prepend(getCardElement(data));
  closePopup(popupAdd);
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

function handleLikeBtn(evt) {
  evt.preventDefault();
  evt.target.classList.toggle('card__btn-like_active');
}

function handleDeleteBtn(evt) {
  evt.target.closest('.card').remove();
}

function handlePicturePopup(evt) {
  const popupPictureImg = document.querySelector('.popup__picture-img');
  const popupPictureTitle = document.querySelector('.popup__picture-title');

  popupPictureImg.src = evt.target.src;
  popupPictureImg.alt = evt.target.alt;
  popupPictureTitle.textContent = evt.target.alt;

  openPopup(popupPicture);
}

popupProfileForm.addEventListener('submit', handleProfileSubmit);
popupCardForm.addEventListener('submit', handleCardSubmit);
