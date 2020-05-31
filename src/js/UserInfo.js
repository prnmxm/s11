export default class UserInfo {
  constructor(api, container) {
    this.info = {};
    this.api = api;
    this.container = container;
  }

  setUserInfo() {
    this.api.getUserInfo().then(res=>{
      this.render(res)
      this.info = res;
    })
  }

  updateUserInfo(userData) {
    this.api.updateUserInfo(userData).then(res=>{
      this.info = res;
      this.render(userData);
    }).catch(err => console.log(err))

  }
  render(userData){
    this.container.querySelector(".user-info__name").textContent = userData.name;
    this.container.querySelector(".user-info__job").textContent = userData.about;
  }
}
