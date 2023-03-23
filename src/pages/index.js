import "./index.css";
import {
  validateConfig,
  buttonEditProfile,
  buttonAddNewCard,
  profilePopupContainer,
  nameInput,
  jobInput,
  cardPopupContainer,
  cardsGallery,
  cardPopupSelector,
  profilePopupSelector,
  imagePopupSelector,
  nameSelector,
  statusSelector,
  deleteCardPopupSelector,
  changeAvatarSelector,
  changeAvatarContainer,
  changeAvatarPopupContainer,
  profileSaveButton,
  cardSaveButton,
  avatarSaveButton,
  profileAvatar,
  profileName,
  profileAbout,
} from "../utils/constants.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import Popup from "../components/Popup";
import PopupDeleteCard from "../components/PopupDeleteCard.js";

let currentUserId;
const api = new Api(
  "https://mesto.nomoreparties.co/v1/cohort-61",
  "0811e36d-148a-4352-a51a-0b6cc8b0cc05"
);

//userInf init
const userInf = new UserInfo(nameSelector, statusSelector, profileAvatar);

//Popup init
const imagePopup = new PopupWithImage(imagePopupSelector);
imagePopup.setEventListeners();

const deleteCardPopup = new PopupDeleteCard(deleteCardPopupSelector, (card) => {
  deleteCard(card._id)
    .then(() => {
      card.deleteCard();
    })
    .finally(() => {
      deleteCardPopup.close();
    })
    .catch((err) => {
      console.log(err);
    });
});
deleteCardPopup.setEventListeners();

function deleteCardHandler(card) {
  deleteCardPopup.open(card);
}

function createNewCard(item) {
  const newCard = new Card(
    item,
    currentUserId,
    "#card-template",
    (name, link) => {
      imagePopup.open(name, link);
    },
    deleteCardHandler,
    likeCard,
    dislikeCard
  );
  const cardElement = newCard.generate();
  return cardElement;
}

const renderCard = (item) => {
  renderLoading(true, cardSaveButton, "Создать");
  api
    .postNewCard(item)
    .then((item) => {
      cardList.addItem(createNewCard(item));
    })
    .then(() => {
      cardPopup.close();
    })
    .catch(() => {
      alert(`Ошибка при указании ссылки!`);
    })
    .finally(() => {
      renderLoading(false, cardSaveButton, "Создать");
    });
};

const cardPopup = new PopupWithForm(cardPopupSelector, renderCard);
cardPopup.setEventListeners();

const profilePopup = new PopupWithForm(profilePopupSelector, (newItems) => {
  renderLoading(true, profileSaveButton, "Сохранить");
  api
    .changeUserInfo(newItems)
    .then((newItems) => {
      userInf.setUserInfo({
        name: newItems.name,
        status: newItems.about,
      });
    })
    .then(() => {
      profilePopup.close();
    })
    .finally(() => {
      renderLoading(false, profileSaveButton, "Сохранить");
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
        userInf.setUserAvatar(response.avatar);
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
      cardList.addItemAppend(createNewCard(item));
    },
  },
  cardsGallery
);

Promise.all([api.getCards(), api.getUser()])
  .then(([items, user]) => {
    currentUserId = user._id;
    userInf.setUserInfo({ name: user.name, status: user.about });
    userInf.setUserAvatar(user.avatar);
    cardList.renderItems(items);
  })
  .catch((err) => {
    console.log(err);
  });

function openPopupProfile(event) {
  const userInfo = userInf.getUserInfo();
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
