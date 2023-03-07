class Card {
  constructor(obj, selector, handleCardClick) {
    this._name = obj.name;
    this._link = obj.link;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
  }

  _getCard() {
    const template = document
      .querySelector(this._selector)
      .content.querySelector(".element")
      .cloneNode(true);
    return template;
  }

  _setEventListeners() {
    this._card
      .querySelector(".element__like-button")
      .addEventListener("click", this._likeCard);

    this._card
      .querySelector(".element__trash-can")
      .addEventListener("click", this._deleteCard.bind(this._card));

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _deleteCard() {
    this.remove();
  }

  _likeCard() {
    this.classList.toggle("element__like-button_active");
  }

  generate() {
    this._card = this._getCard();
    this._cardImage = this._card.querySelector(".element__image");
    this._setEventListeners();

    const nameElement = this._card.querySelector(".element__place");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._link;
    nameElement.textContent = this._name;
    return this._card;
  }
}

export { Card };
