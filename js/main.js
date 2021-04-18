const $popupBackground = document.querySelector('.popup-bg')
const $closePopup = document.querySelector('.close-popup')
const $allCards = document.querySelector('.allcards')
const $allPosts = document.querySelector('.allpost')
const $getusers = document.querySelector('.getusers')

$getusers.addEventListener('click', function () {
  $getusers.classList.add('hide')
  $allCards.classList.remove('hide')
  getResponse()
})

async function getResponse() {
  let response = await fetch('https://jsonplaceholder.typicode.com/users')
  let content = await response.json()

  for (let key in content) {
    $allCards.innerHTML += `
    <div class="card">
    <img src="./images/user.png" class="user-image" alt="">
    <h3 class="userid">ID:${content[key].id}</h3>
    <h2 class="username">${content[key].username}</h2>
    <h2 class="name">${content[key].name}</h2>
    <h3 class="email">${content[key].email}</h2>
    <button value="${content[key].id}" class="showMore">Show posts</button>
     </div>
  `
  }
}

async function getUserPosts(userID) {
  let response = await fetch('https://jsonplaceholder.typicode.com/posts')
  let content = await response.json()
  userID = parseInt(userID)

  for (let key in content) {
    if (userID === content[key].userId) {
      $allPosts.innerHTML += `
      <div class="userpost">
      <div class="post_number">Post# ${content[key].id}</div>
      <h3 class="userpost__title">${content[key].title}</h3>
      <h2 class="userpost__body">${content[key].body}</h2>
      </div>`
    }
  }
}

$allCards.addEventListener('click', function (event) {
  const tagName = event.target.className
  const userID = event.target.value
  if (tagName === 'showMore') {
    $popupBackground.classList.remove('hide')
    $allPosts.innerHTML = ''
    getUserPosts(userID)
  } else {
    return
  }
})

$closePopup.addEventListener('click', function () {
  $popupBackground.classList.add('hide')
})
