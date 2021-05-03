import { openPopup, popupImage, popupImg, popupImgCaption } from "./index.js";

export class Card {
  constructor(image, name, cardTemplateSelector) {
    this._image = image;
    this._name = name;
    this._cardTemplateSelector = cardTemplateSelector;
  }

  //return card html template
  // find HTML template and clone element
  _getTemplate() {
    const cardElement = document
      .querySelector(`.${this._cardTemplateSelector}`)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._element
      .querySelector(".like-button")
      .addEventListener("click", () => this._handleLikeBtn());

    this._element
      .querySelector(".card__delete-icon")
      .addEventListener("click", () => this._handleDeleteBtn());

    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => this._handleImageClick());
  }

  _handleLikeBtn() {
    this._element
      .querySelector(".like-button")
      .classList.toggle("like-button_active");
  }

  _handleDeleteBtn() {
    this._element.remove();
  }

  _handleImageClick() {
    popupImg.src = this._image;
    popupImgCaption.textContent = this._name;
    popupImg.alt = this._name;
    openPopup(popupImage);
  }

  //add card to html

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".card__image").src = this._image;
    this._element.querySelector(".card__image").alt = this._name;
    this._element.querySelector(".card__name").textContent = this._name;

    return this._element;
  }
}
