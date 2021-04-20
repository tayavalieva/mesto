const initialCardsList = [];
const elementsList = document.querySelector(".elements");

class Card {
  constructor(image, name) {
    this._image = image;
    this._name = name;
  }
  //return card html template
  // забираем размеку из HTML и клонируем элемент
  _getTemplate() {
    const cardElement = document
      .querySelector("#card-template")
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  //add card to html

  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector(".card__image").src = this._image;
    this._element.querySelector(".card__name").textContebt = this._name;

    return this._element;
  }
}

initialCardsList.forEach((item) => {
  const card = new Card(item.image, item.name);
  const cardElement = card.generateCard();
  elementsList.prepend(cardElement);
});
