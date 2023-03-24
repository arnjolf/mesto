class Card {
  constructor(
    obj,
    currentUserId,
    selector,
    handleCardClick,
    deleteCardHandler,
    likeCardHandler
  ) {
    this._name = obj.name;
    this._link = obj.link;
    this._likesQuantity = obj.likes.length;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._isOwner = currentUserId === obj.owner._id;
    this._id = obj._id;
    this._isLiked = obj.likes.some((element) => {
      return element._id === currentUserId;
    });
    this._deleteCardHandler = deleteCardHandler;
    this._likeCardHandler = likeCardHandler;
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
      .addEventListener("click", this._likeCard.bind(this));

    this._trashCan.addEventListener("click", this._deleteCardPopup.bind(this));

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _deleteCardPopup() {
    this._deleteCardHandler(this);
  }

  deleteCard() {
    this._card.remove();
  }

  _likeCard() {
    this._likeCardHandler(this);
  }

  likeCardEvent(res) {
    this._likesCounter.textContent = res.likes.length;
    this._likeButton.classList.toggle("element__like-button_active");
    this._isLiked = !this._isLiked;
  }

  _loadImg() {
    const img = new Image();
    img.onload = () => {
      this._cardImage.src = this._link;
    };
    img.onerror = () => {
      this._link =
        "https://avatars.mds.yandex.net/get-mpic/6780724/img_id5398870021742881284.jpeg/orig";
      this._cardImage.src = this._link;
    };
    img.src = this._link;
  }

  generate() {
    this._card = this._getCard();
    this._likeButton = this._card.querySelector(".element__like-button");
    this._cardImage = this._card.querySelector(".element__image");
    this._trashCan = this._card.querySelector(".element__trash-can");
    this._setEventListeners();

    if (this._isLiked) {
      this._likeButton.classList.add("element__like-button_active");
    }

    if (!this._isOwner) {
      this._trashCan.remove();
    }

    this._likesCounter = this._card.querySelector(".element__like-counter");
    const nameElement = this._card.querySelector(".element__place");

    this._loadImg();
    this._cardImage.alt = this._name;
    nameElement.textContent = this._name;
    this._likesCounter.textContent = this._likesQuantity;
    return this._card;
  }
}

export { Card };
