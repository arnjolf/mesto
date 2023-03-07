import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".popup__image");
    this._placeName = this._popup.querySelector(".popup__place-name");
  }

  open(name, link) {
    this._image.src = link;
    this._image.alt = name;
    this._placeName.textContent = name;
    super.open();
  }
}
