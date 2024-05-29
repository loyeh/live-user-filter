const container = document.querySelector(".bottom");
const search = document.getElementById("search");

let users = [];

function userElem(user) {
  const userName = user.name;
  const userLocation = user.location;
  const div = document.createElement("div");
  div.className = "user";
  const image = document.createElement("div");
  image.className = "image";
  image.style.backgroundImage = `url(${user.picture.medium})`;
  const info = document.createElement("div");
  info.className = "info";
  info.innerHTML = `
    <div class="name">${userName.first} ${userName.last}</div>
    <div class="address">${userLocation.state}, ${userLocation.country}</div>`;
  div.appendChild(image);
  div.appendChild(info);
  container.appendChild(div);
}

function searchUser(user, text) {
  console.log(user.name.first.toLowerCase().search(text));
  if (
    user.name.first.toLowerCase().search(text) != -1 ||
    user.name.last.toLowerCase().search(text) != -1 ||
    user.location.state.toLowerCase().search(text) != -1 ||
    user.location.country.toLowerCase().search(text) != -1
  ) {
    userElem(user);
  }
}

async function randomUser() {
  const response = await fetch(
    `https://randomuser.me/api/?results=200&?seed=foobars`
  );
  const userObj = await response.json();
  console.log(
    userObj,
    userObj.results[0].location
    // user.results[0].picture.medium
  );
  users = userObj.results;
  console.log(users);
  // for (i=0;i=)
  users.forEach((user) => {
    userElem(user);
  });

  search.addEventListener("keyup", () => {
    container.innerHTML = "";
    const text = search.value.toLowerCase();
    console.log(text);
    users.forEach((user) => {
      searchUser(user, text);
    });
  });
}
// for (let i = 0; i < 20; i++) {
//   randomUser();
// }
randomUser();
