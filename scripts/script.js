let profileName = document.querySelector(".profile__name");
let profileJob = document.querySelector(".profile__job");

let editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const profilePopup = document.querySelector("#profile__popup");
const profileForm = profilePopup.querySelector(".popup__container");
const nameInput = profileForm.querySelector("#popup__name");
const jobInput = profileForm.querySelector("#popup__job");
const closeProfilePopup = profilePopup.querySelector(".popup__close");

const addCardPopup = document.querySelector("#add-card__popup");
const addCardForm = addCardPopup.querySelector(".popup__container");
const placeName = addCardForm.querySelector("#place-name");
const cardImage = addCardForm.querySelector("#card-image");
const closeCardPopup = addCardPopup.querySelector(".popup__close");

const cardImagePopup = document.querySelector("#card-image__popup");
const popupImage = cardImagePopup.querySelector(".popup__image");
const popupPlaceName = cardImagePopup.querySelector(".popup__place-name");
const closeImagePopup = cardImagePopup.querySelector(".popup__close");

const cardsGallery = document.querySelector(".elements");

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

initialCards.forEach(function (item) {
  addCard(item.name, item.link);
});

function addCard(newCardPlace, newCardImage) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const cardLikeButton = cardElement.querySelector(".element__like-button");
  const cardDeleteButton = cardElement.querySelector(".element__trash-can");
  const cardImage = cardElement.querySelector(".element__image");

  cardImage.src = newCardImage;
  cardImage.alt = newCardPlace;
  cardElement.querySelector(".element__place").textContent = newCardPlace;

  cardLikeButton.addEventListener("click", function (event) {
    event.target.classList.toggle("element__like-button_active");
  });

  cardDeleteButton.addEventListener("click", function (event) {
    event.target.parentNode.remove();
  });

  cardImage.addEventListener("click", showCard);

  cardsGallery.prepend(cardElement);
}

function showCard(event) {
  popupImage.src = event.target.src;
  let thisCardName =
    event.target.parentNode.querySelector(".element__place").textContent;
  popupImage.alt = thisCardName;
  popupPlaceName.textContent = thisCardName;
  cardImagePopup.classList.add("popup_opened");
}

function profilePopupOpen() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  profilePopup.classList.add("popup_opened");
}

function cardPopupOpen() {
  addCardPopup.classList.add("popup_opened");
}

function popupClose(event) {
  event.target.closest(".popup").classList.remove("popup_opened");
}

function handleFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupClose();
}

function newCardSubmit(event) {
  event.preventDefault();
  const newCardName = placeName.value;
  const newCardImage = cardImage.value;
  addCard(newCardName, newCardImage);
  popupClose();
}

editButton.addEventListener("click", profilePopupOpen);
addButton.addEventListener("click", cardPopupOpen);
closeCardPopup.addEventListener("click", popupClose);
closeProfilePopup.addEventListener("click", popupClose);
closeImagePopup.addEventListener("click", popupClose);
profileForm.addEventListener("submit", handleFormSubmit);
addCardForm.addEventListener("submit", newCardSubmit);
