import "./pages/index.css";
import { initialCards } from "./components/initial-сards.js";
import { Card } from "./components/card.js";
import { SELECTORS, userInfoSelectors } from "./components/selectors.js";
import { FormValidator } from "./components/formValidator.js";
import Section from "./components/section.js";
import PopupWithForm from "./components/popupWithForm.js";
import PopupWithImage from "./components/popupWithImage.js";
import { UserInfo } from "./components/userInfo.js";
import { Api } from "./components/Api.js";

// //input elements
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
const placeLinkInput = document.querySelector(".popup__input_type_link");
const placeNameInput = document.querySelector(".popup__input_type_place");

const initialUserName = document.querySelector(userInfoSelectors.nameSelector);
const initialUserDescription = document.querySelector(
  userInfoSelectors.infoSelector
);
const initialAvatar = document.querySelector(userInfoSelectors.avatarSelector);

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-24",
  headers: {
    authorization: "75448b66-8039-4414-9d9d-66beac161b1c",
    "Content-Type": "application/json",
  },
});

api.getUserInfo().then((result) => {
  console.log(result);
  initialUserName.textContent = result.name;
  initialUserDescription.textContent = result.about;
  initialAvatar.src = result.avatar;
});

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
    popupAddPhotoValidator.resetValidation();
  }
);

popupAddPhoto.setEventListeners();

openAddPhotoPopupButton.addEventListener("click", () => popupAddPhoto.open());

const currentUser = new UserInfo(userInfoSelectors);

const formEditSubmitHandler = ({ user_name, about }) => {
  currentUser.setUserInfo({ user_name, about });
};

const openPopupEditButton = document.querySelector(".profile__edit-button");

const popupEditProfile = new PopupWithForm(
  ".popup-edit",
  SELECTORS.formSelector,
  formEditSubmitHandler,
  () => {
    nameInput.value = currentUser.getUserInfo().nameSelector;
    jobInput.value = currentUser.getUserInfo().infoSelector;
    popupEditProfileValidator.resetValidation();
  }
);

popupEditProfile.setEventListeners();

openPopupEditButton.addEventListener("click", () => {
  popupEditProfile.open();
});

const popupEditProfileValidator = new FormValidator(
  SELECTORS,
  popupEditProfile.getForm()
);

popupEditProfileValidator.enableValidation();

const popupAddPhotoValidator = new FormValidator(
  SELECTORS,
  popupAddPhoto.getForm()
);
popupAddPhotoValidator.enableValidation();

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

cardsSection.renderItems();
