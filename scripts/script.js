const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddNewCard = document.querySelector(".profile__add-button");

const profilePopup = document.querySelector("#profile__popup");
const profileForm = profilePopup.querySelector(".popup__container");
const nameInput = profileForm.querySelector("#popup__name");
const jobInput = profileForm.querySelector("#popup__job");
const buttonClosePopupProfile = profilePopup.querySelector(".popup__close");

const addCardPopup = document.querySelector("#add-card__popup");
const addCardForm = addCardPopup.querySelector(".popup__container");
const placeName = addCardForm.querySelector("#place-name");
const cardImage = addCardForm.querySelector("#card-image");
const buttonClosePopupCard = addCardPopup.querySelector(".popup__close");

const cardImagePopup = document.querySelector("#card-image__popup");
const popupImage = cardImagePopup.querySelector(".popup__image");
const popupPlaceName = cardImagePopup.querySelector(".popup__place-name");
const buttonClosePopupImage = cardImagePopup.querySelector(".popup__close");

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
  addNewCard(item.name, item.link);
});

function createNewCard(newCardPlace, newCardImage) {
  const cardTemplate = document.querySelector("#card-template").content;
  const newCard = cardTemplate.querySelector(".element").cloneNode(true);

  newCard.querySelector(".element__image").src = newCardImage;
  newCard.querySelector(".element__image").alt = newCardPlace;
  newCard.querySelector(".element__place").textContent = newCardPlace;

  newCard
    .querySelector(".element__like-button")
    .addEventListener("click", likeCard);
  newCard
    .querySelector(".element__trash-can")
    .addEventListener("click", deleteCard);
  newCard.querySelector(".element__image").addEventListener("click", openCard);

  return newCard;
}

function addNewCard(cardName, cardLink) {
  cardsGallery.prepend(createNewCard(cardName, cardLink));
}

function deleteCard(event) {
  event.target.parentNode.remove();
}

function likeCard(event) {
  event.target.classList.toggle("element__like-button_active");
}

function openCard(event) {
  popupImage.src = event.target.src;
  const thisCardName = event.target
    .closest(".element")
    .querySelector(".element__place").textContent;
  popupImage.alt = thisCardName;
  popupPlaceName.textContent = thisCardName;
  cardImagePopup.classList.add("popup_opened");
}

function openPopupProfile(event) {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(profilePopup);
}

function openPopupCard(event) {
  openPopup(addCardPopup);
}

function openPopup(currentPopup) {
  currentPopup.classList.add("popup_opened");
}

function closePopup(currentPopup) {
  currentPopup.classList.remove("popup_opened");
}

function closePopupDomElement(event) {
  const currentPopup = event.target.closest(".popup");
  closePopup(currentPopup);
}

function handleFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopupDomElement(event);
}

function newCardSubmit(event) {
  event.preventDefault();
  const newCardName = placeName.value;
  const newCardLink = cardImage.value;
  addNewCard(newCardName, newCardLink);
  closePopupDomElement(event);
  placeName.value = "";
  cardImage.value = "";
}

buttonEditProfile.addEventListener("click", openPopupProfile);
buttonAddNewCard.addEventListener("click", openPopupCard);
buttonClosePopupCard.addEventListener("click", closePopupDomElement);
buttonClosePopupProfile.addEventListener("click", closePopupDomElement);
buttonClosePopupImage.addEventListener("click", closePopupDomElement);
profileForm.addEventListener("submit", handleFormSubmit);
addCardForm.addEventListener("submit", newCardSubmit);
