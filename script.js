const BASE_URL = 'https://user-list.alphacamp.io'
const INDEX_URL = BASE_URL + '/api/v1/users/'
const UserList = []
const cardContainer = document.querySelector('#user-container')

function renderUserCards(){
  let HTMLContent = ''

  UserList.forEach(user => {
    HTMLContent += `
      <div class="card m-2" data-bs-toggle="modal" data-bs-target="#user-modal">
        <img class="card-img-top" src="${user.avatar}" alt="Card image cap" data-modal-user-id="${user.id}">
        <div class="card-body" data-modal-user-id="${user.id}">
          <h5 class="card-title mb-0" data-modal-user-id="${user.id}">${user.name} ${user.surname}</h5>
        </div>
      </div>
    `
  })
  cardContainer.innerHTML = HTMLContent
}

function showMoreUserInfo(event){
  const id = event.target.dataset.modalUserId
  if(!id){
    return
  }
  
  const modalTitleBox = document.querySelector('.modal-title')
  const modalAvatarBox = document.querySelector('.modal-avatar')
  const modalDescriptionBox = document.querySelector('.modal-user-info')
  
  modalTitleBox.textContent = ''
  modalAvatarBox.src = ''
  modalDescriptionBox.textContent = ''
  
  axios
    .get(INDEX_URL + id)
    .then(response => {
      const user = response.data
      modalTitleBox.textContent = user.name + ' ' + user.surname
      modalAvatarBox.src = user.avatar
      modalDescriptionBox.innerHTML = `
       <li>Email：${user.email}</li>
       <li>Gender：${user.gender}</li>
       <li>Age：${user.age}</li>
       <li>Region：${user.region}</li>
       <li>Birthday：${user.birthday}</li>`
    })
    .catch(error => console.log(error))
  }
      
 function renderAllUsers(){
   axios
    .get(INDEX_URL)
    .then(response => {
     UserList.push(...response.data.results)
     renderUserCards()
   })
    .catch(error => console.log(error))
}
     
cardContainer.addEventListener('click', showMoreUserInfo)
renderAllUsers()