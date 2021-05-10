import Popup from "./popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(url, text) {
    const popupImage = this._popup.querySelector(".popup-image__image");
    const popupImgCaption = this._popup.querySelector(".popup-image__caption");

    popupImage.src = url;
    popupImage.alt = text;
    popupImgCaption.textContent = text;

    super.open();
  }
}

export default PopupWithImage;
