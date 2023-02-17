import { openPopup, cardImagePopup } from "./index.js";

const popupImage = document.querySelector(".popup__image");
const popupPlaceName = document.querySelector(".popup__place-name");

class Card {
  constructor(obj, selector) {
    this.name = obj.name;
    this.link = obj.link;
    this.selector = selector;
  }

  _getCard() {
    const template = document
      .querySelector(`${this.selector}`)
      .content.querySelector(".element")
      .cloneNode(true);
    console.log(template);
    return template;
  }

  _setEventListeners() {
    this._card
      .querySelector(".element__like-button")
      .addEventListener("click", this._likeCard);

    this._card
      .querySelector(".element__trash-can")
      .addEventListener("click", this._deleteCard);

    this._card
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._openCard(this.name, this.link);
      });
  }

  _deleteCard() {
    this.closest(".element").remove();
  }

  _likeCard() {
    this.classList.toggle("element__like-button_active");
  }

  _openCard() {
    popupImage.src = this.link;
    popupImage.alt = this.name;
    popupPlaceName.textContent = this.name;
    openPopup(cardImagePopup);
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

export { Card };
