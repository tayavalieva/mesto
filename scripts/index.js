
let popup = document.querySelector('.popup');

let openPopupButton = document.querySelector('#open_popup_button');
let closePopupButton = document.querySelector('#close_popup_button');
let formElement = document.querySelector('#popup_form');

//current values 
let currentName = document.querySelector('.profile__header');
let currentJob = document.querySelector('.profile__caption');


//fill popup form inputs with current values 
let inputs = document.querySelectorAll('.popup__input');
inputs[0].value = currentName.textContent;
inputs[1].value = currentJob.textContent; 

//find input elements
let nameInput = document.querySelector('#popup__input_type_name');
let jobInput = document.querySelector('#popup__input_type_job');


function formSubmitHandler(evt) {
    evt.preventDefault();
    currentName.textContent = nameInput.value;
    currentJob.textContent = jobInput.value;
    closePopup();
}



function openPopup() {
    popup.classList.add('popup_opened');
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

openPopupButton.addEventListener('click', openPopup); 
closePopupButton.addEventListener('click', closePopup); 
formElement.addEventListener('submit', formSubmitHandler);