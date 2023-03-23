export default class UserInfo {
  constructor(nameSelector, statusSelector, avatarElement) {
    this._name = document.querySelector(nameSelector);
    this._status = document.querySelector(statusSelector);
    this._avatar = avatarElement;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      status: this._status.textContent,
    };
  }

  setUserInfo({ name, status }) {
    this._name.textContent = name;
    this._status.textContent = status;
  }

  setUserAvatar(avatar) {
    this._avatar.src = avatar;
  }
}
