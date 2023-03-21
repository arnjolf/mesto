import "./index.css";
import { validateConfig } from "../utils/constants.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api";
import Popup from "../components/Popup";

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
const deleteCardPopupSelector = "#delete-card__popup";
const changeAvatarSelector = "#change-avatar__popup";
const changeAvatarContainer = document.querySelector(".profile__avatar-place");
const changeAvatarPopupElement = document.querySelector(
  "#change-avatar__popup"
);
const changeAvatarPopupContainer =
  changeAvatarPopupElement.querySelector(".popup__container");

//Save Buttons
const profileSaveButton = profilePopupElement.querySelector(
  ".popup__save-button"
);
const cardSaveButton = cardPopupElement.querySelector(".popup__save-button");
const avatarSaveButton = changeAvatarPopupElement.querySelector(
  ".popup__save-button"
);

const profileAvatar = document.querySelector(".profile__avatar");
const profileName = document.querySelector(nameSelector);
const profileAbout = document.querySelector(statusSelector);

let currentUserId;

const api = new Api(
  "https://mesto.nomoreparties.co/v1/cohort-61",
  "0811e36d-148a-4352-a51a-0b6cc8b0cc05"
);

//UserInf init
const UserInf = new UserInfo(nameSelector, statusSelector);

//Popup init
const imagePopup = new PopupWithImage(imagePopupSelector);
imagePopup.setEventListeners();

const deleteCardPopup = new Popup(deleteCardPopupSelector);
deleteCardPopup.setEventListeners();

const renderCard = (item) => {
  renderLoading(true, cardSaveButton, "Создать");
  api
    .postNewCard(item)
    .then((item) => {
      const newCard = new Card(
        item,
        currentUserId,
        "#card-template",
        (name, link) => {
          imagePopup.open(name, link);
        },
        deleteCard,
        likeCard,
        dislikeCard,
        deleteCardPopup
      );
      const cardElement = newCard.generate();
      cardList.addItem(cardElement);
    })
    .finally(() => {
      renderLoading(false, cardSaveButton, "Создать");
      cardPopup.close();
    });
};

const cardPopup = new PopupWithForm(cardPopupSelector, renderCard);
cardPopup.setEventListeners();

const profilePopup = new PopupWithForm(profilePopupSelector, (newItems) => {
  renderLoading(true, profileSaveButton, "Сохранить");
  api
    .changeUserInfo(newItems)
    .then((newItems) => {
      UserInf.setUserInfo({
        name: newItems.name,
        status: newItems.about,
      });
    })
    .finally(() => {
      renderLoading(false, profileSaveButton, "Сохранить");
      profilePopup.close();
    });
});
profilePopup.setEventListeners();

const changeAvatarPopup = new PopupWithForm(
  changeAvatarSelector,
  (newAvatarSrc) => {
    renderLoading(true, avatarSaveButton, "Сохранить");
    api
      .changeUserAvatar(newAvatarSrc)
      .then((response) => {
        profileAvatar.src = response.avatar;
      })
      .finally(() => {
        renderLoading(false, avatarSaveButton, "Сохранить");
        changeAvatarPopup.close();
      });
  }
);
changeAvatarPopup.setEventListeners();

//Validations init
const profileFormValidator = new FormValidator(
  validateConfig,
  profilePopupContainer.querySelector(".popup__form")
);
const newCardFormValidator = new FormValidator(
  validateConfig,
  cardPopupContainer.querySelector(".popup__form")
);
const changeAvatarValidator = new FormValidator(
  validateConfig,
  changeAvatarPopupContainer.querySelector(".popup__form")
);

//Enable validations
profileFormValidator.enableValidation();
newCardFormValidator.enableValidation();
changeAvatarValidator.enableValidation();

const cardList = new Section(
  {
    renderer: (item) => {
      const newCard = new Card(
        item,
        currentUserId,
        "#card-template",
        (name, link) => {
          imagePopup.open(name, link);
        },
        deleteCard,
        likeCard,
        dislikeCard,
        deleteCardPopup
      );
      const cardElement = newCard.generate();
      cardList.addItem(cardElement);
    },
  },
  cardsGallery
);

api.getUser().then((item) => {
  profileAvatar.src = item.avatar;
  profileName.textContent = item.name;
  profileAbout.textContent = item.about;
});

Promise.all([api.getCards(), api.getUserId()])
  .then(([items, user]) => {
    currentUserId = user._id;
    cardList.renderItems(items);
  })
  .catch((err) => {
    console.log(err);
  });

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

function openPopupChangeAvatar() {
  changeAvatarValidator.resetValidation();
  changeAvatarPopup.open();
}

function deleteCard(id) {
  return api.deleteCard(id);
}

function likeCard(cardId) {
  return api.likeCard(cardId);
}

function dislikeCard(cardId) {
  return api.dislikeCard(cardId);
}

function renderLoading(isLoading, element, initialText) {
  if (isLoading) {
    element.textContent = "Сохранение...";
  } else {
    element.textContent = initialText;
  }
}

buttonEditProfile.addEventListener("click", openPopupProfile);
buttonAddNewCard.addEventListener("click", openPopupCard);
changeAvatarContainer.addEventListener("click", openPopupChangeAvatar);