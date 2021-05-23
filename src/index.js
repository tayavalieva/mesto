import "./pages/index.css";
import { Card } from "./components/card.js";
import { SELECTORS, userInfoSelectors } from "./components/selectors.js";
import { FormValidator } from "./components/formValidator.js";
import Section from "./components/section.js";
import PopupWithForm from "./components/popupWithForm.js";
import PopupWithImage from "./components/popupWithImage.js";
import { UserInfoRenderer } from "./components/userInfo.js";
import { Api } from "./components/Api.js";

// //input elements

const placeLinkInput = document.querySelector(".popup__input_type_link");
const placeNameInput = document.querySelector(".popup__input_type_place");

const initialAvatar = document.querySelector(userInfoSelectors.avatarSelector);

const currentUser = new UserInfoRenderer(userInfoSelectors);

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-24",
  headers: {
    authorization: "75448b66-8039-4414-9d9d-66beac161b1c",
    "Content-Type": "application/json",
  },
});

api.getUserInfo().then((result) => {
  currentUser.renderUserInfo(result);
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

const formEditSubmitHandler = ({ user_name, about }) => {
  api.setNewUserInfo({ user_name, about });
  currentUser.renderUserInfo({ user_name, about });
};

const openPopupEditButton = document.querySelector(".profile__edit-button");

const popupEditProfile = new PopupWithForm(
  ".popup-edit",
  SELECTORS.formSelector,
  formEditSubmitHandler,
  () => {
    currentUser.fillInputsValue();
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

function renderCards(cardsList) {
  const cardsSection = new Section(
    {
      data: cardsList.map(
        (item) =>
          new Card(
            item.link,
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
}

api.getInitialCards().then(renderCards);
