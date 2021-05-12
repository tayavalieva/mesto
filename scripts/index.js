import { initialCards } from "./initial-сards.js";
import { Card } from "./card.js";
import { SELECTORS } from "./selectors.js";
import { FormValidator } from "./formValidator.js";
import Section from "./section.js";
import PopupWithForm from "./popupWithForm.js";
import PopupWithImage from "./popupWithImage.js";

//current values
const currentName = document.querySelector(".profile__header");
const currentJob = document.querySelector(".profile__caption");
//input elements
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
const placeLinkInput = document.querySelector(".popup__input_type_link");
const placeNameInput = document.querySelector(".popup__input_type_place");

//Popup With Image
const popupWithImage = new PopupWithImage(".popup-image");

popupWithImage.setEventListeners();

function cardImageClickHandler(url, text) {
  popupWithImage.open(url, text);
}

const CARD_TEMPLATE_SELECTOR = "card-template";

const openAddPhotoPopupButton = document.querySelector(".profile__add-button");

//Add Photo Popup
//expected: {place_name: '...', photo_link: '...'}
const addPhotoFormHandler = ({ place_name, photo_link }) => {
  cardsSection.addItem(
    new Card(
      photo_link,
      place_name,
      CARD_TEMPLATE_SELECTOR,
      cardImageClickHandler
    )
  );
};

const popupAddPhoto = new PopupWithForm(
  ".popup-add-photo",
  SELECTORS.formSelector,
  addPhotoFormHandler,
  () => {
    //delete input values
    placeLinkInput.value = "";
    placeNameInput.value = "";
    const validator = new FormValidator(SELECTORS, popupAddPhoto.getForm());
    validator.resetValidation();
  }
);

popupAddPhoto.setEventListeners();

openAddPhotoPopupButton.addEventListener("click", () => popupAddPhoto.open());

// expected {user_name: '...', about: '...'}
const formEditSubmitHandler = ({ user_name, about }) => {
  currentName.textContent = user_name;
  currentJob.textContent = about;
};

const openPopupEditButton = document.querySelector(".profile__edit-button");

const popupEditProfile = new PopupWithForm(
  ".popup-edit",
  SELECTORS.formSelector,
  formEditSubmitHandler,
  () => {
    nameInput.value = currentName.textContent;
    jobInput.value = currentJob.textContent;
    const validator = new FormValidator(SELECTORS, popupEditProfile.getForm());
    validator.resetValidation();
  }
);

popupEditProfile.setEventListeners();

openPopupEditButton.addEventListener("click", () => {
  popupEditProfile.open();
});

const enableValidation = (selectors) => {
  const formList = Array.from(
    document.querySelectorAll(selectors.formSelector)
  );
  formList.forEach((form) => {
    const formValidator = new FormValidator(selectors, form);
    formValidator.enableValidation();
  });
};

const cardsSection = new Section(
  {
    data: initialCards.map(
      (item) =>
        new Card(
          item.image,
          item.name,
          CARD_TEMPLATE_SELECTOR,
          cardImageClickHandler
        )
    ),
    renderer: (card) => card.generateCard(),
  },
  ".elements"
);

enableValidation(SELECTORS);

cardsSection.renderItems();
