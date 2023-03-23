import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
  constructor(popupSelector, deleteHandler) {
    super(popupSelector);
    this._deleteHandler = deleteHandler;
    this._deleteButton = this._popup.querySelector("#card__delete-button");
  }

  open(cardElement, cardId) {
    super.open();
    this._cardElement = cardElement;
    this._cardId = cardId;
  }

  setEventListeners() {
    super.setEventListeners();
    this._deleteButton.addEventListener("click", () => {
      this._deleteHandler(this._cardElement, this._cardId);
    });
  }
}
