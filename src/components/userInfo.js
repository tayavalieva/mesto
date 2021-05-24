//expects { nameSelector: ".profile__header", infoSelector: ".profile__caption" };
export class UserInfo {
  constructor(userInfoSelectors) {
    this._userInfoSelectors = userInfoSelectors;

    this._userName = document.querySelector(userInfoSelectors.nameSelector);

    this._userInfo = document.querySelector(userInfoSelectors.infoSelector);

    this._nameInput = document.querySelector(
      userInfoSelectors.nameInputSelector
    );

    this._infoInput = document.querySelector(
      userInfoSelectors.infoInputSelector
    );
  }

  setUser({ userID }) {
    this._userID = userID;
  }

  renderUserInfo({ name, about }) {
    this._userName.textContent = name;
    this._userInfo.textContent = about;
  }

  fillInputsValue() {
    this._nameInput.value = this._userName.textContent;
    this._infoInput.value = this._userInfo.textContent;
  }
}
