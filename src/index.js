import "./pages/index.css";
import { Card } from "./components/card.js";
import { SELECTORS, userInfoSelectors } from "./components/selectors.js";
import { FormValidator } from "./components/formValidator.js";
import Section from "./components/section.js";
import PopupWithForm from "./components/popupWithForm.js";
import PopupWithImage from "./components/popupWithImage.js";
import { UserInfo } from "./components/userInfo.js";
import { Api } from "./components/Api.js";

// //input elements

const placeLinkInput = document.querySelector(".popup__input_type_link");
const placeNameInput = document.querySelector(".popup__input_type_place");
const avatarLinkInput = document.querySelector(".popup__input_type_avatar");
//const userAvatar = document.querySelector(userInfoSelectors.avatarSelector);

const userInfo = new UserInfo(userInfoSelectors);

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-24",
  headers: {
    authorization: "75448b66-8039-4414-9d9d-66beac161b1c",
    "Content-Type": "application/json",
  },
});

api.getInitialData().then(([userData, cardsList]) => {
  userInfo.setUser(userData);
  userInfo.renderUserInfo();
  renderCards(cardsList);
  console.log(cardsList);
});

//Edit Avatar Popup
const editAvatarButton = document.querySelector(".profile__avatar-edit-button");

const editAvatarFormHandler = ({ link }) => {
  api.setAvatar({ link }).then((res) => (userAvatar.src = res.avatar));
};

const editAvatarPopup = new PopupWithForm(
  ".popup-edit-avatar",
  SELECTORS.formSelector,
  editAvatarFormHandler,
  () => {
    avatarLinkInput.value = "";
    editAvatarPopupValidator.resetValidation();
  }
);

const editAvatarPopupValidator = new FormValidator(
  SELECTORS,
  editAvatarPopup.getForm()
);
editAvatarPopupValidator.enableValidation();

editAvatarPopup.setEventListeners();

editAvatarButton.addEventListener("click", () => editAvatarPopup.open());

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
  api.postCard({ place_name, photo_link }).then((res) => {
    cardsSection.prependItem(
      new Card(
        res.link,
        res.name,
        res._id,
        res.owner._id,
        CARD_TEMPLATE_SELECTOR,
        cardImageClickHandler
      )
    );
  });
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
  userInfo.renderUserInfo({ user_name, about });
};

const openPopupEditButton = document.querySelector(".profile__edit-button");

const popupEditProfile = new PopupWithForm(
  ".popup-edit",
  SELECTORS.formSelector,
  formEditSubmitHandler,
  () => {
    userInfo.fillInputsValue();
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
    data: [],
    renderer: (card) => card.generateCard(),
  },
  ".elements"
);

function renderCards(cardsList) {
  cardsList.forEach((item) =>
    cardsSection.appendItem(
      new Card(
        item.link,
        item.name,
        item._id,
        item.owner._id,
        CARD_TEMPLATE_SELECTOR,
        cardImageClickHandler
      )
    )
  );
}
