import "./index.css";
import { validateConfig } from "../utils/constants.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { initialCards } from "../utils/initialCards.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddNewCard = document.querySelector(".profile__add-button");

const profilePopupElement = document.querySelector("#profile__popup");
const profilePopupContainer =
  profilePopupElement.querySelector(".popup__container");
const nameInput = profilePopupContainer.querySelector("#popup__name");
const jobInput = profilePopupContainer.querySelector("#popup__job");

const cardPopupElement = document.querySelector("#add-card__popup");
const cardPopupContainer = cardPopupElement.querySelector(".popup__container");
const cardsGallery = ".elements";

const cardPopupSelector = "#add-card__popup";
const profilePopupSelector = "#profile__popup";
const imagePopupSelector = "#card-image__popup";
const nameSelector = ".profile__name";
const statusSelector = ".profile__job";

//UserInf init
const UserInf = new UserInfo(nameSelector, statusSelector);

//Popup init
const imagePopup = new PopupWithImage(imagePopupSelector);
imagePopup.setEventListeners();

const renderCard = (item) => {
  const newCard = new Card(
    { name: Object.values(item)[0], link: Object.values(item)[1] },
    "#card-template",
    (name, link) => {
      imagePopup.open(name, link);
    }
  );
  const cardElement = newCard.generate();
  cardList.addItem(cardElement);
};

const cardPopup = new PopupWithForm(cardPopupSelector, renderCard);
cardPopup.setEventListeners();

const profilePopup = new PopupWithForm(profilePopupSelector, (item) => {
  UserInf.setUserInfo({
    name: item["profile-name"],
    status: item["profile-job"],
  });
});
profilePopup.setEventListeners();

const profileFormValidator = new FormValidator(
  validateConfig,
  profilePopupContainer.querySelector(".popup__form")
);
const newCardFormValidator = new FormValidator(
  validateConfig,
  cardPopupContainer.querySelector(".popup__form")
);

profileFormValidator.enableValidation();
newCardFormValidator.enableValidation();

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const newCard = new Card(item, "#card-template", (name, link) => {
        imagePopup.open(name, link);
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
  profileFormValidator.resetValidation();
  profilePopup.open();
}

function openPopupCard(event) {
  newCardFormValidator.resetValidation();
  cardPopup.open();
}

buttonEditProfile.addEventListener("click", openPopupProfile);
buttonAddNewCard.addEventListener("click", openPopupCard);
