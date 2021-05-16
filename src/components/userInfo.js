//expects { nameSelector: ".profile__header", infoSelector: ".profile__caption" };
export class UserInfo {
  constructor(userInfoSelectors) {
    this._userInfoSelectors = userInfoSelectors;
  }

  getUserInfo() {
    const currentName = document.querySelector(
      this._userInfoSelectors.nameSelector
    ).textContent;
    const currentInfo = document.querySelector(
      this._userInfoSelectors.infoSelector
    ).textContent;
    const currentUser = {
      nameSelector: currentName,
      infoSelector: currentInfo,
    };
    return currentUser;
  }

  // expected {user_name: '...', about: '...'}

  setUserInfo({ user_name, about }) {
    const userName = document.querySelector(
      this._userInfoSelectors.nameSelector
    );
    const userInfo = document.querySelector(
      this._userInfoSelectors.infoSelector
    );
    userName.textContent = user_name;
    userInfo.textContent = about;
  }
}
