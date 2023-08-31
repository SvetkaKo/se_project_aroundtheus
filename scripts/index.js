let initialCards = [
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

let btnClose = document.querySelector('.form__btn-close-img');
let btnEdit = document.querySelector('.profile__btn_type_edit');
let formSubmit = document.querySelector('.form__form');

let profileName = document.querySelector('.profile__name');
let profileTitle = document.querySelector('.profile__title');

let inputName = document.querySelector('#name');
let inputTitle = document.querySelector('#title');

let form = document.querySelector('.form');
let cardsContainer = document.querySelector('.cards');

function getCardElement(data) {
  const cardTemplate = document.querySelector('.template-card').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitleElement = cardElement.querySelector('.card__title');
  const cardImgElement = cardElement.querySelector('.card__img');
  cardTitleElement.textContent = data.name;
  cardImgElement.src = data.link;
  return cardElement;
}

function closeForm(evt) {
  let form = document.querySelector('.form');
  form.classList.toggle('form_opened');
  evt.preventDefault();
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileTitle.textContent = inputTitle.value;
  form.classList.toggle('form_opened');
}

for (let data in initialCards) {
  cardsContainer.prepend(getCardElement(initialCards[data]));
}

btnClose.addEventListener('click', closeForm);
btnEdit.addEventListener('click', closeForm);
formSubmit.addEventListener('submit', handleFormSubmit);
