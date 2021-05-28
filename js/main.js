const form = document.querySelector(".get-users")
const select = document.querySelector(".get-users__select")
const input = document.querySelector(".get-users__input")
const resultArea = document.querySelector(".user-list")

const getUsers = (e) => {
  e.preventDefault()
  const number = Number(input.value)
  const userGender = select.value

  if (number) {
    const url = `https://randomuser.me/api?results=${number}&gender=${userGender}`
    fetch(url)
      .then((data) => {
        if (data.status !== 200) {
          throw Error("This is not a valid answer from API")
        } else {
          return data.json()
        }
      })
      .then(({ results }) => showUsers(results))
      .catch((err) => console.log(err))
  }
}

const showUsers = (users) => {
  users.forEach((user) => {
    const item = document.createElement("div")
    const { title, first, last } = user.name
    item.className = "user-list__user user"
    item.innerHTML = `
    <img class="user__img" src="${user.picture.medium}">
    <div class="user__name">${title.toUpperCase()} ${first.toUpperCase()} ${last.toUpperCase()}</div>
    
    `
    resultArea.appendChild(item)
  })
}

form.addEventListener("submit", getUsers)
