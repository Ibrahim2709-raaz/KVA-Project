"use strict"

//inspired by https://www.javascripttutorial.net/javascript-dom/javascript-form-validation/
const nameEl = document.querySelector('#name');
const emailEl = document.querySelector('#email');
const messageEl = document.querySelector('#message');
const form = document.querySelector('form');


const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;
const isEmailValid = (email) => {
    const rePattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return rePattern.test(email);
}


function showError(input, message) {
    const form_group = input.parentElement;
    form_group.classList.remove('success');
    form_group.classList.add('error');


    const error = form_group.querySelector('small');
    error.textContent = message;
}

function showSuccess(input) {
    const form_group = input.parentElement;

    //remove the error class
    form_group.classList.remove('error');
    form_group.classList.add('success');
    
    //hide error messages
    const error = form_group.querySelector('small');
    error.textContent = '';
}

//Validating the name input field
function checkName(){
    let valid = false;
    let min = 3, max = 25;
    const name = nameEl.value.trim();

    if(!isRequired(name)){
        showError(nameEl, 'Name field cannot be blank!');
    } else if (!isBetween(name.length, min ,max)){
        showError(nameEl, `Name characters must be between ${min} and ${max} characters!`);
    } else {
        showSuccess(nameEl);
        valid = true;
    }

    return valid;
}

//avoiding constant feedback to minimise a
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

//validating the email address
function checkEmail(){
    let valid = false;
    const email = emailEl.value.trim();

    if(!isRequired(email)){
        showError(emailEl, 'Email cannot be empty!');
    } else if(!isEmailValid(email)){
        showError(emailEl, 'Please, enter a valid email address!');
    } else {
        showSuccess(emailEl);
        valid = true;
    }

    return valid;
}

//live validation of the input
function checkMessage(){
    let valid = false;
    const message = messageEl.value.trim();

    let min = 20, max = 250;

    if(!isRequired(message)){
        showError(messageEl, 'Message cannot be empty!');
    } else if(!isBetween(message.length, min, max)){
        showError(messageEl, `Message must be between ${min} and ${max} characters!`);
    } else {
        showSuccess(messageEl);
        valid = true;
    }

    return valid;
}


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


form.addEventListener('submit', function (e){

    e.preventDefault(); //preventing default submission


    const isFormValid = checkName() && checkEmail() && checkMessage();

    if(isFormValid){
        form.submit();
    }
});;


// Mobile hamburger toggle
 const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");

    // Update accessibility attribute
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", !expanded);
  });
