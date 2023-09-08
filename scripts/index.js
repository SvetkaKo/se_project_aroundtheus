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

const popupCardForm = document.forms['new-card-form'];
const inputCardTitle = document.querySelector('#card-title');
const inputCardLink = document.querySelector('#card-link');

const btnClose = document.querySelectorAll('.popup__btn-close');
const btnEdit = document.querySelector('.profile__btn_type_edit');
const btnAdd = document.querySelector('.profile__btn_type_add');

const cardsContainer = document.querySelector('.cards');

const popupProfileForm = document.forms['profile-form'];

const popupPicture = document.querySelector('.popup_picture');
const popupPictureImg = document.querySelector('.popup__picture-img');
const popupPictureTitle = document.querySelector('.popup__picture-title');

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
  const profileName = document.querySelector('.profile__name');
  const profileTitle = document.querySelector('.profile__title');
  const inputName = document.querySelector('#profile-name');
  const inputTitle = document.querySelector('#profile-title');

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

btnClose.forEach(function (btn) {
  btn.addEventListener('click', handleCloseButton);
});

popupProfileForm.addEventListener('submit', handleProfileSubmit);
popupCardForm.addEventListener('submit', handleCardSubmit);

function handleLikeBtn(evt) {
  evt.preventDefault();
  evt.target.classList.toggle('card__btn-like_active');
}

function handleDeleteBtn(evt) {
  evt.target.parentElement.remove();
}

function handlePicturePopup(evt) {
  evt.preventDefault();
  popupPictureImg.src = this.src;
  popupPictureTitle.textContent = this.alt;
  openPopup(popupPicture);
}
