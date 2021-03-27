//popups
const popupEdit = document.querySelector(".popup-edit");
const popupAddPhoto = document.querySelector(".popup-add-photo");
const popupImage = document.querySelector(".popup-image");

const openPopupButton = document.querySelector(".profile__edit-button");
const openAddPhotoPopupButton = document.querySelector(".profile__add-button");
//const openImagePopup = document.querySelector(".card");

const closePopupButton = document.querySelector(".popup__close-button");
const closePopupAddPhotoButton = document.querySelector(
  ".popup-add-photo-close"
);
const popupOverlay = document.querySelector(".popup__overlay");

const formElement = document.querySelector(".popup__form");

//current values
const currentName = document.querySelector(".profile__header");
const currentJob = document.querySelector(".profile__caption");

//input elements
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");

//show default cards

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

const elementsList = document.querySelector(".elements");

const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const addPhotoForm = popupAddPhoto.querySelector(".popup__form");
const addPhotoInputTitle = addPhotoForm.querySelector(
  ".popup__input_type_name"
);
const addPhotoInputLink = addPhotoForm.querySelector(".popup__input_type_job");

function insertCard(item) {
  const card = cardTemplate.cloneNode(true);
  const cardImg = card.querySelector(".card__picture");
  cardImg.setAttribute("src", item.link);
  const cardTitle = card.querySelector(".card__header");
  cardTitle.textContent = item.name;

  const deleteBtn = card.querySelector(".card__delete-icon");
  deleteBtn.addEventListener("click", () => card.remove());

  const likeBtn = card.querySelector(".like-button");
  likeBtn.addEventListener("click", () =>
    likeBtn.classList.toggle("like-button_active")
  );

  elementsList.prepend(card);
}

const addPhotoFormHandler = (e) => {
  e.preventDefault();
  const newPhoto = {
    name: addPhotoInputTitle.value,
    link: addPhotoInputLink.value,
  };
  insertCard(newPhoto);
  closePopupAddPhoto();
};

addPhotoForm.addEventListener("submit", addPhotoFormHandler);

const cardsShown = initialCards.forEach((item) => insertCard(item));
//const cardsShown = initialCards.forEach(insertCard);

function openPopup() {
  popupEdit.classList.add("popup_opened");
  //fill popup form inputs with current values
  nameInput.value = currentName.textContent;
  jobInput.value = currentJob.textContent;
}

function openPopupAddPhoto() {
  popupAddPhoto.classList.add("popup_opened");
}

function closePopup() {
  popupEdit.classList.remove("popup_opened");
}

function closePopupAddPhoto() {
  popupAddPhoto.classList.remove("popup_opened");
}

function formEditSubmitHandler(e) {
  e.preventDefault();
  currentName.textContent = nameInput.value;
  currentJob.textContent = jobInput.value;
  closePopup();
}

document.querySelectorAll(".like-button").forEach((item) =>
  item.addEventListener("click", () => {
    item.classList.toggle("like-button_active");
  })
);

openPopupButton.addEventListener("click", openPopup);
openAddPhotoPopupButton.addEventListener("click", openPopupAddPhoto);
closePopupButton.addEventListener("click", closePopup);
closePopupAddPhotoButton.addEventListener("click", closePopupAddPhoto);
popupOverlay.addEventListener("click", closePopup);
formElement.addEventListener("submit", formEditSubmitHandler);
