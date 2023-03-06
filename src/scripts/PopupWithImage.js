import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._link = this._popup.querySelector(".popup__image");
    this._placeName = this._popup.querySelector(".popup__place-name");
  }

  open(name, link) {
    this._link.src = link;
    this._placeName.textContent = name;
    super.open();
  }
}
