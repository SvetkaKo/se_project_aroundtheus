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

const btnClose = document.querySelector('.modal__btn-close');
const btnEdit = document.querySelector('.profile__btn_type_edit');
const modalSubmit = document.forms['profile-form'];

const profileName = document.querySelector('.profile__name');
const profileTitle = document.querySelector('.profile__title');

const inputName = document.querySelector('#name');
const inputTitle = document.querySelector('#title');

const modal = document.querySelector('.modal');
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

function toggleModal(evt) {
  modal.classList.toggle('modal_opened');
  evt.preventDefault();
}

function handlemodalSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileTitle.textContent = inputTitle.value;
  modal.classList.toggle('modal_opened');
}

for (let data in initialCards) {
  cardsContainer.prepend(getCardElement(initialCards[data]));
}

btnClose.addEventListener('click', toggleModal);

// btnEdit is responsible for opening the modal.
// If it's removed, the edit button will no longer function.
// I've also renamed the function to 'toggleModal' for better clarity, replacing the former name 'closeModal'.
btnEdit.addEventListener('click', toggleModal);
modalSubmit.addEventListener('submit', handlemodalSubmit);
