import "./pages/index.css";
import { Card } from "./components/card.js";
import {
  SELECTORS,
  userInfoSelectors,
  cardSelectors,
} from "./components/selectors.js";
import { FormValidator } from "./components/formValidator.js";
import Section from "./components/section.js";
import PopupWithForm from "./components/popupWithForm.js";
import PopupWithImage from "./components/popupWithImage.js";
import { UserInfo } from "./components/userInfo.js";
import { Api } from "./components/Api.js";
import PopupWithSubmit from "./components/popupWithSubmit";

// //input elements

const placeLinkInput = document.querySelector(".popup__input_type_link");
const placeNameInput = document.querySelector(".popup__input_type_place");
const avatarLinkInput = document.querySelector(".popup__input_type_avatar");

const userInfo = new UserInfo(userInfoSelectors);

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-24",
  headers: {
    authorization: "75448b66-8039-4414-9d9d-66beac161b1c",
    "Content-Type": "application/json",
  },
});

api
  .getInitialData()
  .then(([userData, cardsList]) => {
    userInfo.setUser(userData);
    userInfo.renderUserInfo();
    renderCards(cardsList);
  })
  .catch((error) => console.log("Render error"));

//Edit Avatar Popup
const editAvatarButton = document.querySelector(".profile__avatar-edit-button");

const editAvatarFormHandler = ({ link }) => {
  editAvatarPopup.setLoading(true);
  api
    .setAvatar({ link })
    .then((res) => {
      userInfo.renderAvatar(res);
      editAvatarPopup.close();
    })
    .catch((error) => console.log("Avatar render error"))
    .finally(() => editAvatarPopup.setLoading(false));
};

const editAvatarPopup = new PopupWithForm(
  ".popup-edit-avatar",
  SELECTORS.formSelector,
  editAvatarFormHandler,
  () => {
    avatarLinkInput.value = "";
    editAvatarPopupValidator.resetValidation();
  },
  "Сохранить"
);

const editAvatarPopupValidator = new FormValidator(
  SELECTORS,
  editAvatarPopup.getForm()
);
editAvatarPopupValidator.enableValidation();

editAvatarButton.addEventListener("click", () => editAvatarPopup.open());

//Popup With Image
const popupWithImage = new PopupWithImage(".popup-image");

function cardImageClickHandler(url, text) {
  popupWithImage.open(url, text);
}

const handleCardDeleteBtn = (card) => {
  const deleteCardPopupSubmitHandler = (popup) => {
    popup.setLoading(true);
    api
      .deleteCard(card.getID())
      .then(() => {
        card.deleteCardElement();
        popup.close();
      })
      .catch((error) => console.log("Card Delete Error"))
      .finally(() => popup.setLoading(false));
  };
  const deleteCardPopup = new PopupWithSubmit(
    ".popup-delete-card",
    deleteCardPopupSubmitHandler,
    "Да"
  );

  deleteCardPopup.open();
};

//isLiked card's method
const handleCardLikeBtn = (card) => {
  if (card.isLikedByCurrentUser()) {
    api
      .deleteLike(card.getID())
      .then((res) => {
        card.setLikes(res.likes);
        card.renderLikes();
      })
      .catch((error) => console.log("Remove Like from Card Error"));
  } else {
    api
      .setLikes(card.getID())
      .then((res) => {
        card.setLikes(res.likes);
        card.renderLikes();
      })
      .catch((error) => console.log("Like Card Error"));
  }
};

//Add Photo Popup

const createCard = (res) =>
  new Card(
    res.link,
    res.name,
    res._id,
    res.owner._id,
    res.likes,
    userInfo.getID(),
    cardSelectors,
    cardImageClickHandler,
    handleCardDeleteBtn,
    handleCardLikeBtn
  );

const openAddPhotoPopupButton = document.querySelector(".profile__add-button");

const addPhotoFormHandler = ({ place_name, photo_link }) => {
  popupAddPhoto.setLoading(true);
  api
    .postCard({ place_name, photo_link })
    .then((res) => {
      cardsSection.prependItem(createCard(res));
      popupAddPhoto.close();
    })
    .catch((error) => console.log("Post Card Error"))
    .finally(() => popupAddPhoto.setLoading(false));
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
  },
  "Создать"
);

openAddPhotoPopupButton.addEventListener("click", () => popupAddPhoto.open());

const formEditSubmitHandler = ({ user_name, about }) => {
  popupEditProfile.setLoading(true);
  api
    .setNewUserInfo({ user_name, about })
    .then((res) => {
      userInfo.setUser(res);
      userInfo.renderUserInfo({ user_name, about });
      popupEditProfile.close();
    })
    .catch((error) => console.log("Set New User Error"))
    .finally(() => popupEditProfile.setLoading(false));
};

const openPopupEditButton = document.querySelector(".profile__edit-button");

const popupEditProfile = new PopupWithForm(
  ".popup-edit",
  SELECTORS.formSelector,
  formEditSubmitHandler,
  () => {
    userInfo.fillInputsValue();
    popupEditProfileValidator.resetValidation();
  },
  "Сохранить"
);

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
  cardsList.forEach((item) => cardsSection.appendItem(createCard(item)));
}
