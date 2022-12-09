let likeButtons = document.querySelector(".elements");
let profileName = document.querySelector(".profile__name");
let profileJob = document.querySelector(".profile__job");

let editBtn = document.querySelector(".profile__edit-button");
let closeBtn = document.querySelector(".popup__close");

let formElement = document.querySelector(".popup__container");
let nameInput = formElement.querySelector("#popup__name");
let jobInput = formElement.querySelector("#popup__job");
// let body = document.querySelector(".root");

function likeButtonStatus(currentButton) {
  currentButton.classList.toggle("element__button_active");
}

function popupOpen() {
  let editPopup = document.querySelector(".popup");
  editPopup.classList.add("popup_opened");
  nameInput.value = `${profileName.textContent}`;
  jobInput.value = `${profileJob.textContent}`;
}

function popupClose() {
  let editPopup = document.querySelector(".popup");
  editPopup.classList.remove("popup_opened");
}

function handleFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = `${nameInput.value}`;
  profileJob.textContent = `${jobInput.value}`;
}

likeButtons.addEventListener("click", function (event) {
  if (event.target.closest(".element__button")) {
    likeButtonStatus(event.target);
  }
});

editBtn.addEventListener("click", popupOpen);
closeBtn.addEventListener("click", popupClose);
formElement.addEventListener("submit", handleFormSubmit);
