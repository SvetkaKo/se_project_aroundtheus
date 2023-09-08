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

const btnClose = document.querySelectorAll('.modal__btn-close');
const btnEdit = document.querySelector('.profile__btn_type_edit');
const btnAdd = document.querySelector('.profile__btn_type_add');

const modalSubmit = document.forms['profile-form'];
const modalCardSubmin = document.forms['new-card-form'];

const profileName = document.querySelector('.profile__name');
const profileTitle = document.querySelector('.profile__title');

const inputCardTitle = document.querySelector('#card-title');
const inputCardLink = document.querySelector('#card-link');

const inputName = document.querySelector('#profile-name');
const inputTitle = document.querySelector('#profile-title');

const modalEdit = document.querySelector('.modal_edit');
const modalAdd = document.querySelector('.modal_add');
const modalPicture = document.querySelector('.modal_picture');

const cardsContainer = document.querySelector('.cards');

const modalPictureImg = document.querySelector('.modal__picture-img');
const modalPictureTitle = document.querySelector('.modal__picture-title');

function getCardElement(data) {
  const cardTemplate = document.querySelector('.template-card').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitleElement = cardElement.querySelector('.card__title');
  const cardImgElement = cardElement.querySelector('.card__img');
  const btnLike = cardElement.querySelector('.card__btn-like');
  const btnDelete = cardElement.querySelector('.card__btn-delete');

  cardTitleElement.textContent = data.name;
  cardImgElement.src = data.link;
  cardImgElement.alt = data.name;

  btnLike.addEventListener('click', handLikeBtn);
  btnDelete.addEventListener('click', handDeleteBtn);
  cardImgElement.addEventListener('click', handOpenPictureModal);
  return cardElement;
}

//render cards
initialCards.forEach((card) => {
  cardsContainer.prepend(getCardElement(card));
});

// toggle adit and add modals
function toggleModal(evt, modal) {
  modal.classList.toggle('modal_opened');
}

function openPopup(popup) {
  popup.classList.add('modal_opened');
}

function closePopup(popup) {
  popup.classList.remove('modal_opened');
}

function handleProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileTitle.textContent = inputTitle.value;
  toggleModal(evt, modalEdit);
  console.log('new profile data submitted');
}

// add new card and render it
function handleCardSubmit(evt) {
  evt.preventDefault();
  const data = { name: inputCardTitle.value, link: inputCardLink.value };
  cardsContainer.prepend(getCardElement(data));
  toggleModal(evt, modalAdd);

  console.log('new card submitted');
}

// close the edit profile info modal
function handleCloseButton(evt) {
  const modal = evt.target.closest('.modal');
  toggleModal(evt, modal);
  console.log('modal closed handleCloseButton');
}

btnClose.forEach(function (btn) {
  btn.addEventListener('click', handleCloseButton);
});

// submit the ptofile info
modalSubmit.addEventListener('submit', handleProfileSubmit);

//submit a new card
modalCardSubmin.addEventListener('submit', handleCardSubmit);

// open Edit modal
btnEdit.addEventListener('click', (evt) => {
  toggleModal(evt, modalEdit);
});

// open Add modal
btnAdd.addEventListener('click', (evt) => {
  toggleModal(evt, modalAdd);
});

function handLikeBtn(evt) {
  evt.preventDefault();
  evt.target.classList.toggle('card__btn-like_active');
  console.log('like toggled handLikeBtn');
}

function handDeleteBtn(evt) {
  evt.target.parentElement.remove();
  console.log('card removed');
}

function handOpenPictureModal(evt) {
  evt.preventDefault();
  console.log(this.alt);
  modalPictureImg.src = this.src;
  modalPictureTitle.textContent = this.alt;
  console.log(modalPictureTitle.textContent);
  toggleModal(evt, modalPicture);
}
