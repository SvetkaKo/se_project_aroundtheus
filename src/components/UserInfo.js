export default class UserInfor {
  constructor({ nameSelector, aboutMeSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutMeElement = document.querySelector(aboutMeSelector);
  }

  getUserInfo() {
    return {
      profileName: this._nameElement.textContent,
      profileTitle: this._aboutMeElement.textContent,
    };
  }

  setUserInfo(data) {
    this._nameElement.textContent = data.profileName;
    this._aboutMeElement.textContent = data.profileTitle;
  }
}
