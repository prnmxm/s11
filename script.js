const api = new Api('https://praktikum.tk/cohort9/', 'ca5c4c0a-bb5a-4022-aec3-744a34352b88')
const root = document.querySelector(".root");
const placeList = root.querySelector(".places-list");

const buttonAdd = document.querySelector('[name="modalAdd"]');
const buttonEdit = document.querySelector('[name="modalEdit"]');

const modalAdd = document.querySelector("#modalAdd");
const modalEdit = document.querySelector("#modalEdit");
const modalZoom = document.querySelector(".boxImg");
const formValidator = new FormValidator();

const popupZoom = new PopupZoom(modalZoom);
const userContainer = document.querySelector(".user-info");
const userInfo = new UserInfo(api, userContainer);
userInfo.setUserInfo();
const popup = new Popup();
const card = new Card(popupZoom, userInfo, api);
const cardList = new CardList(placeList, card, api.getCards, card);



const popupAdd = new PopupAdd(modalAdd, formValidator, cardList, api);
const popupEdit = new PopupEdit(modalEdit, formValidator, userInfo);

buttonAdd.addEventListener("click", popupAdd.open.bind(popupAdd));
buttonEdit.addEventListener("click", popupEdit.open.bind(popupEdit));

cardList.render();

/**
 * Здравствуйте.
 *
 * Название файлов должно быть идентично названию классов, то есть с большой буквы, так принято.
 *
 * шикарная работа, только зачем вы в классе Api не используете this.token, хотя его передаёте
 *
 * Работа принимается.
 *
 *
 */