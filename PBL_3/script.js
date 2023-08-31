const baseURL = "https://api.github.com/users/";
const userInput = document.querySelector(".user-input");
const userContainer = document.querySelector(".user-wrap");
let user = "hallov012";

const firstLoad = async () => {
  const data = await searchUser(user);
  const repoData = await searchRepo(user);
  if (data && repoData) {
    renderProfile(data);
    renderRepo(repoData);
  } else {
    const alert = document.createElement("div");
    alert.classList.add("alert");
    alert.innerText = "Please check API limit";
    userContainer.appendChild(alert);
  }
};

/* 프로필 랜더링 */
const renderProfile = (data) => {
  const profile = document.createElement("div");
  profile.classList.add("profile-wrap");

  /* left 영역 */
  const leftContent = document.createElement("div");
  leftContent.classList.add("left");

  const avatar = document.createElement("img");
  avatar.src = data.avatar_url;

  const linkBtn = document.createElement("a");
  linkBtn.classList.add("link-btn");
  linkBtn.href = data.html_url;
  linkBtn.innerText = "Visit Github";

  leftContent.appendChild(avatar);
  leftContent.appendChild(linkBtn);

  /* right 영역 */
  const rightContent = document.createElement("div");
  rightContent.classList.add("right");

  const tagWrap = document.createElement("div");
  tagWrap.classList.add("tag-wrap");

  const publicRepo = document.createElement("div");
  publicRepo.innerText = `Public Repos: ${data.public_repos}`;

  const publicGist = document.createElement("div");
  publicGist.innerText = `Public Gists: ${data.public_gists}`;

  const followers = document.createElement("div");
  followers.innerText = `Followers: ${data.followers}`;

  const following = document.createElement("div");
  following.innerText = `Following: ${data.following}`;

  tagWrap.appendChild(publicRepo);
  tagWrap.appendChild(publicGist);
  tagWrap.appendChild(followers);
  tagWrap.appendChild(following);

  const infoWrap = document.createElement("div");
  infoWrap.classList.add("info-wrap");

  const company = document.createElement("span");
  company.innerText = `company: ${data.company ?? "No Company"}`;

  const website = document.createElement("span");
  website.innerText = `Website: ${data.blog.length ? data.blog : "No Website"}`;

  const location = document.createElement("span");
  location.innerText = `Location: ${data.location ?? "No Location"}`;

  const memberSince = document.createElement("span");
  memberSince.innerText = `Member Since: ${data.created_at}`;

  infoWrap.appendChild(company);
  infoWrap.appendChild(website);
  infoWrap.appendChild(location);
  infoWrap.appendChild(memberSince);

  rightContent.appendChild(tagWrap);
  rightContent.appendChild(infoWrap);

  /* 추가 */
  profile.appendChild(leftContent);
  profile.appendChild(rightContent);

  userContainer.appendChild(profile);
};

/* 레포지토리 아이템 렌더링 */
const renderRepoItem = (data) => {
  const repoItem = document.createElement("div");
  repoItem.classList.add("repo-item");

  /* repo 이름 */
  const repoName = document.createElement("a");
  repoName.href = data.html_url;
  repoName.innerText = data.name;

  /* repo 설명 */
  const repoTags = document.createElement("div");
  repoTags.classList.add("tag-wrap");

  const stars = document.createElement("div");
  stars.innerText = `Stars: ${data.stargazers_count}`;

  const watchers = document.createElement("div");
  watchers.innerText = `Watchers: ${data.watchers_count}`;

  const forks = document.createElement("div");
  forks.innerText = `Forks: ${data.forks_count}`;

  repoTags.appendChild(stars);
  repoTags.appendChild(watchers);
  repoTags.appendChild(forks);

  repoItem.appendChild(repoName);
  repoItem.appendChild(repoTags);

  return repoItem;
};

/* 레파지토리 렌더링 */
const renderRepo = (data) => {
  const repoWrap = document.createElement("div");
  repoWrap.classList.add("repo-wrap");

  const repoText = document.createElement("h1");
  repoText.innerText = "Latest Repos";

  repoWrap.appendChild(repoText);

  /* 아이템 랜더링 */
  data.forEach((item) => {
    const repoItem = renderRepoItem(item);
    repoWrap.appendChild(repoItem);
  });

  userContainer.appendChild(repoWrap);
};

const searchUser = async (user) => {
  try {
    const res = await axios.get(baseURL + user);
    return res.data;
  } catch (err) {
    return null;
  }
};

const searchRepo = async (user) => {
  try {
    const res = await axios.get(baseURL + user + "/repos");
    return res.data;
  } catch (err) {
    return null;
  }
};

userInput.value = user;

userInput.addEventListener("keyup", async (e) => {
  user = e.target.value;
  const data = await searchUser(user);
  const repoData = await searchRepo(user);
  if (data && repoData) {
    userContainer.innerHTML = "";
    renderProfile(data);
    renderRepo(repoData);
  } else {
    userContainer.innerHTML = "";
    const alert = document.createElement("div");
    alert.classList.add("alert");
    alert.innerText = "No profile with this username";
    userContainer.appendChild(alert);
  }
});

firstLoad();
