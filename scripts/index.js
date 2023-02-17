import { Card } from "./Card.js";
import { validateConfig, FormValidator } from "./FormValidator.js";
import { initialCards } from "./initialCards.js";

const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddNewCard = document.querySelector(".profile__add-button");

const profilePopup = document.querySelector("#profile__popup");
const profileContainer = profilePopup.querySelector(".popup__container");
const nameInput = profileContainer.querySelector("#popup__name");
const jobInput = profileContainer.querySelector("#popup__job");

const newCardPopup = document.querySelector("#add-card__popup");
const newCardContainer = newCardPopup.querySelector(".popup__container");
const placeName = newCardContainer.querySelector("#place-name");
const cardImage = newCardContainer.querySelector("#card-image");

const cardImagePopup = document.querySelector("#card-image__popup");

const cardsGallery = document.querySelector(".elements");

const profileForm = new FormValidator(
  validateConfig,
  profileContainer.querySelector(".popup__form")
);
const newCardForm = new FormValidator(
  validateConfig,
  newCardContainer.querySelector(".popup__form")
);

profileForm.enableValidation();
newCardForm.enableValidation();

initialCards.forEach(function (item) {
  addNewCard(item);
});

function createNewCard(item) {
  const newCard = new Card(item, "#card-template");
  const newCardElement = newCard.generate();
  return newCardElement;
}

function addNewCard(item) {
  cardsGallery.prepend(createNewCard(item));
}

function openPopupProfile(event) {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  profileForm.resetValidation();
  openPopup(profilePopup);
}

function openPopupCard(event) {
  placeName.value = "";
  cardImage.value = "";
  newCardForm.resetValidation();
  openPopup(newCardPopup);
}

function openPopup(currentPopup) {
  currentPopup.classList.add("popup_opened");
  currentPopup.addEventListener("keydown", closePopupEscapeBtn);
}

function closePopup(currentPopup) {
  currentPopup.classList.remove("popup_opened");
  currentPopup.removeEventListener("keydown", closePopupEscapeBtn);
}

function submitHandleForm(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(profilePopup);
}

function submitNewCard(event) {
  event.preventDefault();
  const newCardItem = {};
  newCardItem.name = placeName.value;
  newCardItem.link = cardImage.value;
  addNewCard(newCardItem);
  placeName.value = "";
  cardImage.value = "";
  closePopup(newCardPopup);
}

function closePopupListeners() {
  const popupList = Array.from(document.querySelectorAll(".popup"));
  closePopupByOverlay(popupList);
}

function closePopupByOverlay(popupList) {
  popupList.forEach((popupElement) => {
    popupElement.addEventListener("mousedown", function (evt) {
      if (
        evt.target.classList.contains("popup") ||
        evt.target.classList.contains("popup__close")
      ) {
        closePopup(popupElement);
      }
    });
  });
}

function closePopupEscapeBtn(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

closePopupListeners();

buttonEditProfile.addEventListener("click", openPopupProfile);
buttonAddNewCard.addEventListener("click", openPopupCard);
profileContainer.addEventListener("submit", submitHandleForm);
newCardContainer.addEventListener("submit", submitNewCard);

export { openPopup, cardImagePopup };
