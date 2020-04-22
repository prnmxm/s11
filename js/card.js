class Card {
  constructor(popupZoom, userInfo, api) {
    this.popupZoom = popupZoom;
    this.userInfo = userInfo;
    this.api = api;
  }

  like = (event) =>{
    event.stopPropagation();
    if(event.target.classList.contains('place-card__like-icon') &&!event.target.classList.contains('place-card__like-icon_liked')){
      this.api.addLikeCard((event.target.closest('.place-card').id))
        .then(res=>{
        this.likeCardUpdate(res,event.target)
        event.target.classList.add("place-card__like-icon_liked");
      }).catch(err=>console.log(err))
    }
    if(event.target.classList.contains('place-card__like-icon') && event.target.classList.contains('place-card__like-icon_liked')){
      event.stopPropagation();
      this.api.delLikeCard(event.target.closest('.place-card').id).then(res=>{
        this.likeCardUpdate(res,event.target)
        event.target.classList.remove("place-card__like-icon_liked");
      }).catch(err=>console.log(err))
    }
  }
  remove = (event) => {
    if(event.target.classList.contains('place-card__delete-icon')){
      event.stopPropagation();
      if (window.confirm("Вы действительно хотите удалить эту карточку?")) { 
        this.api.delCard(event.target.closest('.place-card').id).then(res=>{
          event.target.closest(".place-card").remove();
        }).catch(err=>console.log(err))
      }
    }
  }
  zoom = (event) =>{
    event.stopPropagation();
    if(event.target.classList.contains('place-card__image')){
      this.popupZoom.open(event);
    }
  }
  eventAdd(container){
    container.addEventListener("click", this.like);
    container.addEventListener("click", this.remove);
    container.addEventListener("click", this.zoom);
  }
  create(cardData) {
    const placeCard = document.createElement("div");
    placeCard.insertAdjacentHTML("afterbegin", this.getTemplate(cardData));
    placeCard.classList.add("place-card");
    placeCard.id = cardData._id;
    return placeCard;
  }
  checkId(id){
    if(id === this.userInfo.info._id){
      return `<button class="place-card__delete-icon"></button>`;
    }
    return '';
  }
  likeCard(cardData){
    const sumLike = cardData.likes.length;
    let like = (cardData.likes).find(e=>{
      return e._id === this.userInfo.info._id; 
    })
    return `<button class="place-card__like-icon ${like ? 'place-card__like-icon_liked': ''}"></button>
    <span class="place-card__sum-like">${sumLike}</span>`;
  }
  likeCardUpdate(cardData,target){
    const sumLike = cardData.likes.length;
    target.closest('.place-card__like-container').querySelector('.place-card__sum-like').textContent = sumLike;
  }
  getTemplate(cardData) {
    const template = `
      <div class="place-card__image" style="background: url(${cardData.link})">
        ${this.checkId(cardData.owner._id)}
      </div>
      <div class="place-card__description">
        <h3 class="place-card__name">${cardData.name}</h3>
        <div class="place-card__like-container">
        ${this.likeCard(cardData)}
        </div> 
      </div>
      `;
    return template;
  }
}
