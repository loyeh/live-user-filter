const container = document.querySelector(".bottom");
const users = [];
class newUser {
  constructor(first, last, state, country, picture) {
    this.first = first;
    this.last = last;
    this.state = state;
    this.country = country;
    this.picture = picture;
  }
}

async function randomUser() {
  const response = await fetch(
    `https://randomuser.me/api/?inc=name,picture,location`
  );
  const user = await response.json();
  console.log(
    user.results[0].name,
    user.results[0].location,
    user.results[0].picture.medium
  );
  const userName = user.results[0].name;
  const userLocation = user.results[0].location;
  // const userName=user.results[0].name;
  const userInfo = new newUser(
    userName.first,
    userName.last,
    userLocation.state,
    userLocation.country,
    user.results[0].picture.medium
  );
  const div = document.createElement("div");
  div.className = "user";
  const image = document.createElement("div");
  image.className = "image";
  image.style.backgroundImage = `url(${user.results[0].picture.medium})`;
  const info = document.createElement("div");
  info.className = "info";
  info.innerHTML = `
    <div class="name">${userName.first} ${userName.last}</div>
    <div class="address">${userLocation.state}, ${userLocation.country}</div>`;
  div.appendChild(image);
  div.appendChild(info);
  container.appendChild(div);
  users.push(userInfo);
}
for (let i = 0; i < 20; i++) {
  randomUser();
}
console.log(users);
