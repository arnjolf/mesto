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

export { Card };
