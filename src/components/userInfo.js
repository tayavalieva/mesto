//expects { nameSelector: ".profile__header", infoSelector: ".profile__caption" };
export class UserInfo {
  constructor(userInfoSelectors) {
    this._userInfoSelectors = userInfoSelectors;

    this._userName = document.querySelector(
      this._userInfoSelectors.nameSelector
    );

    this._userInfo = document.querySelector(
      this._userInfoSelectors.infoSelector
    );
  }

  getUserInfo() {
    const currentUser = {
      nameSelector: this._userName.textContent,
      infoSelector: this._userInfo.textContent,
    };
    return currentUser;
  }

  // expected {user_name: '...', about: '...'}

  setUserInfo({ user_name, about }) {
    this._userName.textContent = user_name;
    this._userInfo.textContent = about;
  }
}
