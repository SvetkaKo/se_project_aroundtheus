export default class UserInfo {
  constructor(data) {
    this._data = data;
    this._name = 'Jacques Cousteau';
    this._title = 'Explorer';
    this._profileName = document.querySelector('.profile__name');
    this._profileTitle = document.querySelector('.profile__title');
    this._profileInputName = document.querySelector('#profile-name');
    this._profileInputTitle = document.querySelector('#profile-title');
  }

  updateUserInfo(data) {
    this._name = this._data.profileName;
    this._title = this._data.profileTitle;
  }

  getUserInfo() {
    // return { name: 'this._name', title: 'this._title'}
  }

  setUserInfo() {
    // render user data in the header
    this._profileName.textContent = this._name;
    this._profileTitle.textContent = this._title;

    // input fields
    this._profileInputName.value = this._name;
    this._profileInputTitle.value = this._title;
  }
}
