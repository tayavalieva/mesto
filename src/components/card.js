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
    handleDeleteCard,
    handleCardLikeBtn
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
    this._handleCardLikeBtn = handleCardLikeBtn;
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
      .addEventListener("click", () => this._handleCardLikeBtn(this));

    // this._element
    //   .querySelector(".like-button")
    //   .addEventListener("click", () => this._handleLikeElement());

    this._element
      .querySelector(".card__delete-icon")
      .addEventListener("click", () => this._handleDeleteBtn());

    this._element
      .querySelector(".card__image")
      .addEventListener("click", () =>
        this._handleCardClick(this._imageLink, this._name)
      );
  }

  _handleDeleteBtn() {
    this._handleDeleteCard(this);
  }

  deleteCardElement() {
    this._element.remove();
    this._element = null;
  }

  isLikedByCurrentUser() {
    return (
      this._likes.find((like) => like._id === this._currentUserID) !== undefined
    );
  }

  _renderActiveLikeElement() {
    const likeElement = this._element.querySelector(".like-button");
    if (this.isLikedByCurrentUser()) {
      likeElement.classList.add("like-button_active");
    } else {
      likeElement.classList.remove("like-button_active");
    }
  }

  setLikes(likes) {
    this._likes = likes;
  }

  renderLikes() {
    this._element.querySelector(".card__like-counter").textContent =
      this._likes.length;
    this._renderActiveLikeElement();
  }

  //add card to html

  generateCard() {
    this._element = this._getTemplate();

    this._setEventListeners();
    this._renderDeleteBtn();
    console.log(
      "Card ID:",
      this._id,
      "Cards owner ID:",
      this._ownerID,
      "Current user ID:",
      this._currentUserID,
      "likes:",
      this._likes
    );

    const cardImage = this._element.querySelector(".card__image");
    cardImage.src = this._imageLink;
    cardImage.alt = this._name;
    this._element.querySelector(".card__name").textContent = this._name;
    this.renderLikes();

    return this._element;
  }
}
