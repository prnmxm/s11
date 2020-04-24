export default class CardList {
  constructor(container, template, apiGetCards, card) {
    this.container = container;
    this.template = template;
    this.apiGetCards = apiGetCards;
    this.card = card;
  }

  addCard(cardItem) {
    const item = this.template.create(cardItem);
    this.container.appendChild(item);
  }

  render() {
    this.card.eventAdd(this.container);
    this.apiGetCards().then(res=>{
      res.forEach(e => {
        this.addCard(e);
      });
    }).catch(err=>console.log(err))
    
  }
}
