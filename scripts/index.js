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

const inputName = document.querySelector('.profile__name');
const inputTitle = document.querySelector('#title');

const modalEdit = document.querySelector('.modal__edit');
const modalAdd = document.querySelector('.modal__add');

const cardsContainer = document.querySelector('.cards');

function getCardElement(data) {
  const cardTemplate = document.querySelector('.template-card').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitleElement = cardElement.querySelector('.card__title');
  const cardImgElement = cardElement.querySelector('.card__img');
  cardTitleElement.textContent = data.name;
  cardImgElement.src = data.link;
  cardImgElement.alt = data.name;

  return cardElement;
}

// toggle adit and add modals
function toggleModal(evt, modal) {
  modal.classList.toggle('modal_opened');
  evt.preventDefault();
}

function handleProfileSubmit(evt) {
  evt.preventDefault();
  const modal = this.closest('.modal');
  profileName.textContent = inputName.value;
  profileTitle.textContent = inputTitle.value;
  toggleModal(evt, modal);
}

function handleCardSubmit(evt) {
  evt.preventDefault();
  const modal = this.closest('.modal');
  const data = { name: inputCardTitle.value, link: inputCardLink.value };
  cardsContainer.prepend(getCardElement(data));
  toggleModal(evt, modal);
}

// close the edit profile info modal
function handleCloseButton(evt) {
  const modal = this.closest('.modal');
  toggleModal(evt, modal);
}

//render cards
initialCards.forEach((card) => {
  cardsContainer.prepend(getCardElement(card));
});

//there are two "close buttons", so I used querySelectorAll
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
  console.log('cliked');
  this.classList.toggle('card__btn-like_active');
}

const btnLike = document.querySelectorAll('.card__btn-like');

btnLike.forEach(function (btn) {
  btn.addEventListener('click', handLikeBtn);
});
