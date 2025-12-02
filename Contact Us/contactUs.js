"use strict"

//inspired by https://www.javascripttutorial.net/javascript-dom/javascript-form-validation/
const nameEl = document.querySelector('#name');
const emailEl = document.querySelector('#email');
const messageEl = document.querySelector('#message');



const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;
const isEmailValid = (email) => {
    const rePattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return rePattern.test(email);
}

function showError(input, message) {
    const form_group = input.parentElement;
    form_group.classList.remove('success');
    form_group.classList.add('error');


    const error = form_group.querySelector('.error');
    error.textContent = message;
}

function showSuccess(input) {
    const form_group = input.parentElement;

    //remove the error class
    form_group.classList.remove('error');
    form_group.classList.add('success');
    
    //hide error messages
    const error = form_group.querySelector('.error');
    error.textContent = '';
}

//Validating the name input field
function checkName(){
    let valid = false;
    let min = 3, max = 25;
    const name = nameEl.value.trim();

    if(!isRequired(name)){
        showError(userEl, 'Username cannot be blank!');
    } else if (!isBetween(name.length, min ,max)){
        showError(nameEl, `Name characters must be betweem ${min} and ${max} characters!`);
    } else {
        showSuccess(nameEl);
        valid = true;
    }

    return valid;
}

//validating the email address
function checkEmail(){
    let valid = false;
    const email = emailEl.value.trim();

    if(!isRequired(email)){
        showError(emailEl, 'Email cannot be empty!');
    } else if(!isEmailValid(email)){
        showError(emailEl, 'Please enter a valid email address!');
    } else {
        showSuccess(emailEl);
        valid = true;
    }

    return valid;
}

//validating the message input field
function checkMessage(){
    let valid = false;
    const message = messageEl.value.trim();

    let min = 20, max = 250;

    if(!isRequired(message)){
        showError(messageEl, 'Message cannot be blank!');
    } else if(!isBetween(message.length, min, max)){
        showError(messageEl, `Message must be between ${min} and ${max} characters!`);
    } else {
        showSuccess(messageEl);
        valid = true;
    }

    return valid;
}

const form = document.querySelector('form');

form.addEventListener('input', debounce(function(e) {
   switch(e.target.id){
        case "name":
            checkName();
            break;
        case "email":
              checkEmail();
              break;
        case "message":
            checkMessage();
            break;  
   }
}));

const debounce = (fn, delay = 300) => {
    let timeoutId;

    return(...args) => {
        if(timeoutId){
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            fn.apply(null,args);

        }, delay);
    }
}

/*For reset I just added on click location.reload() -> which 
does the same as reload button on the browser in the HTML code*/