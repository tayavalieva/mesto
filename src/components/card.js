export class Card {
  constructor(
    imageLink,
    name,
    _id,
    ownerID,
    likes,
    currentUserID,
    cardSelectors,
    handleCardClick,
    handleDeleteCard
  ) {
    this._imageLink = imageLink;
    this._name = name;
    this._id = _id;
    this._ownerID = ownerID;
    this._likes = likes;
    this._currentUserID = currentUserID;
    this._cardSelectors = cardSelectors;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
  }

  //return card html template
  // find HTML template and clone element
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelectors.cardTemplateSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  getID() {
    return this._id;
  }

  getOwner() {
    return this._ownerID;
  }

  _renderDeleteBtn() {
    const deleteBtn = this._element.querySelector(
      this._cardSelectors.cardDeleteBtn
    );
    if (this._ownerID !== this._currentUserID) {
      deleteBtn.remove();
    }
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
    //call back handle
    this._handleDeleteCard(this._id);
    this._element.remove();
    this._element = null;
  }

  //add card to html

  generateCard() {
    this._element = this._getTemplate();

    this._setEventListeners();
    this._renderDeleteBtn();
    console.log(this._id, this._ownerID, this._currentUserID);

    const cardImage = this._element.querySelector(".card__image");
    cardImage.src = this._imageLink;
    cardImage.alt = this._name;
    this._element.querySelector(".card__name").textContent = this._name;
    this._element.querySelector(".card__like-counter").textContent =
      this._likes.length;

    return this._element;
  }
}
