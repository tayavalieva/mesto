//expects { nameSelector: ".profile__header", infoSelector: ".profile__caption" };
export class UserInfo {
  constructor(userInfoSelectors) {
    this._userNameElement = document.querySelector(
      userInfoSelectors.nameSelector
    );

    this._infoElement = document.querySelector(userInfoSelectors.infoSelector);

    this._nameInput = document.querySelector(
      userInfoSelectors.nameInputSelector
    );

    this._infoInput = document.querySelector(
      userInfoSelectors.infoInputSelector
    );

    this._avatarElement = document.querySelector(
      userInfoSelectors.avatarSelector
    );
  }

  setUser({ name, about, _id, avatar }) {
    this._name = name;
    this._about = about;
    this._id = _id;
    this._avatar = avatar;
  }

  renderUserInfo() {
    this._userNameElement.textContent = this._name;
    this._infoElement.textContent = this._about;
    this._avatarElement.src = this._avatar;
  }

  fillInputsValue() {
    this._nameInput.value = this._name;
    this._infoInput.value = this._about;
  }

  getID() {
    return this._id;
  }
}
