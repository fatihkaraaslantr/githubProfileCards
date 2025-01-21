//api
const API_URL = "https://api.github.com/users/";

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");

//get api
async function getUser(username) {
  try {
    const { data } = await axios(API_URL + username);
    createUserCard(data);
    getRepos(username);
  } catch (err) {
    console.log("hata");
    if (err.response.status == 404) {
      createErrorCard("Ardığınız kullanıcı bulunamadı :(");
    }
  }
}

//render

function createUserCard(user) {
  const userName = user.name || user.login;
  const userBio = user.bio ? `<p> ${user.bio}</p>` : "";

  main.innerHTML = "";

  const cardHTML = document.createElement("div");
  cardHTML.classList.add("card");

  cardHTML.innerHTML = `   <img
          class="user-image"
          src="${user.avatar_url}"
          alt="${user.name}"
        />
        <!-- info -->
        <div class="user-info">
          <div class="user-name">
            <h2>${userName}</h2>
            <small>@${user.login}</small>
          </div>
        </div>
        <p>
        ${userBio}
        </p>
        <ul>
          <li>
           ${user.followers} <i class="fa-solid fa-user-group"></i><strong>Followers</strong>
          </li>
          <li>${user.following} <strong>Following</strong></li>
          <li>
            ${user.public_repos} <i class="fa-solid fa-bookmark"></i><strong>Respository</strong>
          </li>
        </ul>
        <div class="repos" id="repos"></div>`;

  main.appendChild(cardHTML);
}

//search
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = search.value;

  if (user && user != "") {
    getUser(user);

    search.value = "";
  }
});

//error
function createErrorCard(msg) {
  const cardErrorHTML = `
    
     <div class="card">
  <h2> ${msg} </h2>
  </div>

    `;
  main.innerHTML = cardErrorHTML;
}

//get repos
async function getRepos(username) {
  try {
    const { data } = await axios(API_URL + username + "/repos");
    addReposToCard(data);
  } catch (err) {
    createErrorCard("repo çekerken hata..");
  }
}

//render repos
function addReposToCard(repos) {
  const reposEl = document.getElementById("repos");

  repos.slice(0, 3).forEach((repo) => {
    const reposLink = document.createElement("a");
    reposLink.href = repo.html_url;
    reposLink.target = "_blank";
    reposLink.innerHTML = ` <i class="fa-solid fa-book-bookmark"></i> ${repo.name} `;

    reposEl.appendChild(reposLink);
  });
}
