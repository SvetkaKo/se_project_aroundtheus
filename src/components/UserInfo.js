export default class UserInfor {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
      avatar: this._avatarElement.src,
    };
  }

  setUserInfo(userData) {
    this._nameElement.textContent = userData.name;
    this._aboutElement.textContent = userData.about;
    this._avatarElement.src = userData.avatar;
  }

  setUserAvatar(userData) {
    this._avatarElement.src = userData.avatar;
  }
}
