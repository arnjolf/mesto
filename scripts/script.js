const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddNewCard = document.querySelector(".profile__add-button");

const profilePopup = document.querySelector("#profile__popup");
const profileForm = profilePopup.querySelector(".popup__container");
const nameInput = profileForm.querySelector("#popup__name");
const jobInput = profileForm.querySelector("#popup__job");
const buttonClosePopupProfile = profilePopup.querySelector(".popup__close");

const newCardPopup = document.querySelector("#add-card__popup");
const newCardForm = newCardPopup.querySelector(".popup__container");
const placeName = newCardForm.querySelector("#place-name");
const cardImage = newCardForm.querySelector("#card-image");
const buttonClosePopupCard = newCardPopup.querySelector(".popup__close");

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

class Card {
  constructor(obj, selector) {
    this.name = obj.name;
    this.link = obj.link;
  }

  _getCard() {
    const template = document
      .querySelector("#card-template")
      .content.querySelector(".element")
      .cloneNode(true);
    console.log(template);
    return template;
  }

  _setEventListeners() {
    this._likeButton();
    this._deleteButton();
    this._openImage();
  }

  _likeButton() {
    this._card
      .querySelector(".element__like-button")
      .addEventListener("click", likeCard);
  }

  _deleteButton() {
    this._card
      .querySelector(".element__trash-can")
      .addEventListener("click", deleteCard);
  }

  _openImage() {
    this._card
      .querySelector(".element__image")
      .addEventListener("click", () => {
        openCard(this.name, this.link);
      });
  }

  generate() {
    this._card = this._getCard();
    this._setEventListeners();

    const imgElement = this._card.querySelector(".element__image");
    const nameElement = this._card.querySelector(".element__place");

    imgElement.src = this.link;
    imgElement.alt = this.link;
    nameElement.textContent = this.name;
    console.log(this._card);
    return this._card;
  }
}

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

function deleteCard(event) {
  console.log(event.target.parentNode);
  event.target.closest(".element").remove();
}

function likeCard(event) {
  event.target.classList.toggle("element__like-button_active");
}

function openCard(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupPlaceName.textContent = name;
  openPopup(cardImagePopup);
}

function openPopupProfile(event) {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  const buttonElement = profilePopup.querySelector(".popup__save-button");
  openPopup(profilePopup);
}

function openPopupCard(event) {
  openPopup(newCardPopup);
}

function openPopup(currentPopup) {
  currentPopup.classList.add("popup_opened");
  currentPopup.addEventListener("keydown", closePopupEscapeBtn);
}

function closePopup(currentPopup) {
  currentPopup.classList.remove("popup_opened");
  console.log(currentPopup);
  currentPopup.removeEventListener("keydown", closePopupEscapeBtn);
}

function closePopupDomElement(event) {
  const currentPopup = event.target.closest(".popup");
  closePopup(currentPopup);
}

function submitHandleForm(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopupDomElement(event);
}

function submitNewCard(event) {
  event.preventDefault();
  const newCardItem = {};
  newCardItem.name = placeName.value;
  newCardItem.link = cardImage.value;
  const buttonElement = event.target.querySelector(".popup__save-button");
  const inputList = Array.from(event.target.querySelectorAll(".popup__input"));
  addNewCard(newCardItem);
  closePopupDomElement(event);
  placeName.value = "";
  cardImage.value = "";
  toggleButtonState(inputList, buttonElement, validateConfig);
}

function closePopupListeners() {
  const popupList = Array.from(document.querySelectorAll(".popup"));
  closePopupByOverlay(popupList);
}

function closePopupByOverlay(popupList) {
  popupList.forEach((element) => {
    element.addEventListener("mousedown", function (evt) {
      if (evt.target.classList.contains("popup")) {
        closePopupDomElement(evt);
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
buttonClosePopupCard.addEventListener("click", closePopupDomElement);
buttonClosePopupProfile.addEventListener("click", closePopupDomElement);
buttonClosePopupImage.addEventListener("click", closePopupDomElement);
profileForm.addEventListener("submit", submitHandleForm);
newCardForm.addEventListener("submit", submitNewCard);
