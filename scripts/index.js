//popups
const popupEditProfile = document.querySelector(".popup-edit");
const popupAddPhoto = document.querySelector(".popup-add-photo");
const popupImage = document.querySelector(".popup-image");

const openPopupButton = document.querySelector(".profile__edit-button");
const openAddPhotoPopupButton = document.querySelector(".profile__add-button");

const closePopupButton = popupEditProfile.querySelector(".popup__close-button");
const closePopupAddPhotoButton = popupAddPhoto.querySelector(
  ".popup__close-button"
);
const closePopupImageButton = popupImage.querySelector(".popup__close-button");

const popupOverlays = document.querySelectorAll(".popup__overlay");
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

const addPhotoForm = popupAddPhoto.querySelector(".popup__form");
const addPhotoInputTitle = addPhotoForm.querySelector(
  ".popup__input_type_name"
);
const addPhotoInputLink = addPhotoForm.querySelector(".popup__input_type_job");

//popup image
const popupImg = popupImage.querySelector(".popup-image__image");
const popupImgCaption = popupImage.querySelector(".popup-image__caption");

function createCard(item) {
  const card = cardTemplate.cloneNode(true);
  const cardImg = card.querySelector(".card__picture");
  cardImg.setAttribute("src", item.link);
  cardImg.setAttribute("alt", item.name);
  const cardTitle = card.querySelector(".card__header");
  cardTitle.textContent = item.name;

  const deleteBtn = card.querySelector(".card__delete-icon");
  deleteBtn.addEventListener("click", () => card.remove());

  const likeBtn = card.querySelector(".like-button");
  likeBtn.addEventListener("click", () =>
    likeBtn.classList.toggle("like-button_active")
  );
  //open image popup
  cardImg.addEventListener("click", () => {
    popupImg.src = item.link;
    popupImgCaption.textContent = item.name;
    popupImg.alt = item.name;
    openPopup(popupImage);
  });
  return card;
}

function insertCard(card) {
  elementsList.prepend(card);
}

const addPhotoFormHandler = (e) => {
  e.preventDefault();
  const newPhoto = {
    name: addPhotoInputTitle.value,
    link: addPhotoInputLink.value,
  };
  insertCard(createCard(newPhoto));
  closePopup(popupAddPhoto);
};

addPhotoForm.addEventListener("submit", addPhotoFormHandler);

initialCards.forEach((item) => insertCard(createCard(item)));

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function formEditSubmitHandler(e) {
  e.preventDefault();
  currentName.textContent = nameInput.value;
  currentJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

formElement.addEventListener("submit", formEditSubmitHandler);

openPopupButton.addEventListener("click", () => {
  nameInput.value = currentName.textContent;
  jobInput.value = currentJob.textContent;
  openPopup(popupEditProfile);
});

openAddPhotoPopupButton.addEventListener("click", () => {
  addPhotoInputTitle.value = "";
  addPhotoInputLink.value = "";
  openPopup(popupAddPhoto);
});

closePopupButton.addEventListener("click", () => closePopup(popupEditProfile));

closePopupAddPhotoButton.addEventListener("click", () =>
  closePopup(popupAddPhoto)
);

closePopupImageButton.addEventListener("click", () => closePopup(popupImage));

popupOverlays.forEach((item) =>
  item.addEventListener("click", () => {
    document.querySelectorAll(".popup").forEach(closePopup);
  })
);
