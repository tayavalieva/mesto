export class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  _handlelResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  }

  getInitialData() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  deleteCard(cardID) {
    return fetch(`${this._url}/cards/${cardID}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handlelResponse);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._handlelResponse);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then(this._handlelResponse);
  }

  setLikes(cardID) {
    return fetch(`${this._url}/cards/likes/${cardID}`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._handlelResponse);
  }

  deleteLike(cardID) {
    return fetch(`${this._url}/cards/likes/${cardID}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handlelResponse);
  }

  setNewUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.user_name,
        about: data.about,
      }),
    }).then(this._handlelResponse);
  }

  setAvatar({ link }) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this._handlelResponse);
  }

  postCard({ place_name, photo_link }) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: place_name,
        link: photo_link,
      }),
    }).then(this._handlelResponse);
  }
}
