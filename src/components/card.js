export class Card {
  constructor(
    imageLink,
    name,
    _id,
    owner,
    likes,
    cardTemplateSelector,
    handleCardClick
  ) {
    this._imageLink = imageLink;
    this._name = name;
    this._id = _id;
    this._owner = owner;
    this._likes = likes;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
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

  getID() {
    return this._id;
  }

  getOwner() {
    return this._owner._id;
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
      .addEventListener("click", () =>
        this._handleCardClick(this._imageLink, this._name)
      );
  }

  _handleLikeBtn() {
    this._element
      .querySelector(".like-button")
      .classList.toggle("like-button_active");
  }

  _handleDeleteBtn() {
    this._element.remove();
    this._element = null;
  }

  //add card to html

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const cardImage = this._element.querySelector(".card__image");

    cardImage.src = this._imageLink;
    cardImage.alt = this._name;
    this._element.querySelector(".card__name").textContent = this._name;
    this._element.querySelector(".card__like-counter").textContent =
      this._likes.length;

    return this._element;
  }
}
