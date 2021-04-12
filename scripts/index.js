//popups
const popupEditProfile = document.querySelector(".popup-edit");
const popupAddPhoto = document.querySelector(".popup-add-photo");
const popupImage = document.querySelector(".popup-image");

const openPopupEditButton = document.querySelector(".profile__edit-button");
const openAddPhotoPopupButton = document.querySelector(".profile__add-button");

const closePopupButton = popupEditProfile.querySelector(".popup__close-button");
const closePopupAddPhotoButton = popupAddPhoto.querySelector(
  ".popup__close-button"
);
const closePopupImageButton = popupImage.querySelector(".popup__close-button");

const popupOverlays = document.querySelectorAll(".popup__overlay");
const formElement = document.querySelector(".popup__form");
const elementsList = document.querySelector(".elements");

//current values
const currentName = document.querySelector(".profile__header");
const currentJob = document.querySelector(".profile__caption");
//input elements
const nameInput = document.querySelector(".popup-edit__input_type_name");

const jobInput = document.querySelector(".popup-edit__input_type_job");

//show default cards
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

//popup image
const addPhotoForm = popupAddPhoto.querySelector(".popup__form");
const addPhotoInputTitle = addPhotoForm.querySelector(
  ".popup-add-photo__input_type_name"
);
const addPhotoInputLink = addPhotoForm.querySelector(
  ".popup-add-photo__input_type_link"
);

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

let activeEscHandler = null;

function openPopup(popup) {
  popup.classList.add("popup_opened");

  setButtonState(getForm(popup, selectors), selectors);
  activeEscHandler = (evt) => {
    if (evt.key === "Escape") {
      closePopup(popup);
    }
  };

  document.addEventListener("keydown", activeEscHandler);
}

function resetPopup(popup) {
  const formElement = getForm(popup, selectors);
  if (formElement === null || formElement === undefined) {
    return;
  }
  const inputElements = getFormInputs(formElement, selectors);
  inputElements.forEach((inputElement) =>
    hideInputError(formElement, inputElement, selectors)
  );
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  resetPopup(popup);
  document.removeEventListener("keydown", activeEscHandler);
  activeEscHandler = null;
}

function formEditSubmitHandler(e) {
  e.preventDefault();
  currentName.textContent = nameInput.value;
  currentJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

formElement.addEventListener("submit", formEditSubmitHandler);

openPopupEditButton.addEventListener("click", () => {
  nameInput.value = currentName.textContent;
  jobInput.value = currentJob.textContent;
  openPopup(popupEditProfile);
});

openAddPhotoPopupButton.addEventListener("click", () => {
  addPhotoInputTitle.value = "";
  addPhotoInputLink.value = "";
  openPopup(popupAddPhoto);
});

//Overlay click closes popup
document.querySelectorAll(".popup").forEach((popup) => {
  popup
    .querySelector(".popup__overlay")
    .addEventListener("click", () => closePopup(popup));
});

closePopupButton.addEventListener("click", () => closePopup(popupEditProfile));

closePopupAddPhotoButton.addEventListener("click", () =>
  closePopup(popupAddPhoto)
);

closePopupImageButton.addEventListener("click", () => closePopup(popupImage));
