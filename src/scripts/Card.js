class Card {
  constructor(obj, selector, handleCardClick) {
    this.name = obj.name;
    this.link = obj.link;
    this.selector = selector;
    this.handleCardClick = handleCardClick;
  }

  _getCard() {
    const template = document
      .querySelector(`${this.selector}`)
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
      .addEventListener("click", this._deleteCard);

    this._cardImage.addEventListener("click", () => {
      this.handleCardClick(this.name, this.link);
    });
  }

  _deleteCard() {
    this.closest(".element").remove();
  }

  _likeCard() {
    this.classList.toggle("element__like-button_active");
  }

  generate() {
    this._card = this._getCard();
    this._cardImage = this._card.querySelector(".element__image");
    this._setEventListeners();

    const nameElement = this._card.querySelector(".element__place");

    this._cardImage.src = this.link;
    this._cardImage.alt = this.link;
    nameElement.textContent = this.name;
    return this._card;
  }
}

export { Card };
