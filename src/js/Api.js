export default class Api {
    constructor(config,) {
      this.token = config.token;
      this.baseUrl = config.baseUrl;
    }
    getUserInfo = () =>{
      return fetch(`${this.baseUrl}users/me`, {
        headers: {
          authorization: 'ca5c4c0a-bb5a-4022-aec3-744a34352b88'
        }
      }).then(res=>{
        if(res.ok){
          return res.json();
        }
        return Promise.reject(res.status)
      })
    }
    updateUserInfo = (userData) =>{
        return fetch(`${this.baseUrl}users/me`, {
            method: 'PATCH',
            headers: {
                authorization: 'ca5c4c0a-bb5a-4022-aec3-744a34352b88',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: userData.name,
                about: userData.about
            })
        })
    }
    getCards=()=>{
      return fetch(`${this.baseUrl}cards`, {
        headers: {
            authorization: 'ca5c4c0a-bb5a-4022-aec3-744a34352b88'
        }
        }).then(res=>{
            if(res.ok){
                return res.json();
            }
            return Promise.reject(res.status);
        })
    }
    addCard = (cardData) => {
      return fetch(`${this.baseUrl}cards`, {
        method: 'POST',
        headers: {
            authorization: 'ca5c4c0a-bb5a-4022-aec3-744a34352b88',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: cardData.name,
          link: cardData.link
        })
    }).then(res=> {
      if(res.ok){
        return res.json();
      }
      return Promise.reject();
    })
    }
    delCard = (id)=>{
      return fetch(`${this.baseUrl}cards/${id}`,{
        method: 'DELETE',
        headers: {
          authorization: 'ca5c4c0a-bb5a-4022-aec3-744a34352b88',
          'Content-Type': 'application/json'
        }
      }).then(res=>{
        if(res.ok){
          return res
        }
        return Promise.reject(res.status)
      })
    }
    addLikeCard = (id) =>{
      return fetch(`${this.baseUrl}cards/like/${id}`, {
        method: 'PUT',
        headers: {
          authorization: 'ca5c4c0a-bb5a-4022-aec3-744a34352b88',
          'Content-Type': 'application/json'
        }
      }).then(res=>{
        if(res.ok){
          return res.json();
        }
        return Promise.reject(res.status)
      })
    }
    delLikeCard = (id) =>{
      return fetch(`${this.baseUrl}cards/like/${id}`, {
        method: 'DELETE',
        headers: {
          authorization: 'ca5c4c0a-bb5a-4022-aec3-744a34352b88',
          'Content-Type': 'application/json'
        }
      }).then(res=>{
        if(res.ok){
          return res.json();
        }
        return Promise.reject(res.status)
      })
    }
}