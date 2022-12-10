let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close');

let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('#popup__name');
let jobInput = formElement.querySelector('#popup__job');

let popup = document.querySelector('.popup');

function popupOpen() {
  nameInput.value = profileName.textContent;;
  jobInput.value = profileJob.textContent;;
  popup.classList.add('popup_opened');
}

function popupClose() {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;;
  profileJob.textContent = jobInput.value;;
  popupClose();
}

editButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose);
formElement.addEventListener('submit', handleFormSubmit);
