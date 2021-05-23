//expects { nameSelector: ".profile__header", infoSelector: ".profile__caption" };
export class UserInfoRenderer {
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

  renderUserInfo({ name, about }) {
    this._userName.textContent = name;
    this._userInfo.textContent = about;
    console.log(this._userName.textContent, this._userInfo.textContent);
  }

  fillInputsValue() {
    this._nameInput.value = this._userName.textContent;
    this._infoInput.value = this._userInfo.textContent;
  }
}
