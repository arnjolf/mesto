import "../pages/index.css";

import { Card } from "./Card.js";
import { validateConfig, FormValidator } from "./FormValidator.js";
import { initialCards } from "./initialCards.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddNewCard = document.querySelector(".profile__add-button");

const profilePopup = document.querySelector("#profile__popup");
const profileContainer = profilePopup.querySelector(".popup__container");
const nameInput = profileContainer.querySelector("#popup__name");
const jobInput = profileContainer.querySelector("#popup__job");

const newCardPopup = document.querySelector("#add-card__popup");
const newCardContainer = newCardPopup.querySelector(".popup__container");
const cardsGallery = ".elements";

const cardPopupSelector = "#add-card__popup";
const profilePopupSelector = "#profile__popup";
const imagePopupSelector = "#card-image__popup";
const nameSelector = ".profile__name";
const statusSelector = ".profile__job";

//UserInf init
const UserInf = new UserInfo(nameSelector, statusSelector);

//Popup init
const imagePopupOpen = new PopupWithImage(imagePopupSelector);
imagePopupOpen.setEventListeners();

const cardPopupOpen = new PopupWithForm(cardPopupSelector, (item) => {
  const newCard = new Card(
    { name: item["place-name"], link: item["place-src"] },
    "#card-template",
    (name, link) => {
      imagePopupOpen.open(name, link);
    }
  );
  const cardElement = newCard.generate();
  cardList.addItem(cardElement);
});
cardPopupOpen.setEventListeners();

const profilePopupOpen = new PopupWithForm(profilePopupSelector, (item) => {
  console.log(item["profile-name"], item["profile-job"]);
  UserInf.setUserInfo({
    name: item["profile-name"],
    status: item["profile-job"],
  });
});
profilePopupOpen.setEventListeners();

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

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const newCard = new Card(item, "#card-template", (name, link) => {
        imagePopupOpen.open(name, link);
      });
      const cardElement = newCard.generate();
      cardList.addItem(cardElement);
    },
  },
  cardsGallery
);

cardList.renderItems();

function openPopupProfile(event) {
  const userInfo = UserInf.getUserInfo();
  nameInput.value = userInfo.name;
  jobInput.value = userInfo.status;
  profileForm.resetValidation();
  profilePopupOpen.open();
}

function openPopupCard(event) {
  newCardForm.resetValidation();
  cardPopupOpen.open();
}

buttonEditProfile.addEventListener("click", openPopupProfile);
buttonAddNewCard.addEventListener("click", openPopupCard);
